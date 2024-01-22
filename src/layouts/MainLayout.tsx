import {
  Header,
  MobileNavigation,
  SideNavigation,
} from "@/components/layout-components";
import { Toaster } from "@/components/ui/toaster";
import NavigationContextProvider from "@/contexts/NavigationContext";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function MainLayout() {
  return (
    <NavigationContextProvider>
      <div>
        <MobileNavigation />
        <div className="w-full md:flex">
          <SideNavigation />
          <div className="flex-1 w-full max-w-[1440px] md:flex-auto">
            <Header />
            <div className="min-h-screen">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <Toaster />
    </NavigationContextProvider>
  );
}
