"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { cn, EASE_OUT } from "@/lib/utils";
import { conversation } from "./content";
import { PartnerLink } from "./DesignPartner";
import { Identicon, SectionIntro } from "./primitives";

/** FAQ as the PR's conversation: developers ask, boro-bot replies. */
export function Conversation() {
  return (
    <section id="conversation" className="scroll-mt-20">
      <SectionIntro hunk={conversation.hunk} title={conversation.title} />
      <ol className="relative space-y-8">
        <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-0.5 bg-pr-line" />
        {conversation.threads.map((thread) => (
          <motion.li
            key={thread.q}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="relative space-y-3"
          >
            <Comment avatar={<Identicon name={thread.asker} size={40} />} author={`@${thread.asker}`} badge="Contributor">
              <p className="text-lg font-medium leading-snug tracking-[-0.01em]">{thread.q}</p>
            </Comment>
            <div className="sm:pl-14">
              <Comment
                bot
                avatar={<LogoMark className="size-10 rounded-full" />}
                author="boro-bot"
                badge="Bot"
              >
                <p className="text-[15px] leading-relaxed text-pr-ink/85">
                  {thread.a}
                  {thread.partner && (
                    <>
                      {" "}
                      <PartnerLink placement="conversation" />
                    </>
                  )}
                </p>
              </Comment>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

type CommentProps = {
  avatar: ReactNode;
  author: string;
  badge: string;
  bot?: boolean;
  children: ReactNode;
};

function Comment({ avatar, author, badge, bot, children }: CommentProps) {
  return (
    <div className="relative flex gap-4">
      <div className="relative z-10 shrink-0 rounded-full bg-pr-bg">{avatar}</div>
      <div className={cn("min-w-0 flex-1 rounded-md border", bot ? "border-[#54aeff66]" : "border-pr-line")}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-t-md border-b px-4 py-2 text-sm",
            bot ? "border-[#54aeff66] bg-[#ddf4ff]" : "border-pr-line bg-pr-canvas",
          )}
        >
          <span className="font-semibold">{author}</span>
          <span className="text-pr-muted">{bot ? "replied" : "commented"}</span>
          <span className="ml-auto rounded-full border border-pr-line bg-pr-bg px-2 text-xs text-pr-muted">{badge}</span>
        </div>
        <div className="bg-pr-bg px-4 py-3">{children}</div>
      </div>
    </div>
  );
}
