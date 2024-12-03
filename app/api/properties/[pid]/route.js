import connectdb from "@/config/database";
import Property from "@/Models/property";
import { getSessionUser } from "@/utils/session";

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

// DELETE /api/properties/some property id
export const DELETE = async (req, { params }) => {
  const { pid: propertyId } = await params;

  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UnAuthorized, User Id is required.", {
        status: 401,
      });
    }
    connectdb();
    const { userId } = sessionUser;
    const property = await Property.findById(propertyId);
    if (!property) new Response("Property Not Found!", { status: 404 });

    // Verifying the ownership of the property.
    if (property.owner.toString() !== userId)
      console.log(property.owner.toString(), userId);

    new Response("UnAuthorized to access the resource.", { status: 401 });

    await property.deleteOne();
    return new Response("Property deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};
