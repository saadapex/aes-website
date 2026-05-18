/**
 * AES Blog Seed Script
 * ---
 * Pushes 3 starter blog posts to the Sanity production dataset.
 *
 * Setup:
 *   1. Go to https://www.sanity.io/manage → project ok6qwghh → API → Tokens
 *   2. Create a token with "Editor" permission
 *   3. Add to .env.local:  SANITY_WRITE_TOKEN=skXXX...
 *   4. Run:  npx ts-node --project tsconfig.json scripts/seed-blog.ts
 *
 * Safe to re-run — uses createOrReplace keyed on slug.
 */

// next-sanity bundles @sanity/client — no extra install needed
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({ path: ".env.local" });
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require("next-sanity");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ok6qwghh",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_WRITE_TOKEN,
  useCdn:    false,
});

// ─── Helper: turn plain paragraphs into Portable Text blocks ────────────────
function blocks(
  ...paragraphs: (string | { style: string; text: string })[]
) {
  return paragraphs.map((p) => {
    if (typeof p === "string") {
      return {
        _type: "block",
        _key: Math.random().toString(36).slice(2),
        style: "normal",
        children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text: p, marks: [] }],
        markDefs: [],
      };
    }
    return {
      _type: "block",
      _key: Math.random().toString(36).slice(2),
      style: p.style,
      children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text: p.text, marks: [] }],
      markDefs: [],
    };
  });
}

// ─── Posts ───────────────────────────────────────────────────────────────────
const posts = [
  // ── 1. Structured Cabling 101 ──────────────────────────────────────────────
  {
    _id:   "post-structured-cabling-101",
    _type: "post",
    title: "Structured Cabling 101: What to Expect from a Copper & Fiber Installation Project",
    slug:  { _type: "slug", current: "structured-cabling-101" },
    excerpt: "From pathway design to OTDR test reports — a practical overview of what a structured cabling engagement looks like, and what to look for at each stage.",
    category: "Structured Cabling",
    author: "Saad Usmani",
    publishedAt: "2026-04-15T09:00:00.000Z",
    body: blocks(
      { style: "normal", text: "Structured cabling is the backbone of every data center, warehouse, and enterprise facility — but the engagement process is often opaque, especially for primes and project managers who are coordinating field work across multiple trades. Here's a straightforward breakdown of what a cabling project actually involves, from kickoff to closeout." },

      { style: "h2", text: "Phase 1: Site Survey and Pathway Design" },
      { style: "normal", text: "Before a single cable is pulled, the crew needs to understand the physical environment. A site survey identifies conduit routes, tray paths, wall penetrations, and any obstacles — dropped ceilings, concrete cores, fire-rated walls — that will affect the install. This is also when you confirm the number of drops, panel locations, and whether existing pathways can be reused or need to be cleared." },
      { style: "normal", text: "On larger projects, this phase produces a pathway design document that gets approved before work begins. Skipping this step is one of the most common sources of scope growth on cabling projects." },

      { style: "h2", text: "Phase 2: Pulling and Terminating" },
      { style: "normal", text: "Copper runs (CAT6 or CAT6A) are pulled from the IDF/MDF room to each outlet or device location and terminated at both ends — patch panels on the infrastructure side, keystones or RJ45 plugs at the device side. Fiber runs follow a similar pattern but require additional care: SM or MM strand selection, proper bend radius management, and LC or MPO terminations depending on the application." },
      { style: "normal", text: "Fusion splicing is used where pre-terminated fiber isn't practical — long runs, harsh environments, or situations where pull damage to factory-terminated connectors is a risk." },

      { style: "h2", text: "Phase 3: Testing and Labeling" },
      { style: "normal", text: "Every copper run gets tested with a cable certifier — checking for wiremap, length, insertion loss, NEXT, and return loss per TIA-568 standards. Fiber runs get OTDR traces and power meter readings at each wavelength. Test results are saved electronically and become part of the closeout package." },
      { style: "normal", text: "Labeling follows TIA/EIA-606. Each cable, panel port, outlet, and patch cord gets a unique ID that maps to the as-built drawings. This is what makes moves, adds, and changes manageable years later — and it's what gets scrutinized hardest on data center audits." },

      { style: "h2", text: "Phase 4: Rack Dressing and Documentation" },
      { style: "normal", text: "Cables entering a rack or patch panel need to be dressed — managed with velcro, D-rings, or horizontal managers so they sit clean, can be traced by eye, and don't block airflow. Documentation produced at closeout typically includes: test reports, label schema, as-built drawings, and a punch list showing any items flagged for follow-up." },

      { style: "h2", text: "What to Ask Your Cabling Sub" },
      { style: "normal", text: "Before awarding work, it's worth confirming a few things: What test equipment are they using and is it calibrated? Do they label per TIA-606 or their own schema? What's their process for failed tests — retest, re-terminate, or re-pull? And how do they handle permitting and coordination with other trades?" },
      { style: "normal", text: "Clean cabling doesn't happen by accident. It comes from crews that have done it enough times to have a system — and from project managers who hold the standard at every walkthrough." },
    ),
  },

  // ── 2. AP Refresh at Scale ─────────────────────────────────────────────────
  {
    _id:   "post-ap-refresh-at-scale",
    _type: "post",
    title: "AP Refresh at Scale: Planning a Multi-Site Wireless Rollout in Active Environments",
    slug:  { _type: "slug", current: "ap-refresh-at-scale" },
    excerpt: "Deploying hundreds of access points across active warehouse or logistics facilities requires more than just a deployment playbook. Here's how to think about scheduling, coordination, and handover across a large program.",
    category: "Wireless & AP",
    author: "Saad Usmani",
    publishedAt: "2026-04-28T09:00:00.000Z",
    body: blocks(
      { style: "normal", text: "A multi-site AP refresh at scale — think 500+ access points across 10 or more locations — is a fundamentally different challenge from a single-site install. The technical work is straightforward. The hard part is the coordination: scheduling around 24/7 operations, managing consistency across crews at different sites, and producing documentation that the network team can actually use at handover." },

      { style: "h2", text: "Start with a Pre-Deployment Site Survey" },
      { style: "normal", text: "Before deployment begins, each site needs a physical walkthrough. This isn't the same as an RF survey — it's a field review to confirm mounting heights, ceiling types (open web steel joist, solid concrete deck, T-bar), cabling pathways, and any environmental factors that will affect the install. Cold storage and freezer areas require rated hardware and additional coordination with the facilities team." },
      { style: "normal", text: "The output of the site survey is a per-site deployment plan: AP count by zone, mount type, cabling route, and any site-specific constraints. This becomes the instruction set for the deployment crew." },

      { style: "h2", text: "Scheduling Around Active Operations" },
      { style: "normal", text: "Warehouse and logistics facilities rarely go dark. In many cases, the AP refresh has to happen across multiple shifts — nights and weekends — to avoid disrupting pick, pack, and ship operations. This has real implications for crew sizing and project duration." },
      { style: "normal", text: "For programs where speed matters, the answer is usually more crews working in parallel, not longer shifts. A crew of two can typically mount, cable, and document 20-30 APs per shift depending on ceiling type and cable run length. Scale from there based on your timeline." },

      { style: "h2", text: "Consistency Across Sites" },
      { style: "normal", text: "The biggest quality risk on a multi-site program is drift — where each site ends up with slightly different labeling conventions, mounting heights, or documentation formats. A standardized deployment playbook, issued before crews hit site 1, is how you prevent this." },
      { style: "normal", text: "The playbook should cover: mount height and orientation standards by ceiling type, label format and placement, cabling and containment requirements, controller or cloud onboarding steps, and the validation checklist each AP needs to pass before the crew moves on." },

      { style: "h2", text: "RF Validation and Handover" },
      { style: "normal", text: "Installation alone doesn't close a wireless project. Each site needs post-install RF validation — a walkthrough with a Wi-Fi analyzer to confirm coverage matches the design. If you're working from a controller-managed or cloud-managed platform, this also includes confirming that every AP is onboarded, showing the right channel and power settings, and has passed the client's acceptance criteria." },
      { style: "normal", text: "Handover documentation should include an AP inventory by site (MAC address, serial, location), RF validation results, and any punch list items carried forward. The better the closeout pack, the smoother the transition to the network team's ownership." },

      { style: "h2", text: "The Field Team Makes the Difference" },
      { style: "normal", text: "On a large program, the quality of the deployment comes down to the field team. Experienced technicians who have done high-bay and freezer installs before, who understand the difference between a clean cable run and a messy one, and who produce documentation without being chased — those are the people who get programs across the finish line on schedule." },
    ),
  },

  // ── 3. Rack & Stack Best Practices ────────────────────────────────────────
  {
    _id:   "post-rack-and-stack-best-practices",
    _type: "post",
    title: "Rack & Stack Best Practices: From Pre-Build Planning to Validated Handover",
    slug:  { _type: "slug", current: "rack-and-stack-best-practices" },
    excerpt: "Good rack-and-stack execution doesn't start when the crew arrives on site. It starts with a solid pre-build plan — and it doesn't end until the documentation is signed off.",
    category: "Data Center",
    author: "Saad Usmani",
    publishedAt: "2026-05-05T09:00:00.000Z",
    body: blocks(
      { style: "normal", text: "Rack-and-stack work looks straightforward on a statement of work — mount the servers, install the PDUs, run the cables. But the gap between a rack build that passes handover and one that gets sent back for rework usually comes down to what happened before the crew arrived on site, and what documentation was produced when they left." },

      { style: "h2", text: "Pre-Build Planning: The Work Before the Work" },
      { style: "normal", text: "Before a rack is touched, the team needs a build plan: rack layout diagrams showing U position assignments for every piece of hardware, power mapping (which circuits feed which PDUs, what the load looks like per phase), and a cable management design that accounts for how many patch cords, power cables, and fiber trunks are running to each rack." },
      { style: "normal", text: "This planning phase is where most problems are caught early. A server that won't fit in its assigned U because of cable management clearance. A PDU that needs a different receptacle than what's on the circuit. A fiber trunk that's 3 meters too short. Better to find these on paper than on the data center floor." },

      { style: "h2", text: "Physical Installation Standards" },
      { style: "normal", text: "Racks should be anchored and leveled before any equipment goes in. Seismic considerations apply in many jurisdictions — verify the anchoring requirement before committing to a method. Rails go in next, then hardware, mounted from the bottom of the rack up (keeps the center of gravity low and makes the rack more stable during install)." },
      { style: "normal", text: "PDU installation and circuit labeling happen in parallel with hardware mounting. Every outlet and circuit gets a label before anything is powered up — trying to label live circuits after the fact is where mistakes happen." },

      { style: "h2", text: "Cable Management: The Hardest Part to Get Right" },
      { style: "normal", text: "Cable management is where the quality of a rack build is most visible. Structured patch cables run at consistent lengths with no excess bundled in the back. Power cables dressed with velcro and routed cleanly to avoid blocking airflow. Fiber trunks protected and routed away from copper to minimize interference risk." },
      { style: "normal", text: "Labeling follows TIA/EIA-606: every cable gets a unique ID at both ends that maps back to the as-built diagram. This is non-negotiable for data centers where the operations team needs to trace connections quickly — and where audits will check for it." },

      { style: "h2", text: "BIOS, Firmware, and Burn-In" },
      { style: "normal", text: "On hardware refresh or new build projects, there's often a requirement to validate BIOS/firmware versions and run a burn-in test before handover. Burn-in — running the system under load for a defined period, typically 24-72 hours — surfaces early hardware failures before the system goes into production. This is worth building into the project schedule rather than treating as optional." },

      { style: "h2", text: "Documentation and Handover" },
      { style: "normal", text: "A rack build is not complete until the documentation is done. The closeout package typically includes: rack diagrams showing final U positions, cable labels and as-built drawings, PDU circuit assignments, asset inventory with serial numbers and CMDB-ready fields, and burn-in reports where applicable." },
      { style: "normal", text: "The operations team taking ownership of the equipment should be able to sit down with the closeout package and understand exactly what was built, how it's cabled, and what every label refers to. If they can't, the build isn't done." },

      { style: "h2", text: "Punch-List Management" },
      { style: "normal", text: "Even well-run builds produce punch list items — a cable that needs redressing, a label that needs reprinting, a firmware version that needs updating. The difference between a professional crew and a problematic one is whether punch list items are tracked, communicated clearly, and resolved before final sign-off is requested. A clean punch list is part of the deliverable." },
    ),
  },
];

// ─── Seed ────────────────────────────────────────────────────────────────────
async function seed() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌  SANITY_WRITE_TOKEN is not set in .env.local");
    console.error("   Go to https://www.sanity.io/manage → project ok6qwghh → API → Tokens");
    console.error("   Create an Editor token and add it as SANITY_WRITE_TOKEN");
    process.exit(1);
  }

  console.log("🌱  Seeding blog posts to Sanity...\n");

  for (const post of posts) {
    const result = await client.createOrReplace(post);
    console.log(`✅  ${result._id}  →  "${(post as any).title}"`);
  }

  console.log("\n✨  Done. Visit https://aes-apex.sanity.studio to view and edit posts.");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
