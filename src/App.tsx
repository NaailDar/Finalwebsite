import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/alice" element={<Index />} />
            <Route path="/solutions" element={<Index />} />
            <Route path="/solutions/:section" element={<Index />} />
            <Route path="/bespoke-workflows" element={<Index />} />
            <Route path="/infrastructure" element={<Index />} />
            <Route path="/apis-data-layer" element={<Index />} />
            <Route path="/security" element={<Index />} />
            <Route path="/insights" element={<Index />} />
            <Route path="/company" element={<Index />} />
            <Route path="/company/:section" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
