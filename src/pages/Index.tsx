import { useState } from "react";
import apexLogo from "@/assets/apex-logo.png";
import { AnimatePresence, motion } from "framer-motion";
import TabNavigation, { type TabId } from "@/components/apex/TabNavigation";
import OverviewTab from "@/components/apex/OverviewTab";
import WorkflowsTab from "@/components/apex/WorkflowsTab";
import BespokeWorkflowsTab from "@/components/apex/BespokeWorkflowsTab";
import InfrastructureTab from "@/components/apex/InfrastructureTab";
import InsightsTab from "@/components/apex/InsightsTab";
import CompanyTab from "@/components/apex/CompanyTab";
import ApiDataLayerTab from "@/components/apex/ApiDataLayerTab";
import SecurityTab from "@/components/apex/SecurityTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("Overview");
  const [scrollSection, setScrollSection] = useState<string | undefined>();

  const handleTabChange = (tab: TabId, section?: string) => {
    setActiveTab(tab);
    setScrollSection(section);
    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Overview" && <OverviewTab onTabChange={handleTabChange} isHome />}
            {activeTab === "Solutions" && <WorkflowsTab scrollToSection={scrollSection} />}
            {activeTab === "Custom Workflows" && <BespokeWorkflowsTab />}
            {activeTab === "Infrastructure" && <InfrastructureTab />}
            {activeTab === "APIs & Data Layer" && <ApiDataLayerTab />}
            {activeTab === "Security" && <SecurityTab />}
            {activeTab === "ALICE" && <OverviewTab onTabChange={handleTabChange} />}
            {activeTab === "Insights" && <InsightsTab />}
            {activeTab === "Company" && <CompanyTab scrollToSection={scrollSection} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-10">
          <div>
            <img src={apexLogo} alt="APEX:E3" className="h-6 w-auto" />
            <p className="mt-3 max-w-xs font-mono text-xs leading-relaxed text-muted-foreground">
              Agentic AI infrastructure for capital markets.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                Platform
              </h4>
              <div className="mt-4 flex flex-col gap-2.5">
                {["ALICE", "Bespoke Workflows", "Infrastructure"].map(
                  (link) => {
                    const tabMap: Record<string, TabId> = {
                      "ALICE": "ALICE",
                      "Bespoke Workflows": "Custom Workflows",
                      "Infrastructure": "Infrastructure",
                    };
                    return (
                      <button
                        key={link}
                        onClick={() => handleTabChange(tabMap[link])}
                        className="text-left font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                Company
              </h4>
              <div className="mt-4 flex flex-col gap-2.5">
                {[
                  { label: "About", section: "about", tab: "Company" as TabId },
                  { label: "Insights", section: undefined, tab: "Insights" as TabId },
                  { label: "Careers", section: "careers", tab: "Company" as TabId },
                  { label: "Contact", section: "contact", tab: "Company" as TabId },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleTabChange(item.tab, item.section)}
                    className="text-left font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">
            <p className="font-mono text-[10px] text-muted-foreground/40">
              © {new Date().getFullYear()} APEX:E3. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
