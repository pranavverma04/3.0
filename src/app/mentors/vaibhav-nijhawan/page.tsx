import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Portrait from "@/components/mentor/portrait";
import {
  profile,
  publications,
  programmes,
  type Publication,
} from "@/components/mentor/profile";

export const metadata: Metadata = {
  title: `${profile.name} — A.T.O.M Robotics Lab`,
  description: `${profile.role}, ${profile.department} at ${profile.institute}, and co-founder of the A.T.O.M Robotics Lab.`,
};

/* ------------------------------------------------------------------ *
 * Small local pieces. The page is a document, so everything is left
 * aligned on one measure and the headings carry their own counts.
 * ------------------------------------------------------------------ */

function Section({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count?: string | number;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-white/10 pt-10">
      <div className="mb-8 flex items-baseline gap-3">
        <h2
          id={id}
          className="text-[22px] font-semibold tracking-[-0.01em] text-white md:text-[26px]"
        >
          {title}
        </h2>
        {count !== undefined && (
          <span className="shrink-0 text-[15px] font-medium tabular-nums text-white/30">
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

/** An entry hung off the vertical rule: a span on the left, detail on the right. */
function Entry({
  span,
  title,
  meta,
  detail,
  current,
}: {
  span: string;
  title: string;
  meta: string;
  detail?: string;
  current?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-[9.5rem_1fr]">
      <p className="pt-0.5 text-[13px] tabular-nums text-white/40">
        {span}
        {current && (
          <span className="ml-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-[#00bfff] align-middle" />
        )}
      </p>
      <div>
        <h3 className="text-[16px] font-medium text-white">{title}</h3>
        <p className="mt-1 text-[14px] text-white/55">{meta}</p>
        {detail && <p className="mt-1 text-[13px] text-white/40">{detail}</p>}
      </div>
    </div>
  );
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-white/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-[14px] leading-relaxed text-white/65 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[#00bfff]/60"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PublicationItem({ pub }: { pub: Publication }) {
  const title = pub.href ? (
    <a
      href={pub.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline decoration-white/20 underline-offset-[5px] transition-colors hover:decoration-[#00bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
    >
      {pub.title}
    </a>
  ) : (
    <span className="text-white">{pub.title}</span>
  );

  return (
    <li>
      <h3 className="text-[16px] font-medium leading-snug">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
        {pub.authors}
      </p>
      <p className="mt-0.5 text-[13px] leading-relaxed text-white/55">
        {pub.venue}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export default function MentorProfilePage() {
  const years = [...new Set(publications.map((p) => p.year))];

  const engagement: [string, number][] = [
    ["Workshops", profile.counts.workshops],
    ["Conferences", profile.counts.conferences],
    ["Seminars", profile.counts.seminars],
    ["Webinars and symposia", profile.counts.webinars],
  ];

  return (
    <main className="relative w-full bg-[linear-gradient(180deg,#000810_0%,#010516_60%)]">
      <div className="mx-auto max-w-[860px] px-5 pb-28 pt-24 sm:px-8 sm:pt-28">
        <Link
          href="/home"
          className="inline-block text-[13px] text-white/45 transition-colors hover:text-[#00bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
        >
          Back to home
        </Link>

        {/* ---- hero ---------------------------------------------------- */}
        <header className="mt-10 flex flex-col gap-9 sm:mt-14 sm:flex-row sm:items-start sm:gap-11">
          {/*
            The one piece of ornament on the page: hairline corner marks, the
            registration fiducials off a chip package. His field, drawn quietly.
          */}
          <div className="relative w-[168px] shrink-0 sm:w-[210px]">
            <Portrait
              priority
              sizes="(max-width: 640px) 168px, 210px"
              className="aspect-[4/5] w-full rounded-xl object-cover object-center"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#00bfff]/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#00bfff]/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#00bfff]/70"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#00bfff]/70"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-[44px]">
              {profile.name}
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">
              {profile.role}, {profile.department}
            </p>
            <p className="text-[16px] leading-relaxed text-white/70">
              {profile.institute}
            </p>
            <p className="mt-1 text-[13px] text-white/35">
              {profile.university} &middot; {profile.campus}
            </p>
            <p className="mt-5 text-[15px] font-medium text-[#00bfff]">
              {profile.labRole}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
              <a
                href={`mailto:${profile.email}`}
                className="text-white/70 underline decoration-white/20 underline-offset-[5px] transition-colors hover:text-white hover:decoration-[#00bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
              >
                {profile.email}
              </a>
              <a
                href={profile.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 underline decoration-white/20 underline-offset-[5px] transition-colors hover:text-white hover:decoration-[#00bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
              >
                A.T.O.M Robotics Lab links
              </a>
            </div>
          </div>
        </header>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          <Section id="about" title="About">
            <div className="space-y-5">
              {profile.about.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  className="max-w-[64ch] text-[15px] leading-[1.85] text-white/70"
                >
                  {para}
                </p>
              ))}
            </div>
          </Section>

          <Section id="focus" title="Research focus">
            <Chips items={profile.focus} />
          </Section>

          <Section id="appointments" title="Appointments">
            <div className="space-y-8">
              {profile.appointments.map((a) => (
                <Entry
                  key={`${a.place}-${a.from}`}
                  span={`${a.from} — ${a.to}`}
                  title={a.role}
                  meta={a.place}
                  detail={a.where}
                  current={a.current}
                />
              ))}
            </div>
          </Section>

          <Section id="education" title="Education">
            <div className="space-y-8">
              {profile.education.map((d) => (
                <Entry
                  key={d.award}
                  span={d.year}
                  title={`${d.award} — ${d.field}`}
                  meta={d.school}
                  detail={d.result}
                  current={d.current}
                />
              ))}
            </div>
          </Section>

          <Section
            id="publications"
            title="Publications"
            count={profile.counts.publications}
          >
            <div className="space-y-12">
              {years.map((year) => (
                <div
                  key={year}
                  className="grid grid-cols-1 gap-x-8 md:grid-cols-[5rem_1fr]"
                >
                  <p className="mb-4 text-[15px] font-semibold tabular-nums text-white/40 md:mb-0 md:pt-0.5">
                    {year}
                  </p>
                  <ul className="space-y-8 border-l border-white/10 pl-6 md:pl-8">
                    {publications
                      .filter((p) => p.year === year)
                      .map((pub) => (
                        <PublicationItem key={pub.title} pub={pub} />
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="mait" title="At MAIT">
            <Bullets items={profile.responsibilities} />
          </Section>

          <Section id="recognition" title="Recognition">
            <Bullets items={profile.recognition} />
          </Section>

          <Section id="certifications" title="Certifications">
            <Bullets items={profile.certifications} />
          </Section>

          <Section
            id="programmes"
            title="Professional development"
            count={profile.counts.programmes}
          >
            <dl className="mb-10 flex flex-wrap gap-x-10 gap-y-4">
              {engagement.map(([label, n]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="mt-0.5 text-[12px] text-white/40">{label}</dt>
                  <dd className="text-[17px] font-semibold tabular-nums text-white">
                    {n}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="space-y-3">
              {programmes.map((p) => (
                <li
                  key={p}
                  className="text-[13.5px] leading-relaxed text-white/55"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="skills" title="Technical skills">
            <div className="space-y-7">
              {Object.entries(profile.skills).map(([group, items]) => (
                <div key={group}>
                  <h3 className="mb-3 text-[13px] text-white/40">{group}</h3>
                  <Chips items={items} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="identifiers" title="Academic identifiers">
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {profile.identifiers.map((id) => (
                <div key={id.label}>
                  <dt className="text-[12px] text-white/40">{id.label}</dt>
                  <dd className="mt-1 text-[14px]">
                    {id.href ? (
                      <a
                        href={id.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 underline decoration-white/20 underline-offset-[5px] transition-colors hover:text-white hover:decoration-[#00bfff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
                      >
                        {id.value}
                      </a>
                    ) : (
                      <span className="text-white/80">{id.value}</span>
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-[12px] text-white/40">Memberships</dt>
                <dd className="mt-1 text-[14px] text-white/80">
                  {profile.memberships.join(", ")}
                </dd>
              </div>
            </dl>
          </Section>
        </div>
      </div>
    </main>
  );
}
