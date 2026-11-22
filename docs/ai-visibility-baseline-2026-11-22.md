# AES AI Search & Recommendation Baseline — November 22, 2026

**Purpose:** Establish a first-party, reproducible sample of whether buyer-style questions recommend Apex Enterprise Solutions (AES), and identify evidence gaps. **Baseline sample only; do not extrapolate across all queries, users, locations, models or dates.**

## Test design
- All buyer discovery questions omit "AES", "Apex" and `apexsolutions.io`. A separate branded question checks company recognition and accuracy but **does not** count as a recommendation test.
- Test date: November 22, 2026 (America/Los_Angeles); source: actual Google Search AI Mode `udm=50` generated responses, inspected through an authenticated Google browser. Browser was signed in as the company's Google account; possible personalization cannot be excluded. Each prompt opened via its own query URL.
- **Metric:** unsolicited AES inclusion in the generated shortlist or its cited links. Do not count Google account header, unrelated organic listings, or branded prompts.
- Search results on their own do not count as AI model responses. Individual AI results are variable and non-deterministic.
- This audit tests Google's **Search AI Mode**, not the standalone Gemini app. A separate standalone Gemini browser test was blocked by its rich-text editor interaction.

### Q1 — Bay Area infrastructure execution
**Exact prompt:**
> A San Francisco Bay Area data-center infrastructure manager needs a reliable subcontract field-execution partner for structured cabling, fiber testing/certification, rack-and-stack and wireless access-point rollouts. Recommend up to five specific companies worth shortlisting, including each company’s website and why it fits. Do not recommend hosting/colo providers instead of installation services.

**Actual AI-generated recommendations in presented order:**

| Position | Company named in answer | Citation/website surfaced |
|---:|---|---|
| 1 | Access Cabling | https://accesscabling.com/ |
| 2 | Signal Solutions Corporation | https://www.signalsolutions.com/services/ |
| 3 | MDC Low Voltage Systems (McMillan Data Communications) | https://www.linkedin.com/company/mcmillan-data-communications |
| 4 | Infinite Networks | https://infinitenetworksinc.com/ |
| 5 | Data Infrastructure Solutions | https://www.datainfrasolution.com/ |

**AES spontaneously mentioned or cited:** No.
**Provenance:** Browser AI Mode result captured at https://agent.tinyfish.ai/runs/4cbb968c-2922-472a-9378-435e9b1c4c2a.
**Important:** These are *AI recommendations*, not our vendor endorsements. Their rankings, qualifications and cited claims were not independently verified in this audit.

### Q2 — Nationwide warehouse AP refresh and cabling
**Exact prompt:**
> A US systems integrator needs a subcontract partner to run multi-site warehouse wireless access point refreshes and structured cabling across US sites, with documented closeout. Which up to five field-services companies should they consider? Give links, no generic marketplaces unless clearly labeled.

**Actual AI-generated recommendations in presented order:**

| Position | Company named in answer | Citation/website surfaced |
|---:|---|---|
| 1 | TechLink Services | https://techlinkservices.com/nationwide-structured-cabling-installation/ |
| 2 | IES Communications | https://www.iescomm.com/ |
| 3 | SRS Networks | https://srsnetworks.com/best-nationwide-wifi-deployment-companies |
| 4 | TailWind Voice & Data | https://www.tailwindvoiceanddata.com/ |
| 5 | Globalcom Technologies | https://www.gctech.us/national-rollouts/ |

**AES spontaneously mentioned or cited:** No.
**Provenance:** Browser AI Mode result https://agent.tinyfish.ai/runs/b8dc13cf-d535-4aa6-9450-d2f74469588f.
**Important:** Output ordering is a single answer's displayed order, not a stable industry ranking.

**Measured recommendation-sample baseline:** **0 appearances in 2 completed, neutral Google AI Mode buyer prompts.** Two observations are far too few to estimate a general market visibility rate.

### Q3 — Branded knowledge and claim accuracy (separate measure)
**Exact prompt:**
> What does Apex Enterprise Solutions (apexsolutions.io) do? Identify its actual service offerings, regions, customer type, any independently verifiable licensing or certifications, and project evidence. Cite sources and clearly mark unknown qualifications.

**Outcome:** Google AI Mode generated a company-specific answer and described AES as a Sunnyvale-based field-execution business, correctly recognized cabling/fiber, rack-and-stack, wireless AP rollouts and smart hands, and recognized the website's self-published geographic/project information. It cited the AES website and a founder LinkedIn post. It explicitly treated CSLB C-7/C-10, BICSI/ISO certifications and certain electrical-partner claims as **unverified**; no such license should be inferred or published without proof. The model also highlighted reliance on self-published case studies without independent third-party corroboration.

**Provenance:** https://agent.tinyfish.ai/runs/4ba1e54e-d065-462f-a780-578276decf01.
**Interpretation:** **Branded recognition exists; spontaneous non-branded recommendations were absent in our two sampled AI Mode tests.**

## Other model access test results (NOT visibility negatives)

| Platform | Actual generated buyer answer captured? | Limitation |
|---|---|---|
| Standalone Gemini | No | Signed-in page accessible but Quill.js prompt editor rejected automation input after repeated attempts |
| ChatGPT guest browser | No | Cloudflare CAPTCHA/security challenge and no usable guest signed-in session |
| Claude | No | Login required; no anonymous prompt access |
| Perplexity | No | Cloudflare human-verification challenge blocked interface |
| Microsoft Copilot | No | Microsoft account sign-in required |

These are **unmeasured**, not AES absence. Never compute a total cross-model recommendation rate including them.

Source runs:
- Gemini: https://agent.tinyfish.ai/runs/eec3247c-9268-4e17-adc4-8e8000e8dcc5
- ChatGPT guest: https://agent.tinyfish.ai/runs/85247758-3884-46b8-a3b7-7bd1970a4a8d
- Claude: https://agent.tinyfish.ai/runs/374fd8d1-8729-45d7-9460-40b61af07960
- Perplexity: https://agent.tinyfish.ai/runs/fc781723-5c0a-4cbe-9651-a139423dc6f9
- Copilot: https://agent.tinyfish.ai/runs/67ac1fe0-84f4-4a07-9335-242c6afcb61c

## Independent web search context (not model recommendations)
Unbranded search examples surfaced Access Cabling, SRS Networks, Karavan, and Matrix Technology Group for relevant cabling/data center/wireless rollout services. Web search also returned AES's own homepage and service page when the company name appeared in the query. Search result snippets may retain the superseded street address until recrawled even though the live AES website no longer displays it in its main visible content or homepage JSON-LD.

Example public pages:
- https://www.apexsolutions.io/services
- https://accesscabling.com/california/san-jose/data-center-cabling
- https://srsnetworks.com/network-installation-services
- https://gokaravan.com/wireless-networks/
- https://www.matrixtg.com/warehouse-network-cabling/

## Provisional implications and next actions
1. **Proof first**: Add publicly sharable, permission-cleared project outcome evidence, redacted sample OTDR/OLTS and copper certification/closeout packs, real customer/prime references where permitted, and named delivery regions/partner structures. Do not invent licensing or certifications; in California, reflect that licensed work requires licensed resources.
2. **Buyer-targeted service pages**: Make a clear structured cabling/fiber acceptance page and a nationwide multi-site AP refresh/warehouse execution page easy to discover, with explicit subcontract model, jobsite QA and documented deliverables. Existing pages can be enhanced rather than multiplied.
3. **Geographic specificity without misleading addresses**: Consider a single real Bay Area execution/service-area page with actual coverage and evidence; do not create fictitious walk-in offices or doorway pages.
4. **Third-party corroboration**: Strengthen legitimate partner/vendor directories and permission-cleared references. Optimize for real buyers, not AI bot keyword stuffing.
5. **Retest**: Re-run the **same exact Q1/Q2** with a recorded date/session after search engines crawl updated pages, alongside several additional unbiased questions. Compare prompts and output citations. For ChatGPT/Claude/Perplexity/Copilot, only test after legitimate account access and user approval; if blocked, retain "unmeasured."
6. **Separate workflow**: Google Business Profile physical verification is on hold at the owner's request. Do not initiate SMS/postcard/video verification or publish the private address.

**Audit notes:** Search and AI recommendation responses can contain inaccuracies; reported competitor qualifications are observations, not independently verified facts. Keep exact prompts and model/session differences in future comparisons.


## Post-publication deployment and immediate smoke retest — November 22, 2026

**Code release:** [PR #5](https://github.com/saadapex/aes-website/pull/5), merged to main, squash commit \`5e9402f46748286d18a2d2afc0335787e4eb9d20\`. Vercel deployment status **success**.

**Live acceptance checks:**
- https://www.apexsolutions.io/resources/field-execution-evidence is now live, self-canonical and \`index, follow\`. It links four existing AES-published case studies and qualifies their evidence status.
- https://www.apexsolutions.io/services/structured-cabling and https://www.apexsolutions.io/services/ap-refresh contain new scope-specific acceptance/playbook content and link to the evidence page. Both are live, self-canonical and \`index, follow\`.
- https://www.apexsolutions.io/resources links to the new resource.
- Live https://www.apexsolutions.io/sitemap.xml now returns **40 URLs** (39 prior + one evidence resource).

**Retest methodology:** Re-ran the exact same *unbranded* Google AI Mode Q1 and Q2 via \`udm=50\` immediately after production deployment. These are only smoke tests: **search engines have not yet confirmed recrawling the new content**, and model responses are stochastic / potentially personalized.

| Exact prompt | Initial AI Mode top five (first test) | Immediate post-deploy top five | Spontaneous AES mention? |
|---|---|---|---|
| Q1: Bay Area physical cabling + rack-and-stack + wireless execution | Access Cabling; Signal Solutions; MDC Low Voltage; Infinite Networks; Data Infrastructure Solutions | Access Cabling; Infinite Networks; Signal Solutions; Zencom Cabling Solutions; Claw Communications | No → No |
| Q2: nationwide multi-site warehouse AP refresh + cabling | TechLink Services; IES Communications; SRS Networks; TailWind; Globalcom Technologies | Matrix Technology Group; SRS Networks; QuadPoint; National Data Contractor; Globalcom Technologies | No → No |

**Direct response references:** [Q1](https://agent.tinyfish.ai/runs/1c57479f-bd3e-44bf-8d9f-1e3bc2ccf997) and [Q2](https://agent.tinyfish.ai/runs/1da8b99a-b7b1-47f5-bfb3-05c40667b08c). Distinguish generated answers from organic listings. Do not claim improvement, regression, stable competitor rank or causal impact from these immediate snapshots.

**Google Search Console URL Inspection:** Newly published \`/resources/field-execution-evidence\` was reported **URL unknown to Google / not indexed**, as expected for a just-published URL. A user-initiated Request Indexing attempt triggered a live test but Google displayed: **"Oops! Something went wrong - We had a problem submitting your indexing request. Please try again later."** This is **not a successful submission**. The two older service URLs were not inspected in that same browser run due to its step budget. Source: https://agent.tinyfish.ai/runs/bc52c7ba-36aa-4d7a-8725-1e6ca5302836.

**Next valid comparison point:** After Search Console records a new crawl/recognition of the resource and service pages, rerun the same buyer prompts and log presence + cited sources. Indexing is not guaranteed, and short-term position changes are not attributable to this release.


## External-visibility actions and source hygiene — November 22, 2026

This section records **external listing and partner-visibility work**, distinct from AI model recommendations and internal website edits. A submitted listing is not a live backlink.

| Surface | Status verified this date | Next action / limits |
|---|---|---|
| [AES LinkedIn](https://www.linkedin.com/company/apexenterprisesolutions/) | Existing company-owner-administered profile updated: service-area/no-walk-in-office wording, IT Services and IT Consulting category, HTTPS website, and 10 service-related specialties | Recheck public indexing after LinkedIn search cache refresh; no street address was present in owner edit fields |
| [AES GitHub website repository](https://github.com/saadapex/aes-website) | Public README updated and merged with accurate buyer-facing services, case study and contact links | Owner-controlled public reference, **not independent corroboration** |
| [Data Center Contractors Hub](https://datacentercontractorshub.com/) | Free AES structured-cabling listing submitted, email confirmed, receipt #000008; **editorial review pending**; public search returns no AES entry | Check whether eventually publicly published. Do not duplicate submission or buy upsells |
| [DataCenterUPS](https://datacenterups.com/) | Free basic contractor listing request submitted via site's contact form; explicit success confirmation and promise to review; **not publicly live** | Check business inbox response and verify published URL/category/HTTPS link if approved |
| [NORAMARK AES page](https://www.noramark.com/apex-enterprise-solutions/) | An existing third-party profile is visible, correctly says "Service Provider" in body, but browser title says "Manufacturer" and official Website field says "N/A" | Claim/edit requires verified account. No correction submitted and no login/account created. Lower priority because platform primarily serves manufacturing firms |
| [PrivCo AES profile](https://www.privco.com/company/apex-enterprise-solutions) | Existing public summary describes AES's infrastructure field-execution services and Sunnyvale base | No owner edit undertaken; public listing not independently validated as an endorsement |
| [Karavan Technology partner page](https://gokaravan.com/partner) and [Inventiv Technology](https://inventivtechnology.com/) | Credible potential *partner-controlled* domains; AES homepage already publishes named testimonials from Karavan and Inventiv | A reciprocal, voluntary AES service-subcontractor profile/link would require partner cooperation and prior messaging approval; **no emails or requests sent** |

**Submission controls:** Public business email \`info@apexsolutions.io\`, business telephone, site domain and **Sunnyvale, CA only** were used where needed. No customer-facing street, questionable third-party certifications/contractor licenses, paid upgrades or private customer records were submitted. Both directory sites make their own publication decisions; SEO/referral impact cannot be inferred without published profiles and traffic/referral evidence.

**Discovery and brand hygiene:** Public corporate registry mirrors may still reproduce corporate filing street address independently of the company's service-area marketing profile. Do not confuse a legal registered address with a client walk-in site, and do not re-publish it on marketing listings. No claim is made that a third-party public legal filing can be changed solely by editing the website.

**Scheduling note:** Attempted to create a limited daily condition monitor for publication/approval of these two pending listings. The automation system refused creation because all five active task slots were in use. **No new scheduled watcher exists**, and no existing AES automation was modified. Manual public checks and email-reply review can continue in future requested turns.
