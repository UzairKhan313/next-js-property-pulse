import { getSessionUser } from "@/utils/session";

import connectdb from "@/config/database";
import Property from "@/Models/property";
import cloudinary from "@/config/cloudinary";

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

// POST /api/properties.
export const POST = async (req) => {
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
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

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

    // Upload our images to the cloudinary.
    let imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to the base 64.
      const imageBase64 = imageData.toString("base64");

      // Make request to upload image to cloudinary.
      console.log(cloudinary);

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        }
      );
      imageUploadPromises.push(result.secure_url);
      // wait for all images to upload.
      const uploadedImages = await Promise.all(imageUploadPromises);
      // add uploaded image to the property data.
      propertyData.images = uploadedImages;
    }

    // Creating Properties.
    const property = await Property.create(propertyData);

    // redirect client to the property detail page.
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${property._id}`
    );
    // Sending response.
    // return new Response(
    //   JSON.stringify({ message: "Property added successfully." }),
    //   { status: 200 }
    // );
  } catch (error) {
    console.log(error);
    return new Response("Faild to add property", { status: 500 });
  }
};
