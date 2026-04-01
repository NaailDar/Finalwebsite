import { motion } from "framer-motion";
import { Check, Link, Settings, Lock, Building } from "lucide-react";
import HeroSection from "./HeroSection";

const useCases = [
  {
    title: "Research & Document Workflows",
    description:
      "Automate analysis across earnings calls, research reports, and filings with structured outputs and summaries.",
  },
  {
    title: "Data Extraction & Integration",
    description:
      "Extract and standardise data from PDFs, spreadsheets, and internal systems into analysis-ready formats.",
  },
  {
    title: "Portfolio & Risk Workflows",
    description:
      "Custom analytics, monitoring, and reporting aligned to internal portfolio construction and risk frameworks.",
  },
  {
    title: "Compliance & Audit Workflows",
    description:
      "Automate regulatory checks, reporting, and audit trails with full explainability and control.",
  },
  {
    title: "Internal Data Access (Natural Language → SQL)",
    description:
      "Query internal datasets using natural language with controlled, auditable execution.",
  },
  {
    title: "Agentic Task Automation",
    description:
      "Multi-step workflows executed automatically, from ingestion to analysis to output.",
  },
];

const steps = [
  {
    num: "01",
    title: "Identify",
    description:
      "We work with your team to identify high-impact workflows and bottlenecks.",
  },
  {
    num: "02",
    title: "Build",
    description:
      "We design and deploy tailored AI workflows integrated into your data and systems.",
  },
  {
    num: "03",
    title: "Deploy & Iterate",
    description:
      "Production-ready deployment with continuous refinement based on real usage.",
  },
];

const frontierCapabilities = [
  "Exploration",
  "Summarisation",
  "Prototyping",
];

const lastMileCards = [
  {
    icon: Link,
    label: "Data",
    title: "Integration with proprietary data",
  },
  {
    icon: Settings,
    label: "Workflow",
    title: "Structured, repeatable workflows",
  },
  {
    icon: Lock,
    label: "Compliance",
    title: "Accuracy, traceability, and compliance",
  },
  {
    icon: Building,
    label: "Systems",
    title: "Embedding into real decision systems",
  },
];

const apexDelivers = [
  {
    icon: Link,
    text: "Direct integration with internal systems",
  },
  {
    icon: Settings,
    text: "Domain-specific logic and constraints",
  },
  {
    icon: Check,
    text: "Consistent, auditable outputs",
  },
  {
    icon: Lock,
    text: "Secure deployment within your environment",
  },
];

const ProgressBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mx-auto max-w-2xl"
  >
    {/* 80% bar */}
    <div className="mb-3">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-xs text-muted-foreground">Frontier Models</span>
        <span className="font-mono text-xs text-muted-foreground">80%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="h-full rounded-full bg-muted-foreground/30"
        />
      </div>
      <p className="mt-1.5 font-mono text-[10px] tracking-wide text-muted-foreground/60">
        Insight / Exploration
      </p>
    </div>

    {/* 100% bar */}
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-xs font-medium text-primary">APEX:E3 Production</span>
        <span className="font-mono text-xs font-medium text-primary">100%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
      <p className="mt-1.5 font-mono text-[10px] tracking-wide text-primary/60">
        Integrated / Auditable / Deployed
      </p>
    </div>
  </motion.div>
);

const BespokeWorkflowsTab = () => {
  return (
    <div>
      <HeroSection
        accentLine="Bespoke Workflows"
        headline={<>Closing the Last Mile<br />to Production</>}
        subtitle="Frontier AI models get you 80% of the way. The remaining 20% is where real value is created, and where most systems fail."
        tesseractVariant="solutions"
      />

      {/* The Challenge */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              The Challenge
            </h3>

            <p className="max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground">
              Frontier models (GPT, Claude) are powerful for:
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {frontierCapabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full border border-border bg-secondary/30 px-4 py-2 font-mono text-xs text-muted-foreground"
                >
                  {cap}
                </span>
              ))}
            </div>

            <p className="mt-8 font-mono text-sm font-medium text-foreground">
              But they stop short of production.
            </p>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              The final mile requires:
            </p>

            {/* 4 icon cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {lastMileCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-lg border border-border bg-secondary/20 p-5"
                >
                  <card.icon className="mb-3 h-5 w-5 text-primary" />
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-primary/60">
                    {card.label}
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-foreground/80">
                    {card.title}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 font-mono text-sm font-medium text-foreground">
              This is where generic tools stop.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The APEX:E3 Difference */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              The APEX:E3 Difference
            </h3>
            <p className="max-w-3xl font-mono text-sm leading-relaxed text-foreground/80">
              We turn AI from experimentation into infrastructure. APEX:E3 delivers:
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {apexDelivers.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-lg border border-border bg-secondary/20 p-5"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="font-mono text-xs leading-relaxed text-foreground/80">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual: 80% → 100% Progress Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <ProgressBar />

          {/* Reality check line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mx-auto mt-10 max-w-2xl text-center font-mono text-xs leading-relaxed text-muted-foreground"
          >
            Most AI initiatives fail not because of model capability, but because integration, control, and reliability are never solved.
          </motion.p>
        </div>
      </div>

      {/* Closing Line */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mx-auto max-w-2xl font-mono text-sm leading-relaxed text-foreground/80">
              The difference between AI that is used occasionally and AI that drives outcomes is the last mile. That's what we build.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              What This Looks Like
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-lg border border-border bg-secondary/20 p-6"
                >
                  <h4 className="font-mono text-sm font-medium text-foreground">
                    {uc.title}
                  </h4>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                    {uc.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* How We Work */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              How We Work
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="font-mono text-3xl font-light text-primary/40">
                    {step.num}
                  </span>
                  <h4 className="mt-3 font-mono text-sm font-medium text-foreground">
                    {step.title}
                  </h4>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BespokeWorkflowsTab;
