import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse | Find the perfect rental",
  description: "Find the your dream rental property at your dream places. ",
  keywords: "rentals, find rentals, find properties",
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div>{children}</div>;
      </body>
    </html>
  );
};

export default MainLayout;
