import { motion } from "framer-motion";
import { MessageSquare, Bot, Server, Code, ArrowRight } from "lucide-react";
import { type TabId } from "./TabNavigation";

const alicePillar = {
  icon: MessageSquare,
  title: "ALICE",
  subtitle: "The Agentic Harness for Capital Markets",
  desc: "An agentic orchestration harness across research, analytics, and workflows. Coordinating data, models, and tools into production-ready systems.",
  tab: "ALICE" as TabId,
};

const otherPillars: { icon: typeof MessageSquare; title: string; subtitle: string; desc: string; tab: TabId }[] = [
  {
    icon: Bot,
    title: "Bespoke Agents",
    subtitle: "Custom AI Workflows",
    desc: "Domain-specific agents designed around your internal processes, from research to execution.",
    tab: "Custom Workflows",
  },
  {
    icon: Server,
    title: "Infrastructure",
    subtitle: "Enterprise AI Platform",
    desc: "Private, scalable AI infrastructure, deployed within your environment with full control.",
    tab: "Infrastructure",
  },
  {
    icon: Code,
    title: "APIs & Data Layer",
    subtitle: "Build on APEX",
    desc: "APIs, SDKs, and data pipelines to integrate, extend, and customise across your stack.",
    tab: "APIs & Data Layer",
  },
];

interface SovereigntySectionProps {
  onTabChange?: (tab: TabId) => void;
}

const SovereigntySection = ({ onTabChange }: SovereigntySectionProps) => {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl"
        >
          A Complete Sovereign AI Stack. Delivered Your Way
        </motion.h2>

        {/* ALICE — Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col items-center border border-primary/30 bg-primary/5 p-10 text-center"
        >
          <alicePillar.icon className="mb-4 h-6 w-6 text-primary" strokeWidth={1.5} />
          <h3 className="font-mono text-lg font-medium tracking-wide text-foreground">
            {alicePillar.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
            {alicePillar.subtitle}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {alicePillar.desc}
          </p>
          {onTabChange && (
            <button
              onClick={() => {
                onTabChange(alicePillar.tab);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80"
            >
              Explore
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </motion.div>

        {/* Other 3 Pillars */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {otherPillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col bg-background p-8"
            >
              <item.icon className="mb-4 h-5 w-5 text-primary" strokeWidth={1.5} />
              <h3 className="font-mono text-sm font-medium tracking-wide text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary/70">
                {item.subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
              {onTabChange && (
                <button
                  onClick={() => {
                    onTabChange(item.tab);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80"
                >
                  Explore
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SovereigntySection;
