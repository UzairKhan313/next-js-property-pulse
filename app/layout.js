import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find the your dream rental property at your dream places. ",
  keywords: "rentals, find rentals, find properties",
};
const MainLayout = ({ children }) => {
  return (
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
  );
};

export default MainLayout;
