import { motion } from "framer-motion";

const ArchitectureDiagram = () => {
  const rawDataItems = ["Numerical", "Textual", "Relationship", "Custom"];
  const storageItems = ["Index", "Time Series\nData Store", "Vector DB", "Data Cache"];
  const processingItems = [
    "A.I. Agent\nService",
    "Private RAG\nService",
    "Multi-Model\nInference Service",
    "Model Fine\nTuning Service",
    "Data Structuring\nService",
    "Custom Logic\nService",
  ];
  const networkItems = [
    "GUI\nGateway",
    "GQL/\nWebSocket",
    "Chatbot\nGateway",
    "Custom\nGateway",
    "Mobile\nGateway",
    "Query\nContainer",
  ];
  const clientItems = ["Web", "Chatbot", "Custom", "Mobile", "Query", "Desktop"];

  // Site-aligned colors
  const teal = "hsl(174, 42%, 45%)";
  const tealDim = "hsl(174, 42%, 32%)";
  const accentMuted = "hsl(174, 30%, 22%)";
  const darkCard = "hsl(0, 0%, 10%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="border-b border-border py-16 px-4 md:px-8 overflow-x-auto"
    >
      {/* Top phase labels */}
      <div className="mb-8 grid grid-cols-[1fr_2fr_2fr] gap-4 min-w-[900px]">
        <div className="text-center">
          <span
            className="inline-block rounded-full px-5 py-1.5 font-mono text-xs font-medium"
            style={{ backgroundColor: teal, color: "hsl(0,0%,4%)" }}
          >
            Ingest
          </span>
        </div>
        <div className="text-center">
          <span
            className="inline-block rounded-full px-5 py-1.5 font-mono text-xs font-medium"
            style={{ backgroundColor: teal, color: "hsl(0,0%,4%)" }}
          >
            Analyse
          </span>
        </div>
        <div className="text-center">
          <span
            className="inline-block rounded-full px-5 py-1.5 font-mono text-xs font-medium"
            style={{ backgroundColor: tealDim, color: "hsl(0,0%,90%)" }}
          >
            Distribute
          </span>
        </div>
      </div>

      {/* Main architecture flow */}
      <div className="flex items-stretch gap-3 min-w-[900px]">
        {/* INGEST: Raw Data + Transform */}
        <div className="flex items-stretch gap-3" style={{ flex: "1" }}>
          <div className="flex-1 rounded-lg border border-primary/30 p-4">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-primary/70">
              Raw Data
            </div>
            <div className="flex flex-col gap-2">
              {rawDataItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2.5 text-center font-mono text-xs font-medium"
                  style={{ backgroundColor: teal, color: "hsl(0,0%,4%)" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-1">
            <span className="text-sm text-primary/40">→</span>
            <div
              className="rounded-md px-3 py-2 font-mono text-[10px] font-medium"
              style={{ backgroundColor: teal, color: "hsl(0,0%,4%)" }}
            >
              Transform
            </div>
            <span className="text-sm text-primary/40">→</span>
          </div>
        </div>

        {/* ANALYSE: Data Storage + Processing */}
        <div className="flex items-stretch gap-3" style={{ flex: "2" }}>
          <div className="flex-1 rounded-lg border border-border p-4">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Data Storage Layer
            </div>
            <div className="flex flex-col gap-2">
              {storageItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2.5 text-center font-mono text-xs text-foreground/80 whitespace-pre-line"
                  style={{ backgroundColor: darkCard }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center px-1">
            <span className="font-mono text-sm text-muted-foreground/40">⇄</span>
          </div>

          <div className="flex-1 rounded-lg border border-primary/20 border-dashed p-4">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-primary/60">
              Processing Layer
            </div>
            <div className="flex flex-col gap-2">
              {processingItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2.5 text-center font-mono text-[10px] text-foreground/90 whitespace-pre-line"
                  style={{ backgroundColor: accentMuted }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bidirectional arrow */}
        <div className="flex items-center px-1">
          <span className="font-mono text-sm text-muted-foreground/40">⇄</span>
        </div>

        {/* DISTRIBUTE: Network API + Clients */}
        <div className="flex items-stretch gap-3" style={{ flex: "2" }}>
          <div className="flex-1 rounded-lg border border-primary/20 border-dashed p-4">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-primary/60">
              Network API Layer
            </div>
            <div className="flex flex-col gap-2">
              {networkItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2.5 text-center font-mono text-[10px] text-foreground/90 whitespace-pre-line"
                  style={{ backgroundColor: accentMuted }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center px-1">
            <span className="font-mono text-sm text-muted-foreground/40">→</span>
          </div>

          <div className="flex-1 rounded-lg border border-primary/20 p-4">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-primary/60">
              Clients
            </div>
            <div className="flex flex-col gap-2">
              {clientItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md px-3 py-2.5 text-center font-mono text-xs font-medium"
                  style={{ backgroundColor: tealDim, color: "hsl(0,0%,90%)" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Layer label */}
      <div className="mt-4 flex justify-end min-w-[900px]" style={{ paddingRight: "12%" }}>
        <span
          className="rounded-md px-4 py-1 font-mono text-[10px] text-muted-foreground"
          style={{ backgroundColor: darkCard }}
        >
          Application Layer
        </span>
      </div>

      {/* Maintained By Apex */}
      <div className="mt-8 text-center min-w-[900px]">
        <div className="mx-auto mb-4 h-px w-[80%] bg-primary/20" />
        <span
          className="inline-block rounded-full px-6 py-1.5 font-mono text-xs font-medium"
          style={{ backgroundColor: teal, color: "hsl(0,0%,4%)" }}
        >
          Maintained By Apex
        </span>
      </div>
    </motion.div>
  );
};

export default ArchitectureDiagram;
