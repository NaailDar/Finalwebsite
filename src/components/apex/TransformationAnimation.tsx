import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import ChaosToOrderParticles from "./ChaosToOrderParticles";

const disciplines = [
  {
    label: "Equities",
    prompts: [
      "Screen companies with ROIC > 15%, revenue growth > 10%, and expanding margins over the last 3 years",
      "Summarise key changes in management guidance across the last 4 earnings calls for NVDA",
      "Build a valuation comp table for MSFT vs peers with EV/EBITDA, P/E, and growth-adjusted multiples",
      "Plot AAPL revenue, gross margin, and FCF over the last 10 years",
    ],
  },
  {
    label: "Credit",
    prompts: [
      "Extract covenants, call structure, and key risks from this bond prospectus",
      "Compare spreads for European HY vs US HY over the last 12 months",
      "Identify issuers with widening spreads and deteriorating fundamentals",
      "Plot the credit curve for Tesla bonds and analyse shifts over time",
    ],
  },
  {
    label: "Quant",
    prompts: [
      "Detect regime shifts in SPY using a Markov switching model",
      "Test cointegration between SPY and QQQ and build a mean-reversion strategy",
      "Run a multi-factor model using value, momentum, and quality factors",
      "Backtest a volatility breakout strategy on BTC-USD over the last 3 years",
    ],
  },
  {
    label: "Multi-Asset",
    prompts: [
      "What macro factors explain recent portfolio drawdowns?",
      "Show cross-asset correlations between equities, rates, and commodities",
      "Analyse how inflation surprises impact equity and bond performance",
      "Simulate portfolio performance under a +100bps rate shock",
    ],
  },
  {
    label: "Research",
    prompts: [
      "Summarise all semiconductor earnings calls and highlight changes in forward guidance",
      "Compare management tone across earnings calls for AMZN over the last year",
      "Extract key KPIs from this 10-K and structure them into a table",
      "Generate a first draft investment memo for this company",
    ],
  },
  {
    label: "Data / Extraction",
    prompts: [
      "Extract all tables and charts from this PDF into Excel",
      "Convert this earnings presentation into structured financial data",
      "Pull key metrics from filings and build a clean dataset",
      "Create a time series dataset from these reports and export to CSV",
    ],
  },
];

const TransformationAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % disciplines.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(advance, 5000);
    const handleVisibility = () => {
      if (!document.hidden) advance();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused, advance]);

  const active = disciplines[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="border-b border-border"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/50">
            Core Capability
          </p>
          <h3 className="mt-3 font-mono text-lg font-light tracking-tightest text-foreground md:text-2xl">
            From noise to conviction
          </h3>
        </div>

        <div className="flex flex-col items-stretch gap-0 md:flex-row">
          {/* Unstructured: chaotic particles */}
          <div
            className="relative flex-1 overflow-hidden rounded-sm border border-border bg-secondary/20"
            style={{ minHeight: 300 }}
          >
            <ChaosToOrderParticles />
          </div>

          {/* Center arrow with sweep */}
          <div className="relative flex items-center justify-center px-4 py-6 md:px-8 md:py-0">
            <div className="relative flex h-10 w-full items-center md:h-full md:w-10 md:flex-col">
              <div className="relative h-px w-full overflow-hidden bg-border md:h-full md:w-px">
                <motion.div
                  className="absolute left-0 top-0 h-full w-20 md:h-20 md:w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
                  }}
                  animate={{ x: ["0%", "500%"], y: ["0%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.8,
                  }}
                />
              </div>
              <div className="font-mono text-lg text-primary/60 md:mt-1">→</div>
            </div>
          </div>

          {/* Right panel: auto-scrolling discipline carousel */}
          <div
            className="relative flex-1 rounded-sm border border-primary/20 bg-secondary/10 overflow-hidden"
            style={{ minHeight: 380 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top gradient fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background/80 to-transparent" />
            {/* Bottom gradient fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background/80 to-transparent" />

            <div className="p-6 md:p-8">
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                Actionable Workflows
              </div>

              {/* Discipline indicator dots */}
              <div className="mb-6 flex gap-1.5">
                {disciplines.map((d, i) => (
                  <button
                    key={d.label}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                    }`}
                    aria-label={d.label}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.15em] text-primary">
                    {active.label}
                  </div>
                  <div className="space-y-2.5">
                    {active.prompts.map((prompt, i) => (
                      <motion.div
                        key={i}
                        className="rounded border border-border bg-secondary/30 px-3 py-2.5 font-mono text-[11px] leading-relaxed text-foreground/70"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                      >
                        <span className="text-primary/80">ALICE &gt;</span>{" "}
                        {prompt}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransformationAnimation;
