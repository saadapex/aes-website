# AES Field Execution Evidence Package — Source and Release Register
**Drafted:** November 22, 2026
**Audience:** AES leadership, BD and project QA
**Purpose:** Support honest vendor qualification and AI/search discoverability without inflating qualifications.

## Decision and publication policy
AES is a **subcontract field-execution and infrastructure deployment partner**, not a hosting operator, general electrical contractor or provider of a public walk-in office. Project examples on the AES website are **AES-authored summaries**, not customer endorsements or independent inspection reports. A published case study is not proof that any particular instrument report, customer sign-off, reference call or insurance certificate can be provided.

**Do not publicly upload or share without the applicable owner's review:**
- customer project drawings, NDA materials, server layouts, rack inventory, telecom paths, MAC/serial lists, photos with site identifiers, safety records, credentials, test results and contract correspondence;
- customer, prime or hyperscaler names not expressly approved for attribution; claims implying direct contractual privity where AES worked through a prime;
- purported C-7/C-10, BICSI, ISO or other certification/license numbers not backed by current official records.

## Evidence inventory and readiness (November 22, 2026)

| Reference category | AES-public project account | Existing source material reviewed | What it does **not** establish | Next evidence gate |
|---|---|---|---|---|
| Memphis GPU-dense data center | [AI Cluster Pod Build](https://www.apexsolutions.io/case-studies/ai-cluster-pod-build) | AES internal project case-study write-up in Drive describing a 6–7-person field crew and multiple phases | Customer authorization, independently verified acceptance, OTDR pass rates, or a third-party endorsement | Confirm contractual counterparty/attribution; collect permission-cleared handover and test sign-off excerpts |
| Ontario warehouse wireless (two facilities) | [Ontario AP Refresh](https://www.apexsolutions.io/case-studies/fulfillment-ap-refresh-ontario) | AES internal case-study write-up reports approximately 476 plus 1,110 APs, 46 IDFs, Q1 2026 and a 24-hour window at one site; an associated pre-execution AP replacement SOW also exists | SOW is *planned scope*, not completion evidence; case-study results are self-reported; a client-approved acceptance record was not retrieved for release | Locate customer-signed acceptance or per-AP closeout count; redact and obtain written release permission |
| U.S. warehouse AP installation | [U.S. AP Refresh](https://www.apexsolutions.io/case-studies/amazon-ap-refresh) | Public AES case-study account reports 850 APs through an implementation partner | Independent validation, authorized brand usage, or full RF acceptance under every project scope | Locate implementation partner work completion and site acceptance records |
| U.S. telecom transport lab | [Transport Lab](https://www.apexsolutions.io/case-studies/telecom-transport-lab) | Public AES case-study account describes six racks and a two-week installation window | Independently signed commissioning/acceptance pack | Locate project signed punchlist, approved redlined drawings and customer permission |
| Quality framework | [Public explanation](https://www.apexsolutions.io/resources/field-execution-evidence) | AES Quality Control Program **AES-QMS-QCP-001**, **Rev. 5.0**, effective October 1, 2026; controlled release in AES Drive | Third-party ISO/BICSI certification or proof every past engagement complied with every stage | Maintain control-copy provenance, per-project inspection/test plans and completion evidence |

The internally located Word documents, AP statement of work and controlled QC PDF were read for drafting and cross-checking. They are **not** included in the public website or this repository. Do not assume Drive documents are publicly shareable.

## Recommended buyer-facing proof sequence
1. **Capability and scope:** Confirm buyer location, subcontracting model, what AES will self-perform versus source through partners, and license/permit responsibilities.
2. **Relevant example:** Send the link to a matching existing AES case study, clearly labeled as AES-published.
3. **Acceptance plan:** Provide a controlled, redacted template listing each link/device/rack, inspection stage, instrument and limits, evidence filename and customer sign-off owner.
4. **Document control:** Produce sample reports only if actually available, technically valid, and approved for release. Otherwise send a marked **illustrative blank template**, not fabricated completed test records.
5. **Reference check:** Offer a customer or prime contact only after obtaining that person's and organization's permission.
6. **Scope and jurisdiction:** Validate whether low-voltage, electrical, other construction or Canadian partner arrangements require a licensed/signatory contractor before pricing and mobilization.

## Minimum evidence fields by workstream

### Structured cabling / fiber
Project identifier (redacted for public version), cable schedule ID, from/to endpoints, media/fiber category, route/as-built reference, labeling scheme, link length, applicable standards and loss budget, copper/OLTS/OTDR/polarity tests **as contracted**, instrument identification/calibration status when required, raw file ID, pass/fail and retest disposition, photo permissions, witness/acceptance approver.

### Multi-site AP refresh
Site ID (redacted if restricted), approved AP count, legacy/new AP identifiers, position and mount height, MAC/serial/port per client rules, mounting/cable qualification results, pre-staged hardware count, lift/safety approvals, cutover/change window, network-engineer controller acceptance, RF walk-test *only if in scope*, per-AP status, exceptions, site-level signoff.

### Rack-and-stack
Approved elevations, BOM and equipment list, rack/asset tags, staged vs installed count, rack-level photos where allowed, cable/port mapping, allowable power work and license handoff, burn-in or device validation if contracted, serial/CMDB reconciliation, punchlist and signoff.

## What has been published in this iteration
- New public page **/resources/field-execution-evidence** linking four existing AES-authored case studies and explaining the approved QC lifecycle and documentation a buyer can ask for.
- Stronger fiber-acceptance and multi-site warehouse AP refresh content on the two existing service pages, using relevant buyer search language and clearer proof pathways.
- Consistent caveats: test methods and deliverables follow the executed scope; Canada via partners; published work examples are not independent endorsements.
- Internal link from the Resources directory plus inclusion in sitemap.

## Owner approval gates
- **BD / CEO:** Approve any client-facing performance numbers and named references for redistribution beyond existing AES-published pages.
- **Operations / PM:** Confirm executed engagement, client/prime relationship, completion and acceptance evidence for case-study metrics.
- **QC lead:** Review instrument result samples, document version, acceptance parameters and whether records can be shared.
- **Legal / client permission:** Confirm work-product ownership, NDA obligations, photo authorization and logo permissions before publishing.
- **Licensing / contracting:** Confirm proper licensed partner status and project jurisdiction; do not imply AES itself holds a CSLB C-7/C-10 license.

## Testing follow-up
The November 22 Google AI Mode baseline found AES in **0 of 2 neutral buyer prompts**. Record future reruns of the *exact same questions* with model/product, account or guest state, local date and cited vendors; an immediate after-deployment repeat is a smoke test, **not** proof of search-engine recrawl or causal lift. When Google Search Console confirms crawling of these page changes, measure again. Other AI systems were not yet independently measured.

**Public release status:** Public page contains only AES's existing published cases, carefully qualified and linked. **Private evidence-attachment status:** gated; no actual client-signed acceptance files or unredacted test reports were published.
