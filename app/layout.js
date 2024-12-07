import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlobalContextProvider } from "@/context/GlobalMessageCtx";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find the your dream rental property at your dream places. ",
  keywords: "rentals, find rentals, find properties",
};
const MainLayout = ({ children }) => {
  return (
    <GlobalContextProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>;
            <Footer />
            <ToastContainer position="top-center" />
          </body>
        </html>
      </AuthProvider>
    </GlobalContextProvider>
  );
};

export default MainLayout;
