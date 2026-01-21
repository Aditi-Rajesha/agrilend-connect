import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AadharVerification from "./pages/AadharVerification";
import CreditCheck from "./pages/CreditCheck";
import LandVerification from "./pages/LandVerification";
import CropSelection from "./pages/CropSelection";
import LoanCalculation from "./pages/LoanCalculation";
import LoanApplication from "./pages/LoanApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/aadhar" element={<AadharVerification />} />
              <Route path="/credit" element={<CreditCheck />} />
              <Route path="/land" element={<LandVerification />} />
              <Route path="/crop" element={<CropSelection />} />
              <Route path="/calculate" element={<LoanCalculation />} />
              <Route path="/apply" element={<LoanApplication />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
