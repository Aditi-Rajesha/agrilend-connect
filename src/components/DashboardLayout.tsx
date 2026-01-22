import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { LanguageToggle } from "./LanguageToggle";
import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { farmerProfile } = useApp();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const displayName = language === "hi" ? farmerProfile.nameHi : farmerProfile.nameEn;

  const handleOpenProfile = () => {
    navigate("/profile-setup");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
            
            {/* ✅ Clickable Profile Area */}
            <button
              type="button"
              onClick={handleOpenProfile}
              className="flex items-center gap-3 text-left group"
              aria-label="Open profile"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <User className="w-5 h-5 text-primary" />
              </div>

              <div>
                <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                  {displayName || (language === "hi" ? "किसान" : "Farmer")}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-xs text-muted-foreground">+91 {farmerProfile.phone}</p>
              </div>
            </button>

            <LanguageToggle />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
