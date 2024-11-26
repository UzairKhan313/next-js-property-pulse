import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";

const ProperitesPage = () => {
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

export default ProperitesPage;
