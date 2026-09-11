import React from "react";
import Link from "next/link";
import Portrait from "./portrait";
import { profile } from "./profile";

/**
 * The faculty mentor block on the home page.
 *
 * The two sections above it are centred; this one is deliberately left-aligned
 * and asymmetric, so the page does not read as three identical centred slabs.
 * It carries only enough to make someone want to click — the full record lives
 * at /mentors/vaibhav-nijhawan.
 */
export default function MentorSpotlight({ id }: { id?: string }) {
  const facts: [string, string][] = [
    [profile.counts.teaching, "teaching"],
    [String(profile.counts.publications), "papers published"],
    [String(profile.counts.programmes), "development programmes"],
  ];

  return (
    <section
      id={id}
      aria-labelledby="mentor-heading"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#00111f_0%,#010516_100%)] px-4 py-[70px] sm:px-8 sm:py-[90px] md:px-14 md:py-[110px]"
    >
      <div className="mx-auto max-w-[1000px]">
        <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#00bfff] sm:text-xs md:text-[13px]">
          The people behind the lab
        </p>
        <h2
          id="mentor-heading"
          className="mt-3 text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[45px] md:text-[55px]"
        >
          Our faculty{" "}
          <span className="bg-[linear-gradient(90deg,#00bfff,#6c63ff,#00bfff)] bg-clip-text text-transparent">
            mentor
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-start sm:gap-10 md:gap-14">
          <div className="w-[180px] shrink-0 sm:w-[230px] md:w-[260px]">
            <Portrait
              sizes="(max-width: 640px) 180px, (max-width: 768px) 230px, 260px"
              className="aspect-[4/5] w-full rounded-2xl border border-white/10 object-cover object-center"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-white md:text-[32px]">
              {profile.name}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/60">
              {profile.role}, {profile.department}
              <br />
              {profile.institute}
            </p>
            <p className="mt-3 text-[15px] font-medium text-[#00bfff]">
              {profile.labRoleShort}
            </p>

            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-white/70">
              {profile.short}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {facts.map(([value, label]) => (
                // flex-col-reverse renders the value above its label while
                // keeping <dt> before <dd>, which is what a <dl> requires.
                <div key={label} className="flex flex-col-reverse">
                  <dt className="mt-0.5 text-[12px] text-white/45">{label}</dt>
                  <dd className="text-[19px] font-semibold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/mentors/vaibhav-nijhawan"
              className="mt-9 inline-flex items-center rounded-full border border-[#00bfff]/40 bg-[#00bfff]/10 px-6 py-3 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-[#00bfff]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bfff]"
            >
              Read his full profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
