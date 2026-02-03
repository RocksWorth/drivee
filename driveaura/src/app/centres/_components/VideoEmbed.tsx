"use client";

import { useState } from "react";
import clsx from "clsx";
import { PlayCircle } from "lucide-react";

export function VideoEmbed({
  title,
  embedUrl,
  className,
}: {
  title: string;
  embedUrl: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-3xl border border-slate-200 bg-black",
        className,
      )}
    >
      <div className="relative aspect-video w-full">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky-500/10 via-emerald-500/10 to-transparent">
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10">
              <PlayCircle className="h-5 w-5 text-emerald-300" />
              Loading video…
            </div>
          </div>
        )}
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

