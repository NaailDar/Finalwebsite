import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, User } from "lucide-react";
import HeroSection from "./HeroSection";

interface Leader {
  name: string;
  title: string;
  bullets: string[];
}

const leaders: Leader[] = [
  {
    name: "Usman Khan",
    title: "Founder & CEO",
    bullets: [
      "Award-winning entrepreneur and technologist with multiple successful exits.",
      "Over 10 years at UBS Investment Bank specialising in high-performance computing, AI, quantitative methods, and applied mathematics.",
      "Deep expertise in applying AI across fixed income, equities, and algorithmic trading.",
      "Investor and advisor to multiple successful high growth technology firms.",
      "Founded and scaled b2b fintech companies to over $10M+ ARR and 300+ Buy side and Sell side enterprise clients globally.",
    ],
  },
  {
    name: "Jens Raiser, CFA, CFDS",
    title: "Chief Commercial Officer",
    bullets: [
      "Head of AI Strategy and Chief Commercial Officer at APEX:E3 driving AI adoption in financial services.",
      "Former senior executive at Bank of America Merrill Lynch, Merrill Lynch, and HSBC with 25+ years capital markets experience.",
      "Financial analyst and portfolio manager across equities, fixed income, commodities, and FX.",
      "Founder of JR Digital Ventures advising C-suite executives and investing in emerging technology startups.",
      "Chartered Financial Analyst (CFA), Chartered Financial Data Scientist (CFDS), MIT CSAIL AI Executive Education.",
    ],
  },
  {
    name: "Tim Grant",
    title: "Chairman",
    bullets: [
      "Chief Executive Officer at Deus X Capital, a family office-backed global investment and operating company.",
      "Chairman of AlphaLab40, an institutional market maker.",
      "Former Head of EMEA at Galaxy, a leading digital asset and blockchain financial services firm.",
      "Previously CEO of SIX Digital Exchange (SDX), Founder and CEO of DrumG Technologies, and CEO of R3 Lab and Research Center.",
      "Early career as Managing Director at UBS O'Connor and UBS Investment Bank.",
    ],
  },
];

const teamMembers = [
  { name: "Leadership Team", role: "Deep expertise across quantitative finance, AI research, and enterprise infrastructure." },
  { name: "Engineering", role: "Systems engineers from high-frequency trading, cloud-native platforms, and ML infrastructure." },
  { name: "Research", role: "PhD-level researchers in NLP, reinforcement learning, and financial signal processing." },
];

interface CompanyTabProps {
  scrollToSection?: string;
}

const CompanyTab = ({ scrollToSection }: CompanyTabProps) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollToSection) return;
    const ref =
      scrollToSection === "about" ? aboutRef :
      scrollToSection === "careers" ? careersRef :
      scrollToSection === "contact" ? contactRef : null;

    if (ref?.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [scrollToSection]);

  return (
    <div>
      <HeroSection
        accentLine="Company"
        headline="Built for Markets"
        subtitle="A team of practitioners building infrastructure where AI meets alpha."
      />

      {/* About Section */}
      <div ref={aboutRef} className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h3 className="mt-4 font-mono text-3xl font-light tracking-tightest text-foreground md:text-4xl">
              Domain-Native Builders
            </h3>
            <div className="mt-8 space-y-6 max-w-2xl">
              <p className="text-sm leading-[1.8] text-muted-foreground">
                Our mission is to close the gap between AI capability and
                investment outcome. We build infrastructure that institutional
                investors can deploy, trust, and measure. Not demos, not
                prototypes, but production systems.
              </p>
              <p className="text-sm leading-[1.8] text-muted-foreground">
                Every component is designed for the realities of regulated capital
                markets: data sovereignty, auditability, latency constraints, and
                integration with existing workflows.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="rounded-lg border border-border bg-secondary/20 p-6"
                >
                  <h4 className="font-mono text-sm font-medium tracking-wide text-foreground">
                    {member.name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Leadership
            </p>
            <h3 className="mt-4 font-mono text-3xl font-light tracking-tightest text-foreground md:text-4xl">
              Experienced and Aligned Leadership
            </h3>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col rounded-lg border border-border bg-secondary/20"
              >
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-border p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/40">
                    <User className="h-7 w-7 text-muted-foreground/50" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-medium text-foreground">
                      {leader.name}
                    </h4>
                    <p className="mt-0.5 font-mono text-[11px] text-primary">
                      {leader.title}
                    </p>
                  </div>
                </div>

                {/* Bullets */}
                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {leader.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                        <span className="font-mono text-xs leading-relaxed text-muted-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advisory note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 rounded-lg border border-border bg-secondary/10 px-6 py-4 text-center"
          >
            <p className="font-mono text-xs leading-relaxed text-muted-foreground">
              Experienced advisory board and large professional network in Financial Services.
            </p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
              Team of Software Engineers, Quants, Analysts, Data Scientists, and UI/UX Designers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Careers Section */}
      <div ref={careersRef} className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl"
          >
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              Careers
            </p>
            <h3 className="mt-4 font-mono text-3xl font-light tracking-tightest text-foreground md:text-4xl">
              Join the Team
            </h3>
            <div className="mt-8 space-y-6">
              <p className="text-sm leading-[1.8] text-muted-foreground">
                We're building the future of institutional AI. If you thrive at the intersection of finance, engineering, and research, we'd like to hear from you.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 border-t border-border pt-12"
            >
              <p className="font-mono text-sm text-muted-foreground">
                Interested?{" "}
                <a href="mailto:contact@apexe3.com" className="text-primary hover:underline">
                  Get in touch
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default CompanyTab;
