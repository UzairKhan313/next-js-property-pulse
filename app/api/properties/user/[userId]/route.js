import connectdb from "@/config/database";
import Property from "@/Models/property";

// GET /api/user/userId
export const GET = async (req, { params }) => {
  const { userId } = await params;
  try {
    if (!userId) {
      return new Response("User id is required", { status: 400 });
    }
    connectdb();

    const properties = await Property.find({ owner: userId });
    if (!properties.length === 0) {
      return [];
      //   new Response("Properties Not Found! for this user.", { status: 404 });
    }
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
