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
      new Response("UnAuthorized to access the resource.", { status: 401 });

    await property.deleteOne();
    return new Response("Property deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!.", { status: 500 });
  }
};

// PUT for updating the property /api/properties/:pid.
export const PUT = async (req, { params }) => {
  const { pid } = await params;
  try {
    connectdb();

    // extracting user id from the session.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("UnAuthorized, User Id is required.", {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const formData = await req.formData();

    // access all values of amenities and images form request.
    const amenities = formData.getAll("amenities");
    // Get Existing property to update.
    const existingProperty = await Property.findById(pid);
    if (!existingProperty) {
      return new Response("Property does not exist.", { status: 404 });
    }
    // Verifying the ownership of the property.
    if (existingProperty.owner.toString() !== userId)
      new Response("UnAuthorized to access the resource.", { status: 401 });

    // Create property data object for the databae.
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
        name: formData.get("seller_info.name"),
      },
      owner: userId,
    };

    // Updating Properties.
    const updatedProperty = await Property.findByIdAndUpdate(pid, propertyData);

    // redirect client to the property detail page.
    return new Response(
      JSON.stringify({
        message: "Property updated successfully.",
        updatedProperty,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response("Faild to add property", { status: 500 });
  }
};
