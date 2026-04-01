import { motion } from "framer-motion";
import HeroSection from "./HeroSection";

const InsightsTab = () => {
  return (
    <div>
      <HeroSection
        accentLine="Insights"
        headline="Insights & Research"
        subtitle="Perspectives on agentic AI, quantitative research, and the future of institutional investment infrastructure."
        tesseractVariant="insights"
      />

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm leading-[1.8] text-muted-foreground">
              Coming soon — deep dives into agentic AI, capital markets infrastructure, and quantitative research.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;
