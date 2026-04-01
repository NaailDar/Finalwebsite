import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Layers, Network, ShieldCheck, Check } from "lucide-react";
import { MorphingParticlesV2 } from "./MorphingParticlesV2";
import TransformationAnimation from "./TransformationAnimation";
import SovereigntySection from "./SovereigntySection";
import SecuritySection from "./SecuritySection";
import AliceHubDiagram from "./AliceHubDiagram";
import { type TabId } from "./TabNavigation";
import CorprimeLogo from "@/assets/logos/Corprime.png";
import DeusXLogo from "@/assets/logos/DeusX.png";
import DWSLogo from "@/assets/logos/DWS.png";
import NvidiaLogo from "@/assets/logos/Nvidia.png";
import OxfordLogo from "@/assets/logos/Oxford.png";
import VanguardLogo from "@/assets/logos/Vanguard.png";
import SolsticeLogo from "@/assets/logos/Solstice.png";

const rotatingWords = ["Portfolio Managers", "Traders", "Quants", "Researchers", "Developers"];

const partnerLogos = [
  { src: CorprimeLogo, alt: "Corprime" },
  { src: DeusXLogo, alt: "DeusX" },
  { src: DWSLogo, alt: "DWS" },
  { src: NvidiaLogo, alt: "Nvidia" },
  { src: OxfordLogo, alt: "Oxford" },
  { src: VanguardLogo, alt: "Vanguard" },
  { src: SolsticeLogo, alt: "Solstice" },
];

interface OverviewTabProps {
  onTabChange?: (tab: TabId) => void;
  isHome?: boolean;
}

const OverviewTab = ({ onTabChange, isHome }: OverviewTabProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">("typing");
  const [showContent, setShowContent] = useState(false);
  const firstComplete = useRef(false);

  useEffect(() => {
    const word = rotatingWords[wordIndex];

    if (phase === "typing") {
      if (charIndex < word.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 70);
        return () => clearTimeout(t);
      } else {
        if (!firstComplete.current) {
          firstComplete.current = true;
          setShowContent(true);
        }
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 1800);
      return () => clearTimeout(t);
    } else if (phase === "erasing") {
      if (charIndex > 0) {
        const t = setTimeout(() => setCharIndex((c) => c - 1), 50);
        return () => clearTimeout(t);
      } else {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setPhase("typing");
      }
    }
  }, [charIndex, phase, wordIndex]);

  const dynamicText = rotatingWords[wordIndex].slice(0, charIndex);

  return (
    <div>
      {/* Hero — matches Solutions layout but keeps tesseract */}
      <div className="relative flex min-h-[55vh] items-end overflow-hidden pb-20">
        <div className="absolute top-0 right-0 w-[55%] h-full translate-x-[5%]">
          <MorphingParticlesV2 />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {isHome ? (
              <>
                <p className="font-mono text-5xl font-light uppercase tracking-[0.2em] text-primary md:text-6xl">
                  ALICE
                </p>
                <h1 className="mt-4 font-mono text-4xl font-light leading-[1.15] tracking-tightest text-foreground md:text-5xl lg:text-6xl">
                  The Award-Winning Agent
                  <br />
                  for Capital Markets
                </h1>
                <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
                  Trusted by Global Institutions managing $10T+ in combined AUM. Powered by APEX:E3
                </p>
                <button
                  onClick={() => onTabChange?.("ALICE")}
                  className="mt-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/20"
                >
                  Explore
                </button>
              </>
            ) : (
              <>
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
                  ALICE
                </p>
                <h1 className="mt-4 font-mono text-4xl font-light leading-[1.15] tracking-tightest text-foreground md:text-5xl lg:text-6xl">
                  The AI Agent for
                  <br />
                  {dynamicText}
                  <span className="animate-pulse text-primary">_</span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showContent ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground"
                >
                  Domain-native. Institutionally deployed. Outcome-driven.
                </motion.p>
              </>
            )}

          </motion.div>
        </div>
      </div>

      {/* Logo Banner — Home only */}
      {isHome && (
        <div className="overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
            <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50">
              Partners
            </p>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee items-center gap-16 whitespace-nowrap">
                {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                  <img
                    key={`${logo.alt}-${i}`}
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-auto shrink-0 object-contain opacity-70 brightness-0 invert ${logo.alt === "Oxford" ? "h-14" : logo.alt === "Solstice" ? "h-20" : "h-8"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transformation Animation — ALICE tab only */}
      {!isHome && <TransformationAnimation />}

      {/* Agentic System Section — ALICE tab only */}
      {!isHome && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                Agentic Architecture
              </p>
              <h2 className="mt-4 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
                The Agentic System Behind ALICE
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
                More than an interface. ALICE is a coordinated system of agents, data, and models operating as one.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mt-10 max-w-2xl text-center"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                ALICE acts as the orchestration layer across your AI stack, coordinating specialised agents and sub-agents to execute complex workflows.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Each agent operates as a microservice with defined business logic, while control flow is dynamically managed by AI, enabling systems that adapt, reason, and improve over time.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
              {[
                {
                  icon: Layers,
                  title: "Agentic Harness",
                  desc: "A proprietary orchestration layer that connects models, data, and tools into a unified system, managing context, routing, and execution.",
                },
                {
                  icon: Network,
                  title: "Agent Mesh",
                  desc: "A network of specialised agents working together across workflows, from data ingestion and retrieval to analysis and output generation.",
                },
                {
                  icon: ShieldCheck,
                  title: "System-Level Control",
                  desc: "Full visibility and governance across every step of execution.",
                  bullets: [
                    "Task decomposition and execution",
                    "Data access and transformation",
                    "Output validation and explainability",
                  ],
                },
              ].map((item, i) => (
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
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  {item.bullets && (
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Pillars — Home only */}
      {isHome && <SovereigntySection onTabChange={onTabChange} />}

      {/* Last Mile Section — Home only */}
      {isHome && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl"
            >
              <h3 className="mb-10 text-center font-mono text-sm uppercase tracking-[0.2em] text-primary">
                The Last Mile
              </h3>

              {/* 80% bar */}
              <div className="mb-5">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Frontier Models</span>
                  <span className="font-mono text-sm text-muted-foreground">80%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary/40">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full bg-muted-foreground/30"
                  />
                </div>
                <p className="mt-2 font-mono text-xs tracking-wide text-muted-foreground/60">
                  Insight / Exploration
                </p>
              </div>

              {/* 100% bar */}
              <div className="mb-10">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-sm font-medium text-primary">APEX:E3 Production</span>
                  <span className="font-mono text-sm font-medium text-primary">100%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary/40">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-2 font-mono text-xs tracking-wide text-primary/60">
                  Integrated / Auditable / Deployed
                </p>
              </div>

              <p className="text-center font-mono text-sm leading-relaxed text-muted-foreground">
                Most AI initiatives fail not because of model capability, but because integration, control, and reliability are never solved.
              </p>

              <div className="mt-8 text-center">
                <button
                  onClick={() => onTabChange?.("Custom Workflows")}
                  className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/20"
                >
                  Explore
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Security Section — Home only */}
      {isHome && <SecuritySection onTabChange={onTabChange} />}

      {/* Contact Section — Home only */}
      {isHome && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-20 text-center lg:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
            <h2 className="mt-4 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
              Whether you're exploring AI infrastructure for your fund, interested in a demo of ALICE, or want to discuss a partnership: we'd love to hear from you.
            </p>
            <a
              href="mailto:contact@apexe3.com"
              className="mt-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/20"
            >
              contact@apexe3.com
            </a>
          </div>
        </section>
      )}

      {/* ALICE Hub Diagram — ALICE tab only */}
      {!isHome && onTabChange && <AliceHubDiagram onTabChange={onTabChange} />}

    </div>
  );
};

export default OverviewTab;
