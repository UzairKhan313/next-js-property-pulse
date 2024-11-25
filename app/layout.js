import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find the your dream rental property at your dream places. ",
  keywords: "rentals, find rentals, find properties",
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>;
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
