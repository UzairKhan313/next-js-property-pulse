import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="max-w-7xl  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            bgColor="bg-gray-100"
            buttonInfo={{
              link: "/properties",
              text: "Browse Properites",
              bgColor: "bg-black",
            }}
          />
          <InfoBox
            heading="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an airbnb or long term."
            bgColor="bg-blue-100"
            buttonInfo={{
              link: "/properties/add",
              text: "Add Property",
              bgColor: "bg-blue-500",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
