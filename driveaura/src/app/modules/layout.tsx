import type { ReactNode } from "react";
import Link from "next/link";
import { SidebarNav } from "./_components/SidebarNav";
import { LEVELS } from "../../../constants/modules";

export default function ModulesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950">
      {/* Desktop top header (mobile header lives inside SidebarNav) */}
      <header className="sticky top-0 z-40 hidden border-b border-white/10 bg-slate-950/85 backdrop-blur lg:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold text-white">
            Drive<span className="text-amber-400">Aura</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              href="/modules"
              className="text-sm font-semibold text-white"
              aria-current="page"
            >
              Modules
            </Link>
            <Link
              href="/centres"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Centres
            </Link>
            <Link
              href="/checklist"
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Passenger Checklist
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl">
        <SidebarNav levels={LEVELS} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

