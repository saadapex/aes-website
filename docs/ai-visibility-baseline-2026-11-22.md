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
