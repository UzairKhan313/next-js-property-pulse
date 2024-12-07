"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import LoadingSpinner from "./LoadingSpinner";

const Properties = () => {
  const [properties, setProperties] = useState();
  const [loading, setLoading] = useState(true);
  // sort by date.

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          throw new Error("Failed to fetch Properties.");
        }
        const data = await res.json();
        setProperties(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:max-w-7xl m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Property found!.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
