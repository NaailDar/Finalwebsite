import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import { Check, Zap, Shield, Clock, Database, TrendingUp, BarChart3, Globe, FileText, Leaf } from "lucide-react";

const capabilities = [
  { title: "API Access", desc: "Access data, models, and agents programmatically, enabling seamless integration into internal platforms and workflows." },
  { title: "SDKs & Developer Tooling", desc: "Build custom applications and workflows on top of APEX using flexible SDKs and modular components." },
  { title: "MCP & Data Connectivity", desc: "Connect to internal and external data sources through a unified data layer, enabling real-time and historical analysis across systems." },
  { title: "Private Data Rooms", desc: "Ingest, structure, and analyse large volumes of internal or deal-specific data securely within controlled environments." },
  { title: "Natural Language → Systems", desc: "Translate user intent into structured queries and actions across databases, APIs, and internal tools." },
  { title: "Agent Integration", desc: "Embed APEX agents directly into existing systems, enabling automated workflows across platforms." },
];

const useCases = [
  { title: "Internal Platform Integration", desc: "Embed AI capabilities into existing research, trading, or risk systems." },
  { title: "Data Pipeline Augmentation", desc: "Enhance existing data infrastructure with AI-driven ingestion, structuring, and analysis." },
  { title: "Custom Application Development", desc: "Build proprietary tools and interfaces powered by APEX infrastructure." },
  { title: "Secure Data Room Analysis", desc: "Run AI-driven analysis across confidential datasets for due diligence, research, or internal workflows." },
];

const keyCapabilities = [
  "Fully private deployment (VPC / on-prem / hybrid)",
  "API-first architecture",
  "Real-time and batch data processing",
  "Secure access controls and permissions",
  "Scalable across teams, systems, and datasets",
];

// Data pillars from old website
const dataPillars = [
  { icon: Zap, label: "Low Latency", desc: "Real-time data-to-signal delivery" },
  { icon: Clock, label: "Point-in-Time Accuracy", desc: "No lookahead bias" },
  { icon: Shield, label: "Privacy", desc: "Your data stays yours" },
];

// Data categories from old website
const dataCategories = [
  {
    icon: TrendingUp,
    title: "Market Data",
    items: ["Real-time & historical prices", "Tick-level & OHLCV data", "Exchange coverage", "Corporate actions"],
  },
  {
    icon: BarChart3,
    title: "Fundamental Data",
    items: ["Company financials (quarterly/annual)", "Earnings estimates & revisions", "Segment-level breakdowns", "Industry classifications"],
  },
  {
    icon: Globe,
    title: "Economic & Macro Data",
    items: ["Inflation & rates", "Labour market", "Wages", "Sector/regional breakdowns"],
  },
  {
    icon: Database,
    title: "Alternative & Sentiment Data",
    items: ["News & social sentiment", "Geopolitical news analysis", "Alternative data feeds"],
  },
  {
    icon: Leaf,
    title: "ESG & Risk Data",
    items: ["ESG scores and sustainability profiles", "Governance and oversight signals", "Controversy and reputational risk"],
  },
  {
    icon: FileText,
    title: "Documents & Filings",
    items: ["SEC filings", "Earnings call transcripts", "Prospectuses & IPO docs", "Insider trading reports"],
  },
];

// Data quality metrics
const dataQualityMetrics = [
  { label: "Coverage", desc: "Comprehensive and complete" },
  { label: "Temporal Accuracy", desc: "Point-in-time alignment" },
  { label: "Standardisation", desc: "Consistent schemas" },
  { label: "Data Quality", desc: "Continuous validation" },
];

// Data risks
const dataRisks = [
  "Incomplete datasets → Gaps in analysis and missed opportunities",
  "Inconsistent schemas → Model instability and integration issues",
  "Lookahead bias → Distorted backtesting and unreliable signals",
  "Stale data → Delayed responses in fast-moving markets",
];

const ApiDataLayerTab = () => {
  return (
    <div>
      <HeroSection
        accentLine="APIs, SDKs & Data Layer"
        headline={<>Build and integrate AI<br className="hidden md:block" /> into your systems</>}
        subtitle="APEX:E3 provides developer-ready infrastructure to integrate AI directly into your systems, enabling programmatic access to data, models, agents, and workflows at scale."
        tesseractVariant="infrastructure"
      />

      {/* Data Pillars */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {dataPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                  <pillar.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-medium tracking-wide text-foreground">
                    {pillar.label}
                  </h3>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Categories Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              Data Categories
            </p>
            <h2 className="mt-3 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
              Data That Drives Investment Decisions
            </h2>
            <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              From macro positioning to single-name analysis — all delivered with point-in-time accuracy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {dataCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col bg-background p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h3 className="font-mono text-sm font-medium tracking-wide text-foreground">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary/60 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <p className="mt-8 font-mono text-xs text-muted-foreground/70">
            All datasets are delivered with point-in-time accuracy to eliminate lookahead bias.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              Core Capabilities
            </p>
            <h2 className="mt-3 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
              What This Enables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {capabilities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col bg-background p-8"
              >
                <h3 className="font-mono text-sm font-medium tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Quality Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Data Risks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground/60">
                Data Risks
              </p>
              <h3 className="mt-3 font-mono text-xl font-light tracking-tightest text-foreground">
                Inaccurate data introduces risk at every stage
              </h3>
              <div className="mt-6 space-y-3">
                {dataRisks.map((risk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="rounded-lg border border-border/50 bg-secondary/20 px-4 py-3"
                  >
                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                      {risk}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Data Integrity Standards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
                Data Integrity Standards
              </p>
              <h3 className="mt-3 font-mono text-xl font-light tracking-tightest text-foreground">
                Institutional-grade data quality
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {dataQualityMetrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" strokeWidth={2} />
                    <div>
                      <p className="font-mono text-sm font-medium text-foreground">
                        {metric.label}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {metric.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              Practical Applications
            </p>
            <h2 className="mt-3 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
              How It's Used
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col bg-background p-8"
              >
                <h3 className="font-mono text-sm font-medium tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities Strip */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {keyCapabilities.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" strokeWidth={2} />
                <span className="font-mono text-xs tracking-wide text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <p className="text-center font-mono text-lg font-light tracking-tightest text-foreground md:text-xl">
            Designed for teams that want to go beyond using AI — and start building with it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ApiDataLayerTab;
