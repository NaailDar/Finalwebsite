import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import apexLogo from "@/assets/apex-logo.png";

const tabs = [
  "Home",
  "Solutions",
  "Security",
  "Insights",
  "Company",
] as const;

export type TabId = (typeof tabs)[number] | "Overview" | "ALICE" | "Custom Workflows" | "Infrastructure" | "APIs & Data Layer" | "Security";



export type SubSection = string;

interface DropdownItem {
  label: string;
  desc?: string;
  section?: string;
  tab?: TabId;
  children?: { label: string; section: string; tab: TabId }[];
}

const dropdowns: Partial<Record<string, DropdownItem[]>> = {
  Solutions: [
    {
      label: "ALICE",
      desc: "Award-winning agentic AI for capital markets",
      tab: "ALICE",
      children: [
        { label: "Portfolio Management", section: "portfolio-management", tab: "Solutions" },
        { label: "Traders", section: "traders", tab: "Solutions" },
        { label: "Quants", section: "quants", tab: "Solutions" },
        { label: "Researchers", section: "researchers", tab: "Solutions" },
        { label: "Developers", section: "developers", tab: "Solutions" },
      ],
    },
    { label: "Bespoke Workflows", desc: "Custom AI workflows for your processes", tab: "Custom Workflows" },
    { label: "Infrastructure", desc: "Enterprise AI platform & deployment", tab: "Infrastructure" },
    { label: "APIs & Data Layer", desc: "APIs, SDKs, and data pipelines to integrate and extend", tab: "APIs & Data Layer" },
  ],
};

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId, section?: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const timeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (tab: string) => {
    if (timeoutRef.current[tab]) clearTimeout(timeoutRef.current[tab]);
    setOpenDropdown(tab);
  };

  const handleMouseLeave = (tab: string) => {
    timeoutRef.current[tab] = setTimeout(() => {
      setOpenDropdown((prev) => (prev === tab ? null : prev));
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo — home button */}
        <button
          onClick={() => onTabChange("Overview")}
          className="transition-opacity hover:opacity-80 cursor-pointer"
        >
          <img src={apexLogo} alt="APEX:E3" className="h-6 w-auto" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {tabs.map((tab) => {
            const items = dropdowns[tab];
            return (
              <div
                key={tab}
                className="relative"
                onMouseEnter={() => items && handleMouseEnter(tab)}
                onMouseLeave={() => items && handleMouseLeave(tab)}
              >
                <button
                  onClick={() => {
                    if (tab === "Home") {
                      onTabChange("Overview");
                    } else if (tab === "Solutions") {
                      onTabChange("ALICE");
                      setOpenDropdown(null);
                    } else if (!items) {
                      onTabChange(tab as TabId);
                    } else {
                      setOpenDropdown(openDropdown === tab ? null : tab);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200",
                    (tab === "Home" && activeTab === "Overview") ||
                    (tab === "Solutions" && ["ALICE", "Custom Workflows", "Infrastructure", "Solutions"].includes(activeTab)) ||
                    activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {items && (
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        openDropdown === tab && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {items && openDropdown === tab && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 animate-fade-in">
                    <div className="rounded-lg border border-border bg-background/95 p-3 shadow-xl backdrop-blur-lg min-w-[480px]">
                      <div className="grid grid-cols-2 gap-1">
                        {/* Left column: ALICE with children */}
                        <div className="flex flex-col">
                          {items.filter(item => item.children).map((item) => (
                            <div key={item.label} className="flex flex-col">
                              <button
                                onClick={() => {
                                  onTabChange(item.tab || tab, item.section);
                                  setOpenDropdown(null);
                                }}
                                className="flex flex-col gap-1 rounded-md px-4 py-3 text-left transition-colors hover:bg-secondary"
                              >
                                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
                                  {item.label}
                                </span>
                                {item.desc && (
                                  <span className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                                    {item.desc}
                                  </span>
                                )}
                              </button>
                              {item.children && (
                                <div className="ml-4 flex flex-col border-l border-border pl-3 pb-2">
                                  {item.children.map((child) => (
                                    <button
                                      key={child.label}
                                      onClick={() => {
                                        onTabChange(child.tab, child.section);
                                        setOpenDropdown(null);
                                      }}
                                      className="py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                      {child.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Right column: Bespoke, Infrastructure, APIs */}
                        <div className="flex flex-col">
                          {items.filter(item => !item.children).map((item) => (
                            <button
                              key={item.label}
                              onClick={() => {
                                onTabChange(item.tab || tab, item.section);
                                setOpenDropdown(null);
                              }}
                              className="flex flex-col gap-1 rounded-md px-4 py-3 text-left transition-colors hover:bg-secondary"
                            >
                              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
                                {item.label}
                              </span>
                              {item.desc && (
                                <span className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                                  {item.desc}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Contact CTA */}
        <a
          href="mailto:contact@apexe3.com"
          className="hidden items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:flex"
        >
          Contact
          <ArrowRight className="h-3 w-3" />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const items = dropdowns[tab];
              const isExpanded = expandedMobile === tab;
              return (
                <div key={tab}>
                  <button
                    onClick={() => {
                      if (tab === "Home") {
                        onTabChange("Overview");
                        setMobileOpen(false);
                      } else if (items) {
                        setExpandedMobile(isExpanded ? null : tab);
                      } else {
                        onTabChange(tab as TabId);
                        setMobileOpen(false);
                      }
                    }}
                    className={cn(
                      "flex w-full items-center justify-between py-2.5 text-left font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                      (tab === "Home" && activeTab === "Overview") ||
                      (tab === "Solutions" && ["ALICE", "Custom Workflows", "Infrastructure", "Solutions"].includes(activeTab)) ||
                      activeTab === tab
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {items && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    )}
                  </button>
                  {items && isExpanded && (
                    <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-border pl-4">
                      {items.map((item) => (
                        <div key={item.label}>
                          <button
                            onClick={() => {
                              onTabChange(item.tab || tab, item.section);
                              setMobileOpen(false);
                            }}
                            className="py-2 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {item.label}
                          </button>
                          {item.children && (
                            <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                              {item.children.map((child) => (
                                <button
                                  key={child.label}
                                  onClick={() => {
                                    onTabChange(child.tab, child.section);
                                    setMobileOpen(false);
                                  }}
                                  className="py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href="mailto:contact@apexe3.com"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground"
            >
              Contact <ArrowRight className="h-3 w-3" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TabNavigation;
