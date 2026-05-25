/**
 * AES field-coverage markets shown on /locations.
 *
 * Each market is a visual card (landmark photo + region/city/summary) on the
 * single coverage page. No dedicated /locations/[slug] pages — too much
 * maintenance overhead for too little SEO return at this stage.
 */
export interface LocationCard {
  slug: string;          // url-safe id, also used as image filename
  city: string;
  region: string;        // state or province (full name)
  country: "US" | "CA";
  cardSummary: string;   // ~100 chars: what AES does in this market
  landmarkImage: string; // path to landmark photo in /public/images/locations/
  landmarkAlt: string;   // accessibility alt text describing the landmark
}

export const LOCATIONS: LocationCard[] = [
  {
    slug: "san-francisco-bay-area",
    city: "San Francisco Bay Area",
    region: "California",
    country: "US",
    cardSummary:
      "Headquartered in Sunnyvale. Santa Clara hyperscale, AI cluster builds, enterprise campuses, and East Bay logistics.",
    landmarkImage: "/images/locations/san-francisco-bay-area.svg",
    landmarkAlt: "Golden Gate Bridge, San Francisco — AES Bay Area coverage market",
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    country: "US",
    cardSummary:
      "Inland Empire fulfillment, Port of LA logistics, West LA enterprise, and broadcast-adjacent infrastructure.",
    landmarkImage: "/images/locations/los-angeles.svg",
    landmarkAlt: "Downtown Los Angeles skyline — AES Southern California coverage market",
  },
  {
    slug: "dallas-fort-worth",
    city: "Dallas–Fort Worth",
    region: "Texas",
    country: "US",
    cardSummary:
      "DFW data center alley, North Dallas corporate stand-up, and high-bay logistics across the metro.",
    landmarkImage: "/images/locations/dallas-fort-worth.svg",
    landmarkAlt: "Dallas downtown skyline with Reunion Tower — AES DFW coverage market",
  },
  {
    slug: "las-vegas",
    city: "Las Vegas",
    region: "Nevada",
    country: "US",
    cardSummary:
      "Hospitality MDF/IDF, Switch and adjacent DC work, and convention-driven infrastructure in the Vegas Valley.",
    landmarkImage: "/images/locations/las-vegas.svg",
    landmarkAlt: "Las Vegas Strip skyline — AES Nevada coverage market",
  },
  {
    slug: "memphis",
    city: "Memphis",
    region: "Tennessee",
    country: "US",
    cardSummary:
      "AI / hyperscale data center deployment, structured fiber and rack & stack in a non-traditional DC market.",
    landmarkImage: "/images/locations/memphis.svg",
    landmarkAlt: "Memphis Tennessee skyline along the Mississippi River — AES Memphis coverage market",
  },
  {
    slug: "toronto-gta",
    city: "Toronto & Greater Toronto Area",
    region: "Ontario",
    country: "CA",
    cardSummary:
      "Multi-site warehouse AP refresh across Scarborough, Bolton, Mississauga, Brampton, and Oakville.",
    landmarkImage: "/images/locations/toronto-gta.svg",
    landmarkAlt: "CN Tower and Toronto skyline — AES Greater Toronto Area coverage market",
  },
  {
    slug: "calgary",
    city: "Calgary",
    region: "Alberta",
    country: "CA",
    cardSummary:
      "Data centre and enterprise field execution across the Calgary and Southern Alberta corridor.",
    landmarkImage: "/images/locations/calgary.svg",
    landmarkAlt: "Calgary downtown skyline with the Calgary Tower — AES Alberta coverage market",
  },
  {
    slug: "edmonton",
    city: "Edmonton",
    region: "Alberta",
    country: "CA",
    cardSummary:
      "Field deployment support for enterprise and logistics infrastructure across Edmonton and Northern Alberta.",
    landmarkImage: "/images/locations/edmonton.svg",
    landmarkAlt: "Edmonton skyline with the High Level Bridge — AES Northern Alberta coverage market",
  },
];
