import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import RecentProperties from "@/components/RecentProperties";
import React from "react";

export const metadata = {
  title: "Property Pulse | Home",
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <RecentProperties />
    </>
  );
};

export default HomePage;
