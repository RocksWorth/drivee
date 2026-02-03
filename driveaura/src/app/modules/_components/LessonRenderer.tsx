import Image from "next/image";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import type { LessonBlock } from "../../../../constants/modules";
import { LessonQuiz } from "./LessonQuiz";

export function LessonRenderer({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.type}-${idx}`}
              className="text-xl font-semibold tracking-tight text-slate-950"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={`${block.type}-${idx}`}
              className="text-base leading-7 text-slate-700"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`${block.type}-${idx}`}
              className="list-disc space-y-2 pl-5 text-base text-slate-700"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "quiz") {
          return <LessonQuiz key={`${block.type}-${idx}`} block={block} />;
        }

        if (block.type === "image") {
          return (
            <figure key={`${block.type}-${idx}`} className="space-y-2">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-contain p-10"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              </div>
              {block.caption && (
                <figcaption className="text-sm text-slate-500">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "video") {
          return (
            <figure key={`${block.type}-${idx}`} className="space-y-2">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={block.embedUrl}
                    title={block.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              {block.caption && (
                <figcaption className="text-sm text-slate-500">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "callout") {
          const toneStyles =
            block.tone === "warning"
              ? {
                  wrap: "border-amber-200 bg-amber-50",
                  title: "text-amber-900",
                  text: "text-amber-900/90",
                  Icon: AlertTriangle,
                  icon: "text-amber-700",
                }
              : block.tone === "success"
                ? {
                    wrap: "border-emerald-200 bg-emerald-50",
                    title: "text-emerald-900",
                    text: "text-emerald-900/90",
                    Icon: CheckCircle2,
                    icon: "text-emerald-700",
                  }
                : {
                    wrap: "border-indigo-200 bg-indigo-50",
                    title: "text-indigo-950",
                    text: "text-indigo-950/90",
                    Icon: Info,
                    icon: "text-indigo-700",
                  };

          const Icon = toneStyles.Icon;

          return (
            <div
              key={`${block.type}-${idx}`}
              className={`rounded-2xl border p-4 ${toneStyles.wrap}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-5 w-5 ${toneStyles.icon}`} />
                <div className="min-w-0">
                  {block.title && (
                    <p className={`text-sm font-semibold ${toneStyles.title}`}>
                      {block.title}
                    </p>
                  )}
                  <p className={`text-sm leading-6 ${toneStyles.text}`}>
                    {block.text}
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

