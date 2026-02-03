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
        <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Drive<span className="text-amber-400">Aura</span>
        </span>
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
            Passenger Checklist
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
            <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              Now supporting Ontario G1, G2, G & M1, M2
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Master the road <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                earn your Aura
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              The only driving prep platform that adapts to your skills.
              Diagnostic quizzes, real-time hazard simulations, and EV safety
              modules—all gamified to keep you motivated.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="w-full rounded-full bg-amber-500 px-8 py-4 text-center text-base font-semibold text-slate-950 transition-all hover:bg-amber-400 hover:scale-105 sm:w-auto"
              >
                Start for free
              </Link>
              <Link
                href="#demo"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-8 py-4 text-center text-base font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
              >
                Take diagnostic quiz
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
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
                  <div className="text-3xl font-bold text-white">
                    {stat.value}
                  </div>
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
                DriveAura replaces boring handbooks with an interactive, personalized journey.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Diagnostic Quiz",
                    desc: "We analyze your current knowledge to identify gaps. No more wasting time on what you already know.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    ),
                  },
                  {
                    step: "02",
                    title: "Custom Modules",
                    desc: "Get a tailored curriculum covering everything from road signs to EV specific safety features.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    ),
                  },
                  {
                    step: "03",
                    title: "Earn Aura Points",
                    desc: "Complete challenges, maintain streaks, and climb the global leaderboard as you master skills.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    ),
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex flex-col">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                      <svg
                        className="h-6 w-6 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        {feature.icon}
                      </svg>
                    </div>
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <span className="font-mono text-amber-500">
                        {feature.step}.
                      </span>
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
                Prepared for modern roads
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                We don't just teach you to pass a test. We teach you to survive
                and thrive in today's complex driving environment.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Feature 1 */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:px-8 lg:pt-80 lg:pb-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
                  <div className="absolute inset-0 opacity-30">
                     {/* Abstract visual for leaderboard */}
                    <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/40 via-slate-900 to-slate-900" />
                  </div>
                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold text-white">
                      Gamified Learning
                    </h3>
                    <p className="mt-2 text-slate-400">
                      Driving theory can be dry. We make it competitive. Earn
                      Aura points for consistency and accuracy. Challenge
                      friends and see who's really the better driver.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:px-8 lg:pt-80 lg:pb-8">
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
                   <div className="absolute inset-0 opacity-30">
                     {/* Abstract visual for EV */}
                    <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/40 via-slate-900 to-slate-900" />
                  </div>
                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold text-white">
                      EV & Autonomous Tech
                    </h3>
                    <p className="mt-2 text-slate-400">
                      The roads are changing. Learn about regenerative braking,
                      semi-autonomous features, and electric vehicle safety
                      protocols that old handbooks miss.
                    </p>
                  </div>
                </div>
                
                 {/* Feature 3 */}
                 <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:px-8 lg:pt-80 lg:pb-8 lg:col-span-2">
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
                   <div className="absolute inset-0 opacity-20">
                      {/* Abstract visual for Hazard */}
                      <div className="h-full w-full bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-red-500/40 via-slate-900 to-slate-900" />
                  </div>
                  <div className="relative z-20 max-w-2xl">
                    <h3 className="text-2xl font-bold text-white">
                      Interactive Hazard Perception
                    </h3>
                    <p className="mt-2 text-slate-400">
                      Don't just memorize rules—practice reactions. Our video-based simulations test your ability to spot pedestrians, merging vehicles, and sudden stops in real-time. Includes stress management scenarios to prepare you for road rage and high-pressure situations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative overflow-hidden py-24 px-6 text-center sm:px-10">
            <div className="absolute inset-0 bg-amber-500/5"></div>
            <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Ready to build your confidence?
                </h2>
                <p className="mx-auto mt-6 text-lg text-slate-400">
                    Join thousands of Canadian drivers who are acing their G1, G2, and G tests with DriveAura.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Link
                        href="#"
                        className="rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-12 px-6 sm:px-10">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="text-sm text-slate-500">
                 © 2026 DriveAura Group 6. All rights reserved. York University EECS 2311.
             </div>
             <div className="flex gap-6">
                 <Link href="#" className="text-sm text-slate-500 hover:text-white">Privacy Policy</Link>
                 <Link href="#" className="text-sm text-slate-500 hover:text-white">Terms of Service</Link>
                 <Link href="#" className="text-sm text-slate-500 hover:text-white">Contact</Link>
             </div>
          </div>
      </footer>
    </div>
  );
}
