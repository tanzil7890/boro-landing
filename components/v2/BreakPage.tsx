import {
  BreakFooter,
  GitLogSection,
  HelpSection,
  JoinSection,
  LogSection,
  PanesSection,
  WatchSection,
} from "./Sections";
import { Stage, StaticStory } from "./Stage";

/** Direction 2: the page depends on an API that ships a breaking change. Scroll to watch Boro heal it. */
export function BreakPage() {
  return (
    <>
      <main>
        <Stage />
        <StaticStory />
        <LogSection />
        <WatchSection />
        <GitLogSection />
        <PanesSection />
        <HelpSection />
        <JoinSection />
      </main>
      <BreakFooter />
    </>
  );
}
