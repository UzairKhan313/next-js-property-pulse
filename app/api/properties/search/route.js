import connectdb from "@/config/database";
import Property from "@/Models/property";

// GET /api/properties/search
export const GET = async (req) => {
  try {
    connectdb();
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattren = new RegExp(location, "i"); // New Regular expression. i for case sensitivity.

    // For the database query.
    let query = {
      $or: [
        { name: locationPattren },
        { description: locationPattren },
        { "location.street": locationPattren },
        { "location.city": locationPattren },
        { "location.state": locationPattren },
        { "location.zipcode": locationPattren },
      ],
    };

    // when propertyType is not type of All.
    if (propertyType && propertyType.toLowerCase() !== "all") {
      const propertyTypePattren = new RegExp(propertyType, "i"); // New Regular expression. i for case sensitivity.
      query.type = propertyTypePattren;
    }

    const properties = await Property.find(query); // Filter properties Properties.

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
