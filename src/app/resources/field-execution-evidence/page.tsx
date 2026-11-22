import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Project Evidence & QA Process — Field Execution for Integrators",
  description:
    "Review AES-published data center, fiber and warehouse wireless field-execution examples, plus the project QC and closeout evidence buyers should request.",
  alternates: { canonical: "https://www.apexsolutions.io/resources/field-execution-evidence" },
};

const examples = [
  {
    title: "GPU-dense data center | Memphis, TN",
    work: "Structured fiber routing, cable management and rack-and-stack across multiple deployment phases.",
    detail: "AES's published project account describes mobilization of a 6–7 person fiber and hardware crew.",
    href: "/case-studies/ai-cluster-pod-build",
    cta: "Read the data center example",
  },
  {
    title: "Telecom transport lab | United States",
    work: "Site audit, installation documentation, telecom platforms and equipment integration across six racks.",
    detail: "AES's published account describes a two-week build and as-built handover.",
    href: "/case-studies/telecom-transport-lab",
    cta: "Read the telecom example",
  },
  {
    title: "Warehouse AP refresh | Ontario, Canada",
    work: "Two fulfillment facilities, 46 IDFs, pre-staging, lift-safety coordination and per-device tracking.",
    detail: "The AES-published case study reports 1,586+ AP replacements, including a 24-hour window at one site.",
    href: "/case-studies/fulfillment-ap-refresh-ontario",
    cta: "Read the Ontario example",
  },
  {
    title: "Warehouse AP refresh | United States",
    work: "Physical AP replacement support, mounting and labeling in a live logistics environment.",
    detail: "The AES-published project account reports an 850-AP deployment through an implementation partner.",
    href: "/case-studies/amazon-ap-refresh",
    cta: "Read the U.S. example",
  },
] as const;

const qualityStages = [
  {
    title: "01 | Plan and qualify",
    body: "Confirm the approved scope, drawings, access conditions, approved materials, safety requirements, test limits and who will sign off.",
  },
  {
    title: "02 | Inspect during installation",
    body: "Check routing, support, bend radius, connectors, labeling, racks and equipment against the client's specifications, with first-article checks when justified.",
  },
  {
    title: "03 | Test to the contract",
    body: "Record required copper certification, fiber OLTS/OTDR, continuity/polarity or device verification results using the specified methods and acceptance criteria.",
  },
  {
    title: "04 | Close the evidence loop",
    body: "Resolve punch items, retain required test files and photos, reconcile labels and asset records, and submit the project-specific turnover package.",
  },
] as const;

const requestItems = [
  "An approved statement of work and a clear responsibility matrix",
  "An inspection/test plan tied to project-specific acceptance criteria",
  "Sample redacted instrument-generated results, when available and releasable",
  "Cable/port or AP-by-AP tracking records matched to asset IDs",
  "As-builts, punch-list disposition and customer acceptance records, where authorized",
  "Site-specific supervision, safety and partner qualification documentation",
] as const;

export default function FieldExecutionEvidencePage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer Evidence"
        h1="Project Examples &amp; Field Quality Controls"
        sub="What a prime contractor or systems integrator should be able to verify before awarding structured cabling, data center or multi-site wireless work."
        cta={{ label: "Request Evidence for Your Scope →", href: "/contact" }}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Project Evidence", href: "/resources/field-execution-evidence" },
        ]}
      />

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-[#06284C] text-3xl font-bold mb-4">Published execution examples</h2>
            <p className="text-[#1F2933] leading-relaxed mb-3">
              The examples below link to <strong>AES-published project accounts</strong>. They illustrate
              scope, coordination and project delivery; they are not independent audit findings,
              customer endorsements or public copies of acceptance records.
            </p>
            <p className="text-[#4E6575] text-sm leading-relaxed mb-8">
              Client names, drawings, test files and site photos may be restricted by confidentiality
              obligations. We do not publish them without the required permission.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((item) => (
              <article key={item.href} className="rounded-xl border border-[#006FB9]/15 bg-[#F4F7FA] p-7">
                <p className="text-[#006FB9] text-xs font-semibold uppercase tracking-widest mb-2">
                  AES case study
                </p>
                <h3 className="text-[#06284C] text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed mb-3">{item.work}</p>
                <p className="text-[#4E6575] text-sm leading-relaxed mb-5">{item.detail}</p>
                <Link href={item.href} className="text-[#006FB9] font-semibold text-sm hover:text-[#FF6B00]">
                  {item.cta} &rarr;
                </Link>
              </article>
            ))}
          </div>
          <p className="text-[#4E6575] text-sm mt-6">
            Historical Canadian project examples do not imply AES currently self-performs in Canada.
            Current Canadian delivery is coordinated through partners.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-10">
            <h2 className="text-[#06284C] text-3xl font-bold mb-4">
              A documented quality process, not an unsupported certification claim
            </h2>
            <p className="text-[#1F2933] leading-relaxed">
              AES maintains a controlled Quality Control Program (AES-QMS-QCP-001, Rev. 5.0,
              October 2026). Its framework covers progressive inspections, instrument-based testing,
              nonconformance control, subcontractor oversight and closeout. The executed contract,
              approved drawings and customer specifications determine the actual requirements for each project.
            </p>
            <p className="text-[#4E6575] text-sm mt-3">
              This internal quality program is not a third-party ISO, BICSI or other certification.
              Project-specific implementation and acceptance must be evidenced separately.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {qualityStages.map((step) => (
              <div key={step.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="text-[#06284C] font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#1F2933] text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2 className="text-[#06284C] text-3xl font-bold mb-5">What to request in a bid or qualification review</h2>
            <ul className="space-y-4">
              {requestItems.map((item) => (
                <li key={item} className="flex gap-3 text-[#1F2933] leading-relaxed">
                  <span aria-hidden="true" className="text-[#FF6B00] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[#4E6575] text-sm leading-relaxed mt-6">
              These are qualification and closeout evidence categories—not a claim that every listed
              artifact has been produced or can be disclosed for every past project.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-[#06284C] rounded-xl p-7">
              <h3 className="text-white text-xl font-bold mb-3">Need a project-specific evidence review?</h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-5">
                Send your site list, scope and acceptance requirements. AES can confirm delivery fit,
                relevant qualifications and what supporting examples can be shared under the right permissions.
              </p>
              <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                Send Your Scope &rarr;
              </Link>
              <p className="text-gray-300 text-xs leading-relaxed mt-5">
                Where regulated construction or electrical work applies, the contracting and licensing
                responsibilities must be established for that jurisdiction before work begins.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand heading="Project evidence should match the scope, not a marketing claim." />
    </>
  );
}
