/**
 * AES Blog Seed — plain ESM, run with: node scripts/seed-blog.mjs
 * No ts-node required. Uses Sanity Mutations API directly.
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually ─────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, "../.env.local");
const envVars = {};
try {
  readFileSync(envPath, "utf8").split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) envVars[k.trim()] = v.join("=").trim();
  });
} catch {}

const PROJECT_ID = envVars.NEXT_PUBLIC_SANITY_PROJECT_ID || "ok6qwghh";
const DATASET    = envVars.NEXT_PUBLIC_SANITY_DATASET    || "production";
const TOKEN      = envVars.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error("❌  SANITY_WRITE_TOKEN not found in .env.local");
  process.exit(1);
}

const ENDPOINT = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;

// ── Helper ───────────────────────────────────────────────────────────────────
let _key = 0;
const key = () => `k${++_key}`;

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    children: [{ _type: "span", _key: key(), text, marks: [] }],
    markDefs: [],
  };
}

// ── Posts ────────────────────────────────────────────────────────────────────
const posts = [
  {
    _id:   "post-structured-cabling-101",
    _type: "post",
    title: "Structured Cabling 101: What to Expect from a Copper & Fiber Installation Project",
    slug:  { _type: "slug", current: "structured-cabling-101" },
    excerpt: "From pathway design to OTDR test reports — a practical overview of what a structured cabling engagement looks like, and what to look for at each stage.",
    category: "Structured Cabling",
    author: "Saad Usmani",
    publishedAt: "2026-04-15T09:00:00.000Z",
    body: [
      block("Structured cabling is the backbone of every data center, warehouse, and enterprise facility — but the engagement process is often opaque, especially for primes and project managers coordinating field work across multiple trades. Here's a breakdown of what a cabling project actually involves, from kickoff to closeout."),
      block("Phase 1: Site Survey and Pathway Design", "h2"),
      block("Before a single cable is pulled, the crew needs to understand the physical environment. A site survey identifies conduit routes, tray paths, wall penetrations, and any obstacles — dropped ceilings, concrete cores, fire-rated walls — that will affect the install. This is also when you confirm the number of drops, panel locations, and whether existing pathways can be reused."),
      block("On larger projects, this phase produces a pathway design document that gets approved before work begins. Skipping this step is one of the most common sources of scope growth on cabling projects."),
      block("Phase 2: Pulling and Terminating", "h2"),
      block("Copper runs (CAT6 or CAT6A) are pulled from the IDF/MDF room to each outlet or device location and terminated at both ends — patch panels on the infrastructure side, keystones or RJ45 plugs at the device side. Fiber runs follow a similar pattern but require additional care: SM or MM strand selection, proper bend radius management, and LC or MPO terminations depending on the application."),
      block("Phase 3: Testing and Labeling", "h2"),
      block("Every copper run gets certified — checking wiremap, length, insertion loss, NEXT, and return loss per TIA-568 standards. Fiber runs get OTDR traces and power meter readings at each wavelength. Test results are saved electronically and become part of the closeout package."),
      block("Labeling follows TIA/EIA-606. Each cable, panel port, outlet, and patch cord gets a unique ID that maps to the as-built drawings. This is what gets scrutinized hardest on data center audits."),
      block("Phase 4: Rack Dressing and Documentation", "h2"),
      block("Cables entering a rack or patch panel need to be dressed — managed with velcro, D-rings, or horizontal managers so they sit clean and can be traced by eye. Documentation at closeout includes test reports, label schema, as-built drawings, and a punch list for any follow-up items."),
      block("Clean cabling doesn't happen by accident. It comes from crews that have done it enough times to have a system — and from PMs who hold the standard at every walkthrough."),
    ],
  },
  {
    _id:   "post-ap-refresh-at-scale",
    _type: "post",
    title: "AP Refresh at Scale: Planning a Multi-Site Wireless Rollout in Active Environments",
    slug:  { _type: "slug", current: "ap-refresh-at-scale" },
    excerpt: "Deploying hundreds of access points across active warehouse or logistics facilities requires more than a deployment playbook. Here's how to think about scheduling, coordination, and handover across a large program.",
    category: "Wireless & AP",
    author: "Saad Usmani",
    publishedAt: "2026-04-28T09:00:00.000Z",
    body: [
      block("A multi-site AP refresh at scale — 500+ access points across 10 or more locations — is a fundamentally different challenge from a single-site install. The technical work is straightforward. The hard part is coordination: scheduling around 24/7 operations, managing consistency across crews at different sites, and producing documentation the network team can actually use at handover."),
      block("Start with a Pre-Deployment Site Survey", "h2"),
      block("Before deployment begins, each site needs a physical walkthrough. This isn't the same as an RF survey — it's a field review to confirm mounting heights, ceiling types, cabling pathways, and any environmental factors. Cold storage and freezer areas require rated hardware and additional facilities coordination."),
      block("The output is a per-site deployment plan: AP count by zone, mount type, cabling route, and site-specific constraints. This becomes the instruction set for the deployment crew."),
      block("Scheduling Around Active Operations", "h2"),
      block("Warehouse and logistics facilities rarely go dark. In most cases, the AP refresh runs across multiple shifts — nights and weekends — to avoid disrupting pick, pack, and ship operations. This has real implications for crew sizing and project duration."),
      block("For programs where speed matters, the answer is more crews working in parallel, not longer shifts. A crew of two can typically mount, cable, and document 20-30 APs per shift depending on ceiling type and cable run length."),
      block("Consistency Across Sites", "h2"),
      block("The biggest quality risk on a multi-site program is drift — where each site ends up with slightly different labeling conventions, mounting heights, or documentation formats. A standardized deployment playbook issued before crews hit site 1 is how you prevent this."),
      block("RF Validation and Handover", "h2"),
      block("Installation alone doesn't close a wireless project. Each site needs post-install RF validation — a walkthrough with a Wi-Fi analyzer to confirm coverage matches the design. Handover documentation should include an AP inventory by site, RF validation results, and any punch list items carried forward."),
    ],
  },
  {
    _id:   "post-rack-and-stack-best-practices",
    _type: "post",
    title: "Rack & Stack Best Practices: From Pre-Build Planning to Validated Handover",
    slug:  { _type: "slug", current: "rack-and-stack-best-practices" },
    excerpt: "Good rack-and-stack execution doesn't start when the crew arrives on site. It starts with a solid pre-build plan — and it doesn't end until the documentation is signed off.",
    category: "Data Center",
    author: "Saad Usmani",
    publishedAt: "2026-05-05T09:00:00.000Z",
    body: [
      block("Rack-and-stack work looks straightforward on a statement of work — mount the servers, install the PDUs, run the cables. But the gap between a build that passes handover and one that gets sent back for rework usually comes down to what happened before the crew arrived, and what documentation was produced when they left."),
      block("Pre-Build Planning: The Work Before the Work", "h2"),
      block("Before a rack is touched, the team needs a build plan: rack layout diagrams showing U position assignments for every piece of hardware, power mapping (which circuits feed which PDUs), and a cable management design that accounts for patch cords, power cables, and fiber trunks per rack."),
      block("This is where most problems are caught early. A server that won't fit in its assigned U due to cable management clearance. A PDU that needs a different receptacle. A fiber trunk that's 3 meters too short. Better to find these on paper than on the data center floor."),
      block("Physical Installation Standards", "h2"),
      block("Racks should be anchored and leveled before any equipment goes in. Rails go in next, then hardware, mounted bottom-up (keeps center of gravity low and improves stability during install). PDU installation and circuit labeling happen in parallel — every outlet gets labeled before anything is powered up."),
      block("Cable Management", "h2"),
      block("Structured patch cables run at consistent lengths with no excess bundled in the back. Power cables dressed with velcro and routed to avoid blocking airflow. Fiber trunks protected and routed away from copper. Labeling follows TIA/EIA-606 — every cable gets a unique ID at both ends that maps back to the as-built diagram."),
      block("Documentation and Handover", "h2"),
      block("The closeout package typically includes: rack diagrams showing final U positions, cable labels and as-built drawings, PDU circuit assignments, asset inventory with serial numbers and CMDB-ready fields, and burn-in reports where applicable."),
      block("The operations team taking ownership should be able to sit down with the closeout package and understand exactly what was built, how it's cabled, and what every label refers to. If they can't, the build isn't done."),
    ],
  },
];

// ── Mutate ───────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱  Seeding ${posts.length} posts → project ${PROJECT_ID} / dataset ${DATASET}\n`);

  const mutations = posts.map((doc) => ({ createOrReplace: doc }));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error("❌  Sanity API error:", JSON.stringify(json, null, 2));
    process.exit(1);
  }

  console.log(`✅  ${json.results?.length ?? 0} documents written`);
  json.results?.forEach((r) => console.log(`    › ${r.id}  [${r.operation}]`));
  console.log("\n✨  Done. Refresh aes-apex.sanity.studio to see the posts.\n");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
