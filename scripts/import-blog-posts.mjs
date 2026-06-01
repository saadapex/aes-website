/**
 * AES Blog Importer — reads markdown drafts from content/blog-drafts/,
 * converts to Sanity Portable Text, and pushes via the Mutations API.
 *
 * Usage from PowerShell in aes-website/:
 *   node scripts/import-blog-posts.mjs              # dry-run, prints plan, no network
 *   node scripts/import-blog-posts.mjs --commit     # actually pushes to Sanity
 *
 * Requires SANITY_WRITE_TOKEN in .env.local.
 */

import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const COMMIT = process.argv.includes("--commit");
const __dir = dirname(fileURLToPath(import.meta.url));
const REPO  = join(__dir, "..");

// ─── Env ────────────────────────────────────────────────────────────────────
const envPath = join(REPO, ".env.local");
const env = {};
try {
  readFileSync(envPath, "utf8").split("\n").forEach((line) => {
    if (line.includes("=") && !line.trim().startsWith("#")) {
      const [k, ...rest] = line.split("=");
      env[k.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
} catch (e) {
  console.warn(`⚠ Could not read .env.local: ${e.message}`);
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ok6qwghh";
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || env.NEXT_PUBLIC_SANITY_DATASET    || "production";
const TOKEN      = process.env.SANITY_WRITE_TOKEN            || env.SANITY_WRITE_TOKEN;

if (COMMIT && !TOKEN) {
  console.error("❌ SANITY_WRITE_TOKEN missing from .env.local. Add it and rerun.");
  console.error("   You can get the token from https://sanity.io/manage → API → Tokens (need Editor role)");
  process.exit(1);
}

const ENDPOINT = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

// ─── Helpers ────────────────────────────────────────────────────────────────
const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

function buildSpans(text) {
  // Split on **bold** pairs
  const parts = text.split(/(\*\*[^*]+?\*\*)/);
  const spans = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      spans.push({ _type: "span", _key: key(), text: part.slice(2, -2), marks: ["strong"] });
    } else {
      spans.push({ _type: "span", _key: key(), text: part, marks: [] });
    }
  }
  return spans.length ? spans : [{ _type: "span", _key: key(), text: "", marks: [] }];
}

function mdToBlocks(body) {
  const blocks = [];
  const chunks = body.trim().split(/\n\s*\n/);
  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;
    const lines = chunk.split("\n");

    // Bullet list
    if (lines.every((l) => l.trim().startsWith("- "))) {
      for (const line of lines) {
        const itemText = line.trim().slice(2);
        blocks.push({
          _type: "block", _key: key(), style: "normal",
          listItem: "bullet", level: 1,
          children: buildSpans(itemText), markDefs: [],
        });
      }
      continue;
    }

    // H2
    if (chunk.startsWith("## ")) {
      blocks.push({
        _type: "block", _key: key(), style: "h2",
        children: buildSpans(chunk.slice(3).trim()), markDefs: [],
      });
      continue;
    }

    // H3
    if (chunk.startsWith("### ")) {
      blocks.push({
        _type: "block", _key: key(), style: "h3",
        children: buildSpans(chunk.slice(4).trim()), markDefs: [],
      });
      continue;
    }

    // Normal paragraph
    const paraText = lines.map((l) => l.trim()).join(" ");
    blocks.push({
      _type: "block", _key: key(), style: "normal",
      children: buildSpans(paraText), markDefs: [],
    });
  }
  return blocks;
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("missing frontmatter");
  const body = text.slice(m[0].length);
  const fm = {};
  for (const line of m[1].split("\n")) {
    if (line.includes(":") && !line.startsWith("  -") && !line.trim().startsWith("-")) {
      const idx = line.indexOf(":");
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      fm[k] = v;
    }
  }
  return { fm, body };
}

function fileToDoc(path) {
  const text = readFileSync(path, "utf8");
  const { fm, body } = parseFrontmatter(text);
  const slug = fm.slug;
  let pub = fm.publishedAt;
  if (!pub.includes("T")) pub = `${pub}T09:00:00.000Z`;
  return {
    _id: `post-${slug}`,
    _type: "post",
    title: fm.title,
    slug: { _type: "slug", current: slug },
    excerpt: fm.excerpt,
    category: fm.category,
    author: fm.author || "Saad Usmani",
    publishedAt: pub,
    body: mdToBlocks(body),
  };
}

// ─── Build docs ─────────────────────────────────────────────────────────────
const draftsDir = join(REPO, "content/blog-drafts");
const files = readdirSync(draftsDir).filter((f) => f.endsWith(".md")).sort();
const docs = [];
for (const f of files) {
  const doc = fileToDoc(join(draftsDir, f));
  docs.push(doc);
  const nH2 = doc.body.filter((b) => b.style === "h2").length;
  const nBullets = doc.body.filter((b) => b.listItem).length;
  console.log(`  parsed ${f}: ${doc.body.length} blocks (${nH2} H2, ${nBullets} bullets), ` +
              `date=${doc.publishedAt.slice(0, 10)}, cat=${doc.category}`);
}

console.log(`\nTotal: ${docs.length} posts ready`);

if (!COMMIT) {
  const out = join(__dir, "import-payload.json");
  writeFileSync(out, JSON.stringify({ mutations: docs.map((d) => ({ createOrReplace: d })) }, null, 2));
  console.log(`\nDRY RUN. Full payload written to ${out}`);
  console.log("Re-run with --commit to push to Sanity.");
  process.exit(0);
}

// ─── Commit ─────────────────────────────────────────────────────────────────
console.log(`\nPOST → ${ENDPOINT}\n`);
const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({ mutations: docs.map((d) => ({ createOrReplace: d })) }),
});

const json = await res.json();
if (!res.ok) {
  console.error("❌ Sanity API error:", JSON.stringify(json, null, 2));
  process.exit(1);
}

console.log(`✓ HTTP ${res.status}`);
for (const r of json.results || []) {
  console.log(`  ${r.operation}: ${r.id}`);
}
console.log(`\n✨ Imported ${json.results?.length ?? 0} posts. Refresh aes-apex.sanity.studio to see them.`);
