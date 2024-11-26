import React from "react";

import properties from "@/properties.json";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const RecentProperties = () => {
  const recentProperites = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:max-w-7xl m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperites.length === 0 ? (
              <p>No Recent Properties Available</p>
            ) : (
              recentProperites.map((item) => (
                <PropertyCard key={item._id} property={item} />
              ))
            )}
          </div>
        </div>
      </section>
      <section class="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default RecentProperties;
