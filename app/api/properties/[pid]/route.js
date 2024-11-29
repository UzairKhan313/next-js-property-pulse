import connectdb from "@/config/database";
import Property from "@/Models/property";

// GET /api/properties/some property id
export const GET = async (req, { params }) => {
  const { pid } = await params;

  try {
    connectdb();
    const property = await Property.findById(pid);
    if (!property) new Response("Property Not Found!", { status: 404 });
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
