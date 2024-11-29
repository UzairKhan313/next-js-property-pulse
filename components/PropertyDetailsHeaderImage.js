import Image from "next/image";
import React from "react";

const PropertyDetailsHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/images/properties/${image}`}
            alt="property-pulse"
            className="object-cover h-[400px] w-full"
            width={200}
            height={200}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsHeaderImage;
