import Image from "next/image";
import React from "react";

const PropertyImageGallery = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            className="object-cover h-[400px] mx-auto rounded-xl"
            alt="property-pulse"
            width={200}
            height={200}
            priority={true}
            sizes="100vw"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={200}
                  height={200}
                  priority={true}
                  alt="property-pulse"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImageGallery;
