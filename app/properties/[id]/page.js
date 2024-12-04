"use client";

import BookmarkButton from "@/components/BookmarkButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyDetailsHeaderImage from "@/components/PropertyDetailsHeaderImage";
import PropertyImageGallery from "@/components/PropertyImagesGallery";
import SharedButton from "@/components/SharedButton";
import { fetchSingleProperty } from "@/utils/request";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSinglePropertyData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const property = await fetchSingleProperty(id);

        setProperty(property);
      } catch (error) {
        console.log("Fetchin single property error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (property === null) {
      fetchSinglePropertyData();
    }
  }, [id, property]);

  if (!property && !isLoading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not found!
      </h1>
    );
  }
  return (
    <>
      {isLoading && <LoadingSpinner loading={isLoading} />}
      {!isLoading && property && (
        <>
          <PropertyDetailsHeaderImage image={property.images[0]} />
          <section>
            <div className="max-w-7xl m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="max-w-7xl m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <SharedButton property={property} />

                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImageGallery images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
