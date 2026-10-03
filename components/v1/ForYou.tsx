"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn, EASE_OUT } from "@/lib/utils";
import { forYou } from "./content";
import { PartnerButton } from "./DesignPartner";
import { DiffRow, FileCard, HunkHeader, SectionIntro } from "./primitives";

/** Audiences as two new files in the PR. Ticking "Viewed" collapses a file, like on GitHub. */
export function ForYou() {
  return (
    <section id="for-you" className="scroll-mt-20">
      <SectionIntro hunk={forYou.hunk} title={forYou.title} />
      <div className="grid gap-4 xl:grid-cols-2">
        {forYou.files.map((file) => (
          <AudienceFile key={file.path} file={file} />
        ))}
      </div>
    </section>
  );
}

function AudienceFile({ file }: { file: (typeof forYou.files)[number] }) {
  const [viewed, setViewed] = useState(false);
  const partner = file.key === "providers";
  const lines = file.bullets.length + (partner ? 3 : 2);

  return (
    <FileCard
      path={file.path}
      additions={lines}
      className="self-start"
      right={
        <>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-pr-line bg-pr-bg px-2 py-0.5 text-xs text-pr-muted">
            <input
              type="checkbox"
              checked={viewed}
              onChange={(e) => setViewed(e.target.checked)}
              className="accent-pr-link"
            />
            Viewed
          </label>
          <ChevronDown
            aria-hidden
            className={cn("size-4 text-pr-muted transition-transform duration-300", viewed && "-rotate-90")}
          />
        </>
      }
    >
      <AnimatePresence initial={false}>
        {!viewed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <HunkHeader>{`@@ -0,0 +1,${lines} @@`}</HunkHeader>
            <DiffRow kind="add" newNo={1}>
              <h3 className="py-2 text-2xl font-semibold leading-tight tracking-[-0.03em] [font-stretch:110%] sm:text-3xl">
                {file.title}
              </h3>
            </DiffRow>
            <DiffRow kind="add" newNo={2}>
              <p className="pb-2 text-[15px] leading-relaxed text-pr-ink/80">{file.description}</p>
            </DiffRow>
            {file.bullets.map((bullet, i) => (
              <DiffRow
                key={bullet}
                kind="add"
                newNo={3 + i}
                className={i === file.bullets.length - 1 && !partner ? "pb-2" : undefined}
              >
                <span className="font-jet text-[13px]">- {bullet}</span>
              </DiffRow>
            ))}
            {partner && (
              <DiffRow kind="add" newNo={lines} className="pb-3">
                <PartnerButton placement="for-providers" primary className="mt-2" />
              </DiffRow>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </FileCard>
  );
}
