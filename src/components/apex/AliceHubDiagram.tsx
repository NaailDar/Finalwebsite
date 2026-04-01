import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type TabId } from "./TabNavigation";

const inputGroups = [
  {
    label: "Public Data",
    items: ["SEC EDGAR", "News / Web Data", "Market Data"],
  },
  {
    label: "Enterprise Data",
    items: ["SharePoint", "Microsoft 365", "Internal Documents"],
  },
  {
    label: "Financial Providers",
    items: ["S&P Capital IQ", "Bloomberg", "FactSet"],
  },
  {
    label: "Proprietary Data",
    items: ["Internal Datasets", "Alternative Data", "Portfolio & Position Data"],
  },
];

const outputs = ["Insights", "Reports", "Models", "Dashboards", "Signals"];

interface AliceHubDiagramProps {
  onTabChange: (tab: TabId, section?: string) => void;
}

const AliceHubDiagram = ({ onTabChange }: AliceHubDiagramProps) => {
  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            System Architecture
          </p>
          <h2 className="mt-3 font-mono text-3xl font-light tracking-tightest text-foreground md:text-4xl">
            One Intelligence Layer. Fully Private.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-sm text-muted-foreground">
            ALICE sits behind your firewall — unifying every data source, powering every output.
          </p>
        </motion.div>

        {/* Vertical diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Input groups — 4-col grid (2-col mobile) */}
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {inputGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * gi }}
                className="space-y-2 min-w-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary/70">
                  {group.label}
                </span>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-[11px] text-foreground/80 whitespace-nowrap"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inbound flow connector */}
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="relative h-16 w-px overflow-hidden bg-border/30">
              <div className="absolute inset-0 animate-[flowDown_1.5s_linear_infinite] bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
              ingest
            </span>
            <div className="relative h-8 w-px overflow-hidden bg-border/30">
              <div className="absolute inset-0 animate-[flowDown_1.5s_linear_infinite_0.3s] bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>
          </div>

          {/* ALICE core node */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-10 rounded-full bg-primary/8 blur-2xl animate-pulse" />
            {/* Mid glow */}
            <div className="absolute -inset-6 rounded-full bg-primary/10 blur-lg animate-[pulse_3s_ease-in-out_infinite]" />
            {/* Border ring */}
            <div className="absolute -inset-3 rounded-full border border-primary/20" />
            {/* Core */}
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-primary/40 bg-card lg:h-40 lg:w-40">
              <span className="font-mono text-xl font-medium text-primary lg:text-2xl">
                ALICE
              </span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground lg:text-[9px]">
                Intelligence Layer
              </span>
            </div>
          </div>

          {/* Outbound flow connector */}
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="relative h-8 w-px overflow-hidden bg-border/30">
              <div className="absolute inset-0 animate-[flowDown_1.5s_linear_infinite_0.6s] bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
              output
            </span>
            <div className="relative h-16 w-px overflow-hidden bg-border/30">
              <div className="absolute inset-0 animate-[flowDown_1.5s_linear_infinite_0.9s] bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>
          </div>

          {/* Output cards — row (3-col mobile) */}
          <div className="grid w-full max-w-2xl grid-cols-3 gap-3 lg:grid-cols-5">
            {outputs.map((output, i) => (
              <motion.div
                key={output}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-md border border-primary/20 bg-primary/5 px-3 py-3 text-center font-mono text-[11px] text-primary/90 shadow-[0_0_12px_-3px_hsl(var(--primary)/0.15)]"
              >
                {output}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => {
              onTabChange("Infrastructure");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Learn More
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        {/* Explore Solutions for Roles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <h3 className="font-mono text-xl font-light tracking-tight text-foreground md:text-2xl">
            Explore Solutions
          </h3>
          <p className="mx-auto mt-3 max-w-md font-mono text-sm text-muted-foreground">
            See how ALICE adapts to every role in investing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label: "Portfolio Management", section: "portfolio-management" },
              { label: "Traders", section: "traders" },
              { label: "Quants", section: "quants" },
              { label: "Researchers", section: "researchers" },
              { label: "Developers", section: "developers" },
            ].map(({ label, section }) => (
              <button
                key={label}
                onClick={() => {
                  onTabChange("Solutions", section);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-full border border-primary/40 bg-primary/10 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-all hover:bg-primary/20 hover:border-primary/60"
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated flow keyframes */}
      <style>{`
        @keyframes flowDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default AliceHubDiagram;
