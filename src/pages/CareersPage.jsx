import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CareersPage = () => {
  const jobs = useMemo(
    () => [
      {
        id: "tiktok-live-host",
        title: "TikTok Live Host",
        location: "Yogyakarta",
        type: "Freelance",
        mode: "WFO",
        summary:
          "Host live TikTok untuk ClickClick. Kamu akan jadi wajah brand saat live dan membangun interaksi dengan audiens secara natural.",
        responsibilities: [
          "Host TikTok Live sesuai jadwal",
          "Menjelaskan produk dengan gaya santai dan informatif",
          "Berinteraksi aktif dengan audiens",
          "Meningkatkan engagement dan conversion saat live",
          "Mengikuti guideline brand ClickClick",
        ],
        requirements: [
          "Percaya diri di depan kamera",
          "Pengalaman live TikTok menjadi nilai plus",
          "Komunikatif dan responsif",
          "Bisa menjelaskan produk dengan jelas",
          "Profesional dan tepat waktu",
        ],
        perks: [
          "Freelance & flexible schedule",
          "Fee per session / campaign",
          "Kesempatan jadi host tetap",
          "Brand exposure",
        ],
      },
      {
        id: "kol-specialist",
        title: "KOL Specialist",
        location: "Yogyakarta",
        type: "Freelance",
        mode: "WFO",
        summary:
          "Kelola dan eksekusi campaign KOL untuk ClickClick, dari riset hingga reporting.",
        responsibilities: [
          "Research dan shortlist KOL",
          "Hubungi dan negosiasi dengan creators",
          "Mengatur brief dan timeline campaign",
          "Monitoring konten KOL",
          "Menyusun report hasil campaign",
        ],
        requirements: [
          "Pengalaman influencer / KOL marketing",
          "Familiar dengan TikTok & Instagram creators",
          "Komunikatif dan rapi",
          "Terbiasa dengan timeline",
          "Paham basic performance metrics",
        ],
        perks: [
          "Freelance & project-based",
          "Work from anywhere",
          "Kesempatan kerja jangka panjang",
          "Portfolio-ready projects",
        ],
      },
    ],
    []
  );

  const [openId, setOpenId] = useState(jobs[0]?.id ?? null);

  const activeJob = jobs.find((j) => j.id === openId) || jobs[0];

  const applySubject = encodeURIComponent(
    `Application — ${activeJob.title} (ClickClick)`
  );

  const applyBody = encodeURIComponent(
    `Hi ClickClick team,\n\nI would like to apply for the ${activeJob.title} position.\n\nName:\nPortfolio/LinkedIn:\nLocation:\nAvailability:\n\nShort intro:\n\nThank you.\n`
  );

  return (
    <main className="bg-white text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
            Careers
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Join ClickClick.
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600 leading-relaxed">
            We build creator tools with clean design and real-world usability.
            If you love minimal aesthetics and fast execution, you will fit in.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:border-black transition"
            >
              Back to home
            </Link>

            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Open catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Jobs list */}
            <div className="rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Open positions</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Currently hiring for 2 roles.
                  </p>
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                  Updated recently
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {jobs.map((job) => {
                  const isActive = job.id === openId;
                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => setOpenId(job.id)}
                      className={`w-full text-left rounded-xl border px-5 py-4 transition ${
                        isActive
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold">{job.title}</p>
                          <p className="mt-1 text-sm text-gray-600">
                            {job.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-gray-900">
                            {job.type}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">{job.mode}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                        {job.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-sm font-semibold">How to apply</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Send your CV or portfolio link. A short intro is enough. If you
                  have sample content, include it.
                </p>
                <a
                  href={`mailto:freelance.clickclick@gmail.com?subject=${applySubject}&body=${applyBody}`}
                  className="mt-4 inline-flex px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Apply via email
                </a>
              </div>
            </div>

            {/* Right: Job details */}
            <div className="rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{activeJob.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {activeJob.location} · {activeJob.type} · {activeJob.mode}
                  </p>
                </div>

                <a
                  href={`mailto:freelance.clickclick@gmail.com?subject=${applySubject}&body=${applyBody}`}
                  className="inline-flex px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Apply
                </a>
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {activeJob.summary}
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Responsibilities
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {activeJob.responsibilities.map((x, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                        <span className="leading-relaxed">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Requirements
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {activeJob.requirements.map((x, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                        <span className="leading-relaxed">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Perks
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {activeJob.perks.map((x, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                        <span className="leading-relaxed">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                    Application checklist
                  </p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    CV or portfolio link, location, availability, and one short paragraph about why you
                    want to join ClickClick.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-black text-white p-8">
                <h3 className="text-xl font-semibold">Not seeing your role?</h3>
                <p className="mt-2 text-white/80 text-sm leading-relaxed">
                  Send a spontaneous application with your portfolio. If a match opens, we will reach out.
                </p>
                <a
                  href={`mailto:freelance.clickclick@gmail.com?subject=${encodeURIComponent(
                    "Spontaneous application — ClickClick"
                  )}&body=${encodeURIComponent(
                    "Hi ClickClick team,\n\nI would like to be considered for future roles.\n\nName:\nPortfolio/LinkedIn:\nRole interest:\nLocation:\n\nShort intro:\n\nThank you.\n"
                  )}`}
                  className="mt-4 inline-flex px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Send application
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
