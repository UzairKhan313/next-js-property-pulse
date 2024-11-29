import connectdb from "@/config/database";
import Property from "@/Models/property";

// GET /api/properties
export const GET = async (req) => {
  try {
    connectdb();
    const properites = await Property.find({}); // All Properties.
    return new Response(JSON.stringify(properites), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
