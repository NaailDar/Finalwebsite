import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TabNavigation from "@/components/apex/TabNavigation";
import type { TabId } from "@/components/apex/TabNavigation";
import MobileFloatingNav from "@/components/layout/MobileFloatingNav";
import HomePage from "./HomePage";
import AlicePage from "./AlicePage";
import SolutionsPage from "./SolutionsPage";
import BespokeWorkflowsPage from "./BespokeWorkflowsPage";
import InfrastructurePage from "./InfrastructurePage";
import ApisDataLayerPage from "./ApisDataLayerPage";
import SecurityPage from "./SecurityPage";
import InsightsPage from "./InsightsPage";
import CompanyPage from "./CompanyPage";
import ContactPage from "./ContactPage";
import apexLogo from "@/assets/apex-logo.png";

const pathToTab: Record<string, TabId> = {
  "/": "Overview",
  "/alice": "ALICE",
  "/solutions": "Solutions",
  "/bespoke-workflows": "Custom Workflows",
  "/infrastructure": "Infrastructure",
  "/apis-data-layer": "APIs & Data Layer",
  "/security": "Security",
  "/insights": "Insights",
  "/company": "Company",
  "/contact": "Contact",
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const activeTab = pathToTab[location.pathname] || "Overview";

  const handleTabChange = (tab: TabId, section?: string) => {
    const tabToPath: Record<TabId, string> = {
      "Overview": "/",
      "ALICE": "/alice",
      "Solutions": "/solutions",
      "Custom Workflows": "/bespoke-workflows",
      "Infrastructure": "/infrastructure",
      "APIs & Data Layer": "/apis-data-layer",
      "Security": "/security",
      "Insights": "/insights",
      "Company": "/company",
      "Contact": "/contact",
      "Home": "/",
    };

    const path = tabToPath[tab];
    if (section) {
      navigate(`${path}/${section}`);
    } else {
      navigate(path);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case "Overview":
        return <HomePage onTabChange={handleTabChange} />;
      case "ALICE":
        return <AlicePage onTabChange={handleTabChange} />;
      case "Solutions":
        return <SolutionsPage />;
      case "Custom Workflows":
        return <BespokeWorkflowsPage />;
      case "Infrastructure":
        return <InfrastructurePage />;
      case "APIs & Data Layer":
        return <ApisDataLayerPage />;
      case "Security":
        return <SecurityPage />;
      case "Insights":
        return <InsightsPage />;
      case "Company":
        return <CompanyPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage onTabChange={handleTabChange} />;
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
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

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
                {[
                  { label: "ALICE", path: "/alice" },
                  { label: "Bespoke Workflows", path: "/bespoke-workflows" },
                  { label: "Infrastructure", path: "/infrastructure" },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    className="text-left font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                Company
              </h4>
              <div className="mt-4 flex flex-col gap-2.5">
                {[
                  { label: "About", path: "/company/about" },
                  { label: "Insights", path: "/insights" },
                  { label: "Careers", path: "/company/careers" },
                  { label: "Contact", path: "/company/contact" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
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

      <MobileFloatingNav />
    </div>
  );
};

export default Index;
