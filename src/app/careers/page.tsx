import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import CtaBand from "@/components/cta-band";
import { SITE } from "@/lib/utils";
import { getActiveJobs, type Job } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Careers — Join the AES Field Team",
  description: "Join Apex Enterprise Solutions as a field technician or project coordinator. We deploy structured cabling, rack-and-stack, and wireless infrastructure across North America.",
};

// Revalidate every hour so new postings appear quickly without a full redeploy
export const revalidate = 3600;

const WHY = [
  {
    heading: "Field-First Culture",
    body: "We built AES around the people who actually do the work. Technicians, leads, and PMs are respected partners — not afterthoughts.",
  },
  {
    heading: "Diverse Project Mix",
    body: "One week you're in a hyperscale data center, the next you're rolling out Wi-Fi in a million-square-foot warehouse. Never the same job twice.",
  },
  {
    heading: "Clear Expectations",
    body: "Scope is defined before boots hit the floor. You know what's needed, what success looks like, and who to call if something changes.",
  },
];

function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#006FB9]/40 hover:shadow-md transition-all duration-200">
      <div className="flex flex-wrap gap-2 mb-3">
        {job.department && (
          <span className="bg-[#F4F7FA] text-[#06284C] text-xs font-semibold px-3 py-1 rounded-full">
            {job.department}
          </span>
        )}
        <span className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold px-3 py-1 rounded-full">
          {job.type}
        </span>
      </div>

      <h3 className="text-[#06284C] font-bold text-lg mb-2 leading-snug">{job.title}</h3>
      <p className="text-[#1F2933] text-sm leading-relaxed mb-4">{job.summary}</p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-[#4E6575] mb-5">
        <span className="flex items-center gap-1.5">
          <MapPin size={12} className="text-[#006FB9]" /> {job.location}
        </span>
        {job.compensation && (
          <span className="flex items-center gap-1.5">
            <Briefcase size={12} className="text-[#006FB9]" /> {job.compensation}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-[#006FB9]" />
          Posted {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      {/* Requirements preview */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-[#06284C] uppercase tracking-wider mb-2">Requirements</p>
          <ul className="space-y-1">
            {job.requirements.slice(0, 4).map((req) => (
              <li key={req} className="flex items-start gap-2 text-xs text-[#1F2933]">
                <span className="text-[#FF6B00] font-bold flex-shrink-0 mt-0.5">›</span>
                {req}
              </li>
            ))}
            {job.requirements.length > 4 && (
              <li className="text-xs text-[#4E6575] pl-4">+{job.requirements.length - 4} more</li>
            )}
          </ul>
        </div>
      )}

      <a
        href={`mailto:${SITE.email}?subject=Application: ${encodeURIComponent(job.title)}&body=Hi AES team,%0A%0AI'm applying for the ${encodeURIComponent(job.title)} role in ${encodeURIComponent(job.location)}.%0A%0A`}
        className="btn-primary text-sm w-full justify-center"
      >
        Apply for This Role <ChevronRight size={14} />
      </a>
    </div>
  );
}

export default async function CareersPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        h1="Build Infrastructure with a Team That Knows the Field"
        sub="We're always looking for experienced technicians, field leads, and project managers across the U.S. and Canada."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]}
      />

      {/* Why AES */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#06284C] text-3xl font-bold mb-12">Why Work With AES?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY.map((item) => (
              <div key={item.heading} className="border-t-4 border-[#006FB9] pt-6">
                <h3 className="text-[#06284C] font-bold text-xl mb-3">{item.heading}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions — live from Sanity */}
      <section className="bg-[#F4F7FA] section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-2">Open Positions</p>
              <h2 className="text-[#06284C] text-3xl font-bold">
                {jobs.length > 0
                  ? `${jobs.length} Role${jobs.length !== 1 ? "s" : ""} Available`
                  : "Open Positions"}
              </h2>
            </div>
          </div>

          {jobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="border border-dashed border-[#006FB9]/30 rounded-xl p-12 max-w-2xl mx-auto text-center">
              <p className="text-[#06284C] font-semibold text-lg mb-2">No open listings at the moment</p>
              <p className="text-[#4E6575] text-sm mb-6">
                We&apos;re always building the bench. Send your resume and we&apos;ll reach out when a matching role opens up.
              </p>
              <a
                href={`mailto:${SITE.email}?subject=Field Technician — General Application`}
                className="btn-primary justify-center"
              >
                Send Your Resume →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Roles we hire for */}
      <section className="bg-white section-pad">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-[#06284C] text-3xl font-bold mb-6">Roles We Hire For</h2>
            <ul className="space-y-3">
              {[
                "Structured Cabling Technicians (Cat6 / Fiber)",
                "Data Center Rack & Stack Technicians",
                "Wireless AP Installation Technicians",
                "Field Leads & Site Supervisors",
                "Project Managers (Infrastructure)",
                "Low-Voltage Subcontractors & Field Partners",
              ].map((role) => (
                <li key={role} className="flex items-start gap-3 text-gray-700">
                  <span className="text-[#FF6B00] font-bold mt-0.5 flex-shrink-0">›</span>
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#06284C] rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-2">Don&apos;t see your role listed?</h3>
            <p className="text-[#4E6575] mb-6 leading-relaxed">
              We work with a flexible network of trusted technicians. If you&apos;re certified,
              experienced, and dependable — we want to hear from you.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Field Technician Application`}
              className="btn-primary w-full justify-center"
            >
              Send Your Resume →
            </a>
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to build infrastructure that matters?" />
    </>
  );
}
