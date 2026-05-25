export interface LocationPage {
  slug: string;
  city: string;
  region: string;        // State or province + abbreviation
  country: "US" | "CA";
  metaTitle: string;
  metaDescription: string;
  cardSummary: string;   // Short blurb (~100 chars) for index card preview
  heroH1: string;
  heroSub: string;
  servicesEmphasized: string[]; // Service slugs to highlight
  siteTypes: { heading: string; body: string }[];
  whyHere: { heading: string; body: string }[];
  nearbyCoverage: string[];
  caseStudySlug?: string;
  faq: { q: string; a: string }[];
}

export const LOCATIONS: LocationPage[] = [
  {
    slug: "san-francisco-bay-area",
    city: "San Francisco Bay Area",
    region: "California",
    country: "US",
    metaTitle: "Structured Cabling, Rack & Stack & AP Refresh in San Francisco Bay Area",
    metaDescription:
      "AES delivers structured cabling, rack-and-stack, AP refresh, and smart hands across Sunnyvale, San Jose, Santa Clara, Fremont, and the greater Bay Area — hyperscale DC, AI cluster build, and enterprise campus experience.",
    cardSummary:
      "Headquartered in Sunnyvale. Santa Clara hyperscale, AI cluster builds, enterprise campuses, and East Bay logistics.",
    heroH1: "Bay Area Field Execution — DC, AI Cluster, and Campus Infrastructure",
    heroSub:
      "AES is headquartered in Sunnyvale and runs structured cabling, rack-and-stack, AP refresh, and smart hands across the Bay Area — Santa Clara hyperscale halls, San Jose enterprise campuses, Fremont fulfillment, and the corridor in between.",
    servicesEmphasized: ["rack-and-stack", "structured-cabling", "smart-hands"],
    siteTypes: [
      {
        heading: "Hyperscale & Colocation Data Centers",
        body: "Santa Clara is one of the densest DC submarkets in the country. AES executes rack-and-stack, fiber cabling, and burn-in support inside hyperscale halls and colo cages with strict access controls and rigid commissioning windows.",
      },
      {
        heading: "AI Cluster & GPU Pod Builds",
        body: "Recent Bay Area programs include AI cluster pod builds — high-density GPU racks, 400G fabric cabling, and aggressive cable management requirements. AES brings crews briefed on the equipment, not just the schedule.",
      },
      {
        heading: "Enterprise Tech Campuses",
        body: "Sunnyvale, San Jose, Mountain View, Palo Alto — corporate campus IDF cleanups, AP refresh rollouts, and structured cabling adds/moves/changes for tech employers.",
      },
      {
        heading: "Fremont & East Bay Logistics",
        body: "Distribution and fulfillment in Fremont, Hayward, and the East Bay — warehouse AP refresh, freezer / cooler-rated installs, and high-bay cabling under live operations.",
      },
    ],
    whyHere: [
      {
        heading: "Field Execution in California Is Its Own Discipline",
        body: "California low-voltage work requires a C-7 contractor classification, and many Bay Area sites have additional union or local hire requirements. AES coordinates licensing and bonding per jurisdiction — we don't show up unprepared.",
      },
      {
        heading: "Local Headquarters, Local Response",
        body: "AES is headquartered at 1069 Duane Ct in Sunnyvale. For Bay Area projects, that means short mobilization windows, local supply pickups, and a team that knows the freeway closures before your project manager does.",
      },
      {
        heading: "Hyperscale Schedule Discipline",
        body: "Bay Area DC programs run on tight commissioning windows. AES treats the schedule as the deliverable — daily field reports, photo documentation, and pre-handover punch-list discipline, not handoffs that drag into a punch-list scramble.",
      },
    ],
    nearbyCoverage: ["Sunnyvale", "San Jose", "Santa Clara", "Fremont", "Mountain View", "Palo Alto", "Hayward", "Oakland", "San Francisco"],
    caseStudySlug: "telecom-transport-lab",
    faq: [
      {
        q: "Does AES handle Bay Area data center rack-and-stack work?",
        a: "Yes — Santa Clara hyperscale, colo, and enterprise data center rack-and-stack is one of AES's core Bay Area engagements. We support new rack buildout, hardware refresh, GPU and AI cluster pod builds, and burn-in.",
      },
      {
        q: "Can AES work in unionized Bay Area sites?",
        a: "AES coordinates licensing, bonding, and labor requirements per project jurisdiction. Where a project site has union or local hire requirements, AES sources field resources accordingly through its vetted partner network.",
      },
      {
        q: "How fast can AES mobilize for a Bay Area smart hands call?",
        a: "Response time depends on scope and current crew loading. AES is headquartered in Sunnyvale, so for simple smart-hands work in the Bay Area we can frequently have credentialed eyes on-site within 24–48 hours of scope confirmation.",
      },
    ],
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    country: "US",
    metaTitle: "Structured Cabling, AP Refresh & Field Services in Los Angeles, CA",
    metaDescription:
      "AES delivers structured cabling, rack-and-stack, large-scale AP refresh, and smart hands across Los Angeles County, the Inland Empire, and Southern California — warehouse, enterprise, and entertainment-adjacent infrastructure.",
    cardSummary:
      "Inland Empire fulfillment, Port of LA logistics, West LA enterprise, and broadcast-adjacent infrastructure.",
    heroH1: "Los Angeles & Inland Empire — Warehouse, Enterprise, and Studio-Adjacent Infrastructure",
    heroSub:
      "AES executes wireless AP rollouts, structured cabling, and smart hands across LA County and the Inland Empire — from Port of LA logistics centers to enterprise campuses in West LA to broadcast-adjacent facilities in Hollywood.",
    servicesEmphasized: ["ap-refresh", "structured-cabling", "smart-hands"],
    siteTypes: [
      {
        heading: "Inland Empire Fulfillment & Logistics",
        body: "Ontario, Riverside, San Bernardino — some of the densest fulfillment and warehousing real estate in North America. AES runs large-scale AP refresh in active picking floors, freezer / cooler installs, and structured cabling in high-bay racking environments.",
      },
      {
        heading: "Port of LA / Long Beach Logistics",
        body: "Ports-adjacent terminals, container handling facilities, and freight warehouses. AES supports cabling and wireless work scheduled around terminal operations.",
      },
      {
        heading: "West LA & Enterprise Campuses",
        body: "Corporate campuses, ad-tech offices, and tech-employer real estate in West LA, Culver City, and Playa Vista — AP refresh, cabling adds/moves/changes, and IDF cleanups.",
      },
      {
        heading: "Studio & Broadcast-Adjacent Facilities",
        body: "AES does not work inside live production sets, but supports broadcast-adjacent low-voltage cabling, post-production facility infrastructure, and entertainment-industry office buildouts.",
      },
    ],
    whyHere: [
      {
        heading: "California Licensing Is Project-Specific",
        body: "Low-voltage work in California requires a C-7 contractor classification, and LA County and city jurisdictions can add their own permitting and inspection layers. AES verifies licensing and bonding per project before mobilization.",
      },
      {
        heading: "Inland Empire Speed Requires Real Scale",
        body: "Fulfillment warehouses in the Inland Empire are huge — 800,000+ square feet is routine. A multi-site AP refresh here is not a single-tech engagement. AES brings crews sized to the program and runs daily field updates so your PM is never guessing.",
      },
      {
        heading: "LA Traffic Is a Schedule Risk",
        body: "Any LA-based project that ignores traffic and access windows is going to slip. AES plans crew arrivals around site access constraints, not the optimistic version of Google Maps.",
      },
    ],
    nearbyCoverage: ["Los Angeles", "Long Beach", "Anaheim", "Santa Ana", "Riverside", "San Bernardino", "Ontario", "Irvine", "Culver City", "Pasadena"],
    caseStudySlug: "amazon-ap-refresh",
    faq: [
      {
        q: "Can AES handle a multi-site warehouse AP refresh in the Inland Empire?",
        a: "Yes — multi-site, multi-IDF warehouse AP refresh is one of AES's core engagement types. We've executed large-scale AP refresh programs in active fulfillment environments and bring crews briefed on warehouse RF conditions, scissor-lift work, and live-operations scheduling.",
      },
      {
        q: "Does AES support cabling work in entertainment-industry facilities?",
        a: "AES supports broadcast-adjacent, post-production, and entertainment-industry office infrastructure — low-voltage cabling, AP refresh, and rack work. We do not work inside live production sets or sound stages while filming.",
      },
      {
        q: "How does AES handle LA traffic and site access constraints?",
        a: "We plan around them. Crew arrival times, supply runs, and site access windows are coordinated against realistic traffic and against the site's own access rules (loading dock hours, security check-in, etc.). Daily field reports flag any access friction immediately.",
      },
    ],
  },
  {
    slug: "dallas-fort-worth",
    city: "Dallas–Fort Worth",
    region: "Texas",
    country: "US",
    metaTitle: "Data Center Rack & Stack, Structured Cabling & AP Refresh in Dallas–Fort Worth",
    metaDescription:
      "AES delivers data center rack-and-stack, structured cabling, AP refresh, and smart hands across the Dallas–Fort Worth metro — from DFW data center alley to enterprise HQ relocations to high-bay warehouse environments.",
    cardSummary:
      "DFW data center alley, North Dallas corporate stand-up, and high-bay logistics across the metro.",
    heroH1: "Dallas–Fort Worth — DC Alley, Enterprise HQ, and High-Bay Warehouse Coverage",
    heroSub:
      "AES executes rack-and-stack, structured cabling, AP refresh, and smart hands across DFW — from data center alley in Plano and Richardson to corporate HQ relocations in Frisco to massive warehouse and fulfillment real estate across the metro.",
    servicesEmphasized: ["rack-and-stack", "structured-cabling", "ap-refresh"],
    siteTypes: [
      {
        heading: "DFW Data Center Alley",
        body: "Plano, Richardson, Carrollton, and the broader DFW DC corridor — colo and hyperscale rack-and-stack, fiber cabling, BIOS/firmware validation, and burn-in support inside live data halls.",
      },
      {
        heading: "Corporate Relocations to North Dallas",
        body: "Frisco, Plano, and the Legacy corridor see steady corporate HQ relocations from higher-cost markets. AES supports new-build IDF and MDF cabling, AP rollouts, and rack work during enterprise stand-up.",
      },
      {
        heading: "DFW Logistics & High-Bay Warehouses",
        body: "Fort Worth, Coppell, Arlington, Grand Prairie — high-bay distribution and fulfillment facilities with active operations and tight cutover windows. AES handles AP refresh, structured cabling, and freezer / cooler-rated installs.",
      },
      {
        heading: "Telecom & Service Provider Builds",
        body: "Transport labs, central office work, and service-provider equipment deployments — AES brings credentialed crews and OTDR / PM testing per approved scope.",
      },
    ],
    whyHere: [
      {
        heading: "Texas Licensing Requires the Right Setup",
        body: "Texas low-voltage work falls under TDLR licensing, and many DFW jurisdictions add permitting layers on top. AES verifies licensing, bonding, and required certifications per project before mobilization.",
      },
      {
        heading: "DFW Heat Is a Real Scheduling Variable",
        body: "Summer heat in DFW changes how warehouse and rooftop work gets scheduled. AES plans crew shifts around access windows and live-operations constraints, with night-window options when day-shift work isn't viable.",
      },
      {
        heading: "Metro Footprint Means Coordination, Not Just Techs",
        body: "DFW is geographically huge — a multi-site program in DFW alone can require crews staged across Plano, Fort Worth, and South Dallas. AES runs program-level coordination, not a single-truck dispatch.",
      },
    ],
    nearbyCoverage: ["Dallas", "Fort Worth", "Plano", "Frisco", "Irving", "Arlington", "Garland", "Richardson", "Carrollton", "Coppell"],
    caseStudySlug: "telecom-transport-lab",
    faq: [
      {
        q: "Does AES work in DFW data center alley?",
        a: "Yes — AES executes rack-and-stack, structured cabling, fiber work, and burn-in support across DFW data center alley including Plano, Richardson, and the broader corridor. Credentialed crews, owner-approved labeling, and full closeout documentation are standard.",
      },
      {
        q: "Can AES support a multi-site warehouse AP refresh in DFW?",
        a: "Yes. DFW is one of the largest fulfillment markets in North America, and AES supports multi-site warehouse AP refresh with crews briefed on high-bay RF, scissor-lift work, and live-operations scheduling.",
      },
      {
        q: "How does AES handle Texas permitting and licensing?",
        a: "AES verifies TDLR licensing, local jurisdiction permits, and any required bonding per project before mobilization. We coordinate with licensed electrical resources where electrical scope is in play.",
      },
    ],
  },
  {
    slug: "toronto-gta",
    city: "Toronto & Greater Toronto Area",
    region: "Ontario",
    country: "CA",
    metaTitle: "Warehouse AP Refresh, Structured Cabling & Field Services in Toronto / GTA",
    metaDescription:
      "AES delivers large-scale warehouse AP refresh, structured cabling, rack-and-stack, and smart hands across the Greater Toronto Area — Scarborough, Mississauga, Brampton, Bolton, and Oakville fulfillment environments.",
    cardSummary:
      "Multi-site warehouse AP refresh across Scarborough, Bolton, Mississauga, Brampton, and Oakville.",
    heroH1: "Toronto & GTA — Warehouse AP Refresh and Field Execution Across Ontario",
    heroSub:
      "AES has executed large-scale wireless AP refresh programs across the GTA — Scarborough and Bolton fulfillment centres, Mississauga and Brampton logistics, and Oakville enterprise sites — with crews briefed on Canadian electrical standards and cold-storage RF realities.",
    servicesEmphasized: ["ap-refresh", "structured-cabling", "smart-hands"],
    siteTypes: [
      {
        heading: "GTA Fulfillment & Logistics",
        body: "Brampton, Mississauga, Bolton, and Scarborough host some of North America's busiest fulfillment centres. AES has executed multi-site AP refresh programs across active 24/7 picking floors — including the documented 1,586+ AP, 46-IDF, two-site Q1 2026 Ontario program.",
      },
      {
        heading: "Cold Storage & Cooler Environments",
        body: "Cold-chain logistics across the GTA require freezer / cooler-rated cable, mounting hardware, and AP enclosures. AES sources and installs to spec — no shortcuts that fail when the temperature drops.",
      },
      {
        heading: "Enterprise Campus & Corporate Sites",
        body: "Oakville, Mississauga, Markham, and downtown Toronto enterprise sites — IDF cleanups, AP refresh, structured cabling adds/moves/changes, and rack work.",
      },
      {
        heading: "Data Centre & Colocation Work",
        body: "GTA-area colo and enterprise data centre rack-and-stack, fiber cabling, and burn-in support — Vaughan, Markham, downtown Toronto, and the broader corridor.",
      },
    ],
    whyHere: [
      {
        heading: "Canadian Electrical Standards Are Their Own Discipline",
        body: "Ontario projects follow the Canadian Electrical Code (CEC) and ESA inspection requirements — distinct from U.S. NEC practice. AES coordinates licensing and ESA notifications per project before mobilization.",
      },
      {
        heading: "Border Logistics for Equipment Take Planning",
        body: "Equipment crossing the U.S.-Canada border needs proper documentation, broker coordination, and lead-time planning. AES plans cross-border logistics into the project schedule so material doesn't sit at the border while your crew waits.",
      },
      {
        heading: "GTA Multi-Site Programs Need Real Coordination",
        body: "Scarborough to Bolton is over an hour in good traffic. A multi-site GTA program needs staged crews, regional supply staging, and daily field reporting — not a single truck-roll model. AES has run exactly this scope and brought the documentation forward to the next phase.",
      },
    ],
    nearbyCoverage: ["Toronto", "Mississauga", "Brampton", "Scarborough", "Bolton", "Oakville", "Markham", "Vaughan", "Hamilton", "Burlington"],
    caseStudySlug: "fulfillment-ap-refresh-ontario",
    faq: [
      {
        q: "Does AES have experience with multi-site warehouse AP refresh in the GTA?",
        a: "Yes — AES executed a documented two-site, 46-IDF, 1,586+ AP refresh program across Scarborough (YYZ9) and Bolton (YYZ7) in Q1 2026. Pre-labelling, real-time documentation, and a flexible staffing model were carried forward to subsequent phases of the broader North American program.",
      },
      {
        q: "Can AES work in cold-storage and freezer environments?",
        a: "Yes. Freezer and cooler-rated cable, mounting hardware, AP enclosures, and crew PPE are sourced and installed to spec. AES has direct experience with cold-chain GTA logistics sites.",
      },
      {
        q: "How does AES handle Canadian licensing and ESA requirements?",
        a: "AES verifies Ontario licensing requirements and ESA notification obligations per project before mobilization. We coordinate with licensed Canadian electrical resources where electrical scope is in play.",
      },
    ],
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    region: "Nevada",
    country: "US",
    metaTitle: "Structured Cabling, Rack & Stack & AP Refresh in Las Vegas, NV",
    metaDescription:
      "AES delivers structured cabling, rack-and-stack, AP refresh, and smart hands across the Las Vegas Valley — hospitality MDF/IDF work, data center deployments, convention-driven infrastructure, and 24/7 operations support.",
    cardSummary:
      "Hospitality MDF/IDF, Switch and adjacent DC work, and convention-driven infrastructure in the Vegas Valley.",
    heroH1: "Las Vegas — Hospitality, Data Center, and Convention-Driven Infrastructure",
    heroSub:
      "AES executes structured cabling, rack-and-stack, AP refresh, and smart hands across the Las Vegas Valley — hospitality and gaming MDF/IDF work, Switch and adjacent data center deployments, and event-driven convention infrastructure.",
    servicesEmphasized: ["rack-and-stack", "structured-cabling", "ap-refresh", "smart-hands"],
    siteTypes: [
      {
        heading: "Hospitality & Gaming MDF/IDF",
        body: "Strip and off-Strip hospitality properties have some of the most complex MDF/IDF environments in the country — gaming-floor RF constraints, hospitality network segments, strict access controls, and 24/7 live operations. AES brings crews briefed on the environment.",
      },
      {
        heading: "Las Vegas Data Center & Colocation",
        body: "Switch and the broader Vegas DC submarket — rack-and-stack, structured fiber, and burn-in support inside live data halls with strict access protocols.",
      },
      {
        heading: "Convention & Event-Driven Infrastructure",
        body: "LVCC, Mandalay Bay, and Strip convention facilities run event-driven infrastructure cycles. AES supports temporary network and AV cabling adds, AP refresh for high-density events, and post-event teardown.",
      },
      {
        heading: "Logistics & Distribution",
        body: "North Las Vegas and Henderson logistics — warehouse AP refresh, structured cabling, and freezer / cooler-rated installs serving the Western U.S. distribution corridor.",
      },
    ],
    whyHere: [
      {
        heading: "Hospitality Access Discipline Is Real",
        body: "Casino-floor and back-of-house work has access rules, NDAs, and surveillance considerations that most contractors aren't briefed on. AES treats hospitality access protocols as part of the scope, not an afterthought.",
      },
      {
        heading: "24/7 Operations Mean Real Night Work",
        body: "Vegas doesn't shut down. AES schedules cabling pulls, AP cutovers, and rack work into night windows that match the property's actual operational rhythm — not a generic 9-5 plan.",
      },
      {
        heading: "Event Cycles Drive Lead Times",
        body: "Convention-floor work has to be in and out around event load-in. AES plans schedule to event calendars and treats date slip as the costliest possible outcome.",
      },
    ],
    nearbyCoverage: ["Las Vegas", "Henderson", "North Las Vegas", "Paradise", "Spring Valley", "Summerlin", "Boulder City"],
    faq: [
      {
        q: "Does AES work inside Las Vegas hospitality and gaming properties?",
        a: "Yes — AES supports MDF/IDF cabling, AP refresh, and rack work in hospitality back-of-house environments. Gaming-floor and surveillance-related work requires property-specific NDAs and access protocols, which AES coordinates per engagement.",
      },
      {
        q: "Can AES respond to a smart-hands call on the Strip overnight?",
        a: "Project-dependent. AES has experience scheduling crews into Vegas night-window cutovers and can coordinate rapid response for partners with pre-positioned response agreements. Response time depends on scope and current crew loading.",
      },
      {
        q: "Does AES work in Las Vegas data centers?",
        a: "Yes — AES executes rack-and-stack, structured cabling, fiber work, and burn-in support across Las Vegas-area data centers and colocation facilities including Switch and adjacent submarkets.",
      },
    ],
  },
];
