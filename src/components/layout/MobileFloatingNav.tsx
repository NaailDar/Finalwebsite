import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Shield, Lightbulb, Building2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { dropdowns } from "@/components/apex/TabNavigation";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  hasDropdown?: boolean;
}

const mainNavItems: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Solutions", path: "/solutions", icon: Layers, hasDropdown: true },
  { label: "Security", path: "/security", icon: Shield },
  { label: "Insights", path: "/insights", icon: Lightbulb },
  { label: "Company", path: "/company", icon: Building2 },
];

const itemPositions = [
  { x: -72, y: 0 },
  { x: 0, y: -72 },
  { x: -72, y: -72 },
  { x: 0, y: -144 },
  { x: -72, y: -144 },
];

const subItemPositions = [
  { x: -72, y: 0 },
  { x: 0, y: -72 },
  { x: -72, y: -72 },
  { x: 0, y: -144 },
];

const backButtonPosition = { x: -72, y: -144 };

const MobileFloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const resetTimer = useCallback(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
      setActiveDropdown(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const cleanup = resetTimer();
      return cleanup;
    }
  }, [isOpen, resetTimer]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleItemClick = (item: NavItem) => {
    if (item.hasDropdown && dropdowns[item.label]) {
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else {
      setIsOpen(false);
    }
  };

  const handleBack = () => {
    setActiveDropdown(null);
  };

  const currentDropdownItems = activeDropdown ? dropdowns[activeDropdown] : null;
  const activeDropdownData = mainNavItems.find(item => item.label === activeDropdown);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-[400px]:flex hidden">
      <AnimatePresence>
        {isOpen && !activeDropdown && (
          <>
            {mainNavItems.map((item, index) => {
              const Icon = item.icon;
              const pos = itemPositions[index] || { x: 0, y: -70 };
              const isActive =
                (item.path === "/" && location.pathname === "/") ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    delay: index * 0.03 
                  }}
                  className="absolute"
                >
                  {item.hasDropdown ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary shadow-lg transition-all active:scale-95",
                        isActive 
                          ? "border-primary bg-primary" 
                          : "hover:bg-primary/90"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", "text-primary-foreground")} />
                      <span className={cn(
                        "font-mono text-[9px] font-medium uppercase tracking-[0.05em]",
                        "text-primary-foreground"
                      )}>
                        {item.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary shadow-lg transition-all active:scale-95",
                        isActive 
                          ? "border-primary bg-primary" 
                          : "hover:bg-primary/90"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", "text-primary-foreground")} />
                      <span className={cn(
                        "font-mono text-[9px] font-medium uppercase tracking-[0.05em]",
                        "text-primary-foreground"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </>
        )}

        {isOpen && activeDropdown && currentDropdownItems && activeDropdownData && (
          <>
            {currentDropdownItems.slice(0, 4).map((item, index) => {
              const pos = subItemPositions[index] || { x: 0, y: -64 };
              const itemPath = item.path || "/";
              const isActive = location.pathname.startsWith(itemPath);

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    delay: index * 0.03 
                  }}
                  className="absolute"
                >
                  <Link
                    to={itemPath}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveDropdown(null);
                    }}
                    className={cn(
                      "flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary shadow-lg transition-all active:scale-95",
                      isActive 
                        ? "border-primary bg-primary" 
                        : "hover:bg-primary/90"
                    )}
                    style={{ wordBreak: 'break-word' }}
                  >
                    <span className={cn(
                      "font-mono text-[8px] font-medium uppercase tracking-[0.03em] text-center leading-[1.3] px-1 text-primary-foreground",
                      isActive ? "text-primary-foreground" : "text-primary-foreground/90"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              key="back-button"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, x: backButtonPosition.x, y: backButtonPosition.y, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute"
            >
              <button
                onClick={handleBack}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary shadow-lg transition-all active:scale-95 hover:bg-primary/90"
              >
                <ChevronLeft className="h-5 w-5 text-primary-foreground" />
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.05em] text-primary-foreground">
                  Back
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          if (activeDropdown) {
            setActiveDropdown(null);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-colors",
          isOpen 
            ? "bg-primary border-2 border-primary" 
            : "bg-primary border-2 border-primary"
        )}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="pulse"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl bg-primary"
            />
          )}
        </AnimatePresence>
        <motion.svg
          key={isOpen ? "close" : "open"}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? "currentColor" : "currentColor"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={isOpen ? "text-foreground" : "text-primary-foreground"}
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M12 5v14M5 12h14" />
          )}
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default MobileFloatingNav;
