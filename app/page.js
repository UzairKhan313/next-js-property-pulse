import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import React from "react";

export const metadata = {
  title: "Property Pulse | Home",
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
    </>
  );
};

export default HomePage;
