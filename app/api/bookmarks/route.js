import connectdb from "@/config/database";
import Property from "@/Models/property";
import User from "@/Models/user";
import { getSessionUser } from "@/utils/session";

export const dynamic = "force-dynamic";

// POST /api/bookmarks
export const POST = async (req) => {
  try {
    await connectdb();
    const { propertyId } = await req.json();
    // extracting user id from the session.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("UnAuthorized, User Id is required.", {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    // Find User in the database.
    const user = await User.findById(userId);

    // if Already bookmarked.
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;
    if (isBookmarked) {
      // if Already bookmarked remove it from the Array.
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully.";
      isBookmarked = false;
    } else {
      // if not add to the list.
      user.bookmarks.push(propertyId);
      message = "Bookmark addedd successfully.";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};

// GET /api/bookmarks getting all saved properties.
export const GET = async (req) => {
  try {
    await connectdb();
    // extracting user id from the session.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("UnAuthorized, User Id is required.", {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    // Find User in the database.
    const user = await User.findById(userId);

    // Looking for Boomarks which is the Array of the  user.bookmarks  which have all the ids of the properties that match with property Id in the property model.
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
