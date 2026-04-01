

## Add "The Agentic System Behind ALICE" Section to the ALICE Tab

Insert a new section between the `TransformationAnimation` (particle simulation) and the `AliceHubDiagram` (System Architecture) on the ALICE tab page.

### New Section: "The Agentic System Behind ALICE"

**Layout** (within `OverviewTab.tsx`, rendered when `!isHome`):

1. **Header block** (centered)
   - Label: "Agentic Architecture" (styled as `text-[11px] uppercase tracking-[0.2em] text-primary`)
   - Title: "The Agentic System Behind ALICE"
   - Subtitle: "More than an interface. ALICE is a coordinated system of agents, data, and models operating as one."

2. **Core paragraph** (centered, max-w-2xl)
   - Two paragraphs explaining orchestration layer and agent-as-microservice concept

3. **Three-card grid** (`grid-cols-1 md:grid-cols-3`, with `gap-px border border-border bg-border` pattern matching SovereigntySection)
   - **Agentic Harness**: Icon (Layers from lucide), description about orchestration layer connecting models/data/tools
   - **Agent Mesh**: Icon (Network from lucide), description about specialised agents working together
   - **System-Level Control**: Icon (Shield from lucide), description + bullet list (task decomposition, data access, output validation)

### Technical Details

- **File changed**: `src/components/apex/OverviewTab.tsx`
- New JSX block inserted between `{!isHome && <TransformationAnimation />}` and `{!isHome && onTabChange && <AliceHubDiagram ... />}`
- Uses existing patterns: `motion` animations, `border-t border-border` section dividers, `max-w-[1400px]` container
- Icons: `Layers`, `Network`, `ShieldCheck` from lucide-react
- Follows the same card grid pattern used in `SovereigntySection` (gap-px with bg-border trick)

