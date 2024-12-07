import connectdb from "@/config/database";
import Property from "@/Models/property";

// GET /api/properties/featured
export const GET = async (req) => {
  try {
    connectdb();
    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
