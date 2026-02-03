import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 80px,
              currentColor 80px,
              currentColor 81px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-slate-950/80" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/80 px-6 py-4 backdrop-blur-md sm:px-10">
        <Link href="/" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Drive<span className="text-amber-400">Aura</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/modules"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block"
          >
            Modules
          </Link>
          <Link
            href="/centres"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block"
          >
            Centres
          </Link>
          <Link
            href="/checklist"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block"
          >
            Checklist
          </Link>
          <Link
            href="#features"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:block"
          >
            How it works
          </Link>
          <Link
            href="/modules"
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 pb-20 pt-10 text-center sm:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Now supporting Ontario G1, G2, G & M1, M2
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Master the road <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                earn your Aura
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              Personalized learning modules, practice tools, and calm prep
              experiences—built for real Canadian roads and modern vehicles.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/modules"
                className="w-full rounded-full bg-amber-500 px-8 py-4 text-center text-base font-semibold text-slate-950 transition-all hover:bg-amber-400 sm:w-auto"
              >
                Start learning
              </Link>
              <Link
                href="/centres"
                className="w-full rounded-full border border-slate-700 bg-slate-900/50 px-8 py-4 text-center text-base font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
              >
                Explore test centres
              </Link>
            </div>

            {/* Stats / Social Proof */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/5 pt-8 sm:gap-16">
              {[
                { label: "Active Learners", value: "2,000+" },
                { label: "Questions Practiced", value: "50k+" },
                { label: "Pass Rate", value: "94%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="relative border-y border-white/5 bg-slate-900/50 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your path to a license
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Learn the rules, practice the habits, and show up confident.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Learn with modules",
                    desc: "G1 → G2 → G content with clear explanations, visuals, and quick checks.",
                  },
                  {
                    step: "02",
                    title: "Practice smarter",
                    desc: "Use the Passenger Checklist to run real practice sessions like a mock exam.",
                  },
                  {
                    step: "03",
                    title: "Know the routes",
                    desc: "Explore DriveTest centres with map previews, route overlays, and walkthrough videos.",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <span className="font-mono text-amber-500">{feature.step}.</span>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">{feature.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-amber-500">
                Beyond the basics
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built for modern roads
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Gamified learning, hazard awareness, and future-ready driving knowledge.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-14 shadow-2xl sm:px-12 lg:px-8">
                  <h3 className="text-2xl font-bold text-white">Learning Modules</h3>
                  <p className="mt-2 text-slate-400">
                    Structured lessons for G1, G2, and G—easy to navigate and revisit.
                  </p>
                  <div className="mt-5">
                    <Link href="/modules" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
                      Open modules →
                    </Link>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-14 shadow-2xl sm:px-12 lg:px-8">
                  <h3 className="text-2xl font-bold text-white">Passenger Checklist</h3>
                  <p className="mt-2 text-slate-400">
                    A smartphone-friendly tool to grade practice driving for G2 and G tests.
                  </p>
                  <div className="mt-5">
                    <Link href="/checklist" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
                      Open checklist →
                    </Link>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-14 shadow-2xl sm:px-12 lg:px-8 lg:col-span-2">
                  <h3 className="text-2xl font-bold text-white">Routes & Driving Centres</h3>
                  <p className="mt-2 text-slate-400">
                    Explore DriveTest centres with interactive maps, route overlays, and video walkthroughs.
                  </p>
                  <div className="mt-5">
                    <Link href="/centres" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
                      Browse centres →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-12 px-6 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm text-slate-500">
            © 2026 DriveAura Group 6. All rights reserved. York University EECS 2311.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

