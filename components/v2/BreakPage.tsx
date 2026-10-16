import {
  BreakFooter,
  GitLogSection,
  HelpSection,
  JoinSection,
  LogSection,
  MapSection,
  PanesSection,
  WatchSection,
} from "./Sections";
import { Stage, StaticStory } from "./Stage";

/**
 * Direction 2: the page depends on outside APIs. One silently changes behavior (no changelog entry),
 * Boro's nightly integration test catches it, and Boro heals the page with a reviewed PR. Scroll to watch.
 */
export function BreakPage() {
  return (
    <>
      <main>
        <Stage />
        <StaticStory />
        <LogSection />
        <WatchSection />
        <MapSection />
        <GitLogSection />
        <PanesSection />
        <HelpSection />
        <JoinSection />
      </main>
      <BreakFooter />
    </>
  );
}
