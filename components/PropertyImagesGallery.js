import React from "react";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImageGallery = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  alt="property-pulse"
                  width={200}
                  height={200}
                  priority={true}
                  sizes="100vw"
                />
              )}
            </Item>
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
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        className="object-cover h-[400px] w-full rounded-xl"
                        width={200}
                        height={200}
                        priority={true}
                        alt="property-pulse"
                        sizes="100vw"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImageGallery;
