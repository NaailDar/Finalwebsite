import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "./HeroSection";

interface Discipline {
  id: string;
  title: string;
  audience: string;
  overview: string;
  features: string[];
  examples: string[];
  outcomes: string[];
}

const disciplines: Discipline[] = [
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    audience: "Portfolio Managers & Strategists",
    overview:
      "ALICE acts as a cross-asset intelligence layer, connecting macro, equities, credit, and alternative datasets into a single interface.",
    features: [
      "Query macro trends and link them to portfolio exposures",
      "Analyse correlations and risk across asset classes",
      "Run portfolio optimisation and allocation scenarios",
      "Monitor global news, policy changes, and market shifts in real time",
      "Generate portfolio-level insights across mixed asset strategies",
    ],
    examples: [
      "What macro drivers explain recent portfolio underperformance?",
      "Show cross-asset correlation shifts over the last 90 days",
    ],
    outcomes: [
      "Better macro awareness",
      "Clearer portfolio risk understanding",
      "Stronger allocation decisions",
    ],
  },
  {
    id: "traders",
    title: "Traders",
    audience: "Traders & Execution Desks",
    overview:
      "ALICE provides deep market intelligence by analysing bond data, spreads, macro drivers, and execution patterns in real time.",
    features: [
      "Analyse credit spreads and relative value across issuers",
      "Monitor market risk and rating changes in real time",
      "Link macro developments to market movements",
      "Extract key terms and covenants from prospectuses",
      "Summarise issuer fundamentals and debt structures",
    ],
    examples: [
      "Analyse spread movements for European HY over the past 6 months",
      "Extract covenants from this bond prospectus",
    ],
    outcomes: [
      "Faster document review",
      "Better spread analysis",
      "Improved risk awareness",
    ],
  },
  {
    id: "quants",
    title: "Quants",
    audience: "Quantitative Researchers & Systematic Teams",
    overview:
      "ALICE bridges natural language and quantitative modelling, allowing quants to define, test, and iterate strategies faster.",
    features: [
      "Convert natural language into backtests and models",
      "Run multi-factor and signal-based strategy analysis",
      "Generate performance metrics (Sharpe, drawdown, volatility)",
      "Analyse factor exposure and portfolio behaviour",
      "Integrate structured and alternative datasets into models",
    ],
    examples: [
      "Forecast BTC-USD price for next 10 days",
      "Detect market regimes for AAPL over the last year",
      "Test cointegration between SPY and QQQ",
      "Use SARIMAX to forecast XOM including CL as an exogenous variable",
    ],
    outcomes: [
      "Faster research cycles",
      "Reduced technical friction",
      "Faster strategy iteration",
    ],
  },
  {
    id: "researchers",
    title: "Researchers",
    audience: "Analysts & Investment Research Teams",
    overview:
      "ALICE transforms fragmented research workflows into a unified, AI-powered workspace.",
    features: [
      "Summarise earnings calls, research notes, and filings instantly",
      "Run cross-document queries across entire research folders",
      "Extract tables, figures, and key metrics into structured formats",
      "Generate first drafts of reports, IC memos, and summaries",
      "Compare company narratives, sentiment, and forward guidance",
    ],
    examples: [
      "Summarise changes in forward guidance across semiconductor earnings calls",
      "Compare management tone across the last 3 quarters",
    ],
    outcomes: [
      "Less manual reading",
      "Faster synthesis",
      "More consistent insight generation",
    ],
  },
  {
    id: "developers",
    title: "Developers",
    audience: "Engineers & Integration Teams",
    overview:
      "ALICE provides API-first access to capital markets intelligence, enabling developers to build custom workflows and integrations.",
    features: [
      "Access structured data via REST and GraphQL APIs",
      "Build custom agents and pipelines using ALICE's SDK",
      "Deploy microservices with Kubernetes and Docker",
      "Integrate with internal systems via secure VPC endpoints",
      "Extend ALICE with custom models and data sources",
    ],
    examples: [
      "Build a Slack bot that answers portfolio questions using ALICE",
      "Create an automated daily briefing pipeline for the CIO",
    ],
    outcomes: [
      "Faster integration cycles",
      "Flexible deployment options",
      "Full API coverage",
    ],
  },
];

interface WorkflowsTabProps {
  scrollToSection?: string;
}

const WorkflowsTab = ({ scrollToSection }: WorkflowsTabProps) => {
  const [activeId, setActiveId] = useState("portfolio-management");

  // Sync active persona when navigated via dropdown/button
  useEffect(() => {
    if (scrollToSection && disciplines.some((d) => d.id === scrollToSection)) {
      setActiveId(scrollToSection);
    }
  }, [scrollToSection]);

  const active = disciplines.find((d) => d.id === activeId)!;

  return (
    <div>
      <HeroSection
        accentLine="Solutions"
        headline={<>ALICE: Role-Adaptive<br />Intelligence</>}
        subtitle="One intelligence layer for every role in investing."
        tesseractVariant="solutions"
      />

      {/* Sticky discipline tabs */}
      <div className="sticky top-16 z-40 border-y border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {disciplines.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className={`shrink-0 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-200 ${
                  activeId === d.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic content */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="mb-12">
                <h2 className="font-mono text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {active.title}
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {active.audience}
                </p>
                <p className="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground">
                  {active.overview}
                </p>
              </div>

              {/* Feature cards */}
              <div className="mb-14">
                <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Capabilities
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {active.features.map((feat, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-secondary/20 p-5"
                    >
                      <p className="font-mono text-xs leading-relaxed text-foreground/80">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example queries */}
              <div className="mb-14">
                <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  Example queries
                </h3>
                <div className="flex flex-col gap-3">
                  {active.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="rounded border border-border bg-card/50 px-5 py-4 font-mono text-xs leading-relaxed text-foreground/70"
                    >
                      <span className="mr-2 text-primary/60">$</span>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome strip */}
              <div className="border-l-2 border-primary/40 pl-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/70">
                  Outcome
                </h3>
                <div className="flex flex-wrap gap-4">
                  {active.outcomes.map((o, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-secondary/30 px-4 py-2 font-mono text-xs text-foreground/80"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsTab;
