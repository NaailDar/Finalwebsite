import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layers = [
  {
    id: "01",
    title: "Data Ingestion & Connectivity",
    summary: "Data-agnostic ingestion across institutional and alternative datasets",
    bullets: [
      "PDFs, Excel, APIs, market data, internal systems",
      "Alt data (transcripts, web, research)",
      "Real-time + batch pipelines",
      "Secure private connectors",
    ],
    detail:
      "The ingestion layer connects to any internal or external dataset — including market data, research, and alternative sources — through secure, enterprise-grade connectors designed for institutional environments and data sovereignty.",
  },
  {
    id: "02",
    title: "Data Processing & Structuring",
    summary: "Financial-aware parsing, enrichment, and standardisation of complex datasets",
    bullets: [
      "Intelligent chunking for financial docs",
      "Table & numerical extraction",
      "Entity recognition (tickers, issuers, instruments)",
      "Data validation & enrichment",
    ],
    detail:
      "Data is parsed and enriched with financial context — identifying entities, extracting structured tables, and standardising formats — transforming fragmented inputs into analysis-ready datasets.",
  },
  {
    id: "03",
    title: "Vectorisation & Indexing",
    summary: "Private, scalable knowledge infrastructure for financial data",
    bullets: [
      "Private vector database (client-specific)",
      "Cross-document + cross-dataset indexing",
      "Hybrid retrieval (semantic + keyword)",
      "Continuous re-indexing pipelines",
    ],
    detail:
      "All data is indexed into private, client-specific knowledge bases, enabling secure, cross-document querying and retrieval across research, market data, and internal systems.",
  },
  {
    id: "04",
    title: "AI Models & Reasoning Engine",
    summary: "Multi-model financial reasoning with full explainability and control",
    bullets: [
      "Multi-LLM orchestration (task-specific routing)",
      "Private / hosted models (no data leakage)",
      "Retrieval-augmented generation (RAG)",
      "Full citation + audit trails",
    ],
    detail:
      "The reasoning engine dynamically selects and orchestrates models based on task and data context, delivering grounded, explainable outputs with full traceability — built for regulated financial environments.",
  },
  {
    id: "05",
    title: "Agentic Workflow Engine",
    summary: "AI agents executing financial workflows with embedded business logic",
    bullets: [
      "Natural language → SQL / analytics agents",
      "Multi-step financial workflows",
      "Conditional logic + task routing",
      "Human-in-the-loop controls",
      "Cross-system execution",
    ],
    detail:
      "Agents act as intelligent microservices, translating user intent into structured actions — from querying datasets to executing multi-step analysis — with embedded control logic and full auditability.",
  },
  {
    id: "06",
    title: "Financial Intelligence Applications",
    summary: "Modular, domain-specific applications for capital markets workflows",
    bullets: [
      "Document Intelligence (earnings, filings, research)",
      "Portfolio analytics & optimisation",
      "Credit & fixed income analysis",
      "Backtesting & strategy modelling",
      "Charting & data visualisation",
    ],
    detail:
      "Purpose-built applications sit on top of the full stack, enabling users to move from raw data to actionable insight across equities, credit, macro, and multi-asset strategies — all within a unified environment.",
  },
  {
    id: "07",
    title: "User Interface & Integration Layer",
    summary: "Flexible delivery across chat, voice, and embedded workflows",
    bullets: [
      "Natural language interface (ALICE)",
      "Voice & audio interaction",
      "Dashboards & visual outputs",
      "API / SDK integration",
      "Role-based access & permissions",
    ],
    detail:
      "ALICE provides a unified interface across chat, voice, and visual layers, while APIs and embedded components allow seamless integration into existing institutional workflows and systems.",
  },
];

const AIStackDiagram = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="border-b border-border py-20 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
          Full AI Stack
        </p>
        <p className="mx-auto max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
          APEX:E3 transforms fragmented data into structured, explainable, and
          actionable intelligence through a fully integrated AI stack.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-3xl">

        {/* Layers */}
        <div className="relative flex flex-col gap-1">
          {layers.map((layer, i) => {
            const isFirst = i === 0;
            const isLast = i === layers.length - 1;
            const isExpanded = expandedId === layer.id;

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => toggle(layer.id)}
                  className={`group w-full text-left transition-all duration-300 border border-primary/10 px-5 py-4 md:px-6 md:py-5 ${
                    isFirst ? "rounded-t-2xl" : ""
                  } ${isLast ? "rounded-b-2xl" : ""} ${
                    isExpanded
                      ? "bg-primary/5 border-primary/30 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]"
                      : "bg-card/50 hover:bg-card/80 hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="shrink-0 font-mono text-[10px] font-medium text-primary/50 w-5">
                      {layer.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm font-medium text-foreground">
                        {layer.title}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-muted-foreground truncate">
                        {layer.summary}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 font-mono text-xs text-primary/40 transition-transform duration-200 ${
                        isExpanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-x border-b border-primary/15 bg-primary/[0.03] px-5 py-5 md:px-6 md:pl-16">
                        <ul className="space-y-2 mb-3">
                          {layer.bullets.map((b) => (
                            <li
                              key={b}
                              className="font-mono text-xs text-foreground/70 flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                          {layer.detail}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AIStackDiagram;
