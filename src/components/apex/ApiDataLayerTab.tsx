import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import { Check } from "lucide-react";

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

const ApiDataLayerTab = () => {
  return (
    <div>
      <HeroSection
        accentLine="APIs, SDKs & Data Layer"
        headline={<>Build and integrate AI<br className="hidden md:block" /> into your systems</>}
        subtitle="APEX:E3 provides developer-ready infrastructure to integrate AI directly into your systems, enabling programmatic access to data, models, agents, and workflows at scale."
        tesseractVariant="infrastructure"
      />

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
