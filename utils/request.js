const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    // Handle the case where the domain is not available yet.
    if (!apiDomain) return [];
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`
    );
    if (!res.ok) throw new Error("Oops! Faild to Fetch properties.");
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSingleProperty = async (id) => {
  try {
    // Handle the case where the domain is not available yet.
    if (!apiDomain) return null;
    const res = await fetch(`${apiDomain}/properties/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Oops! Faild to Fetch Single property.");
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
