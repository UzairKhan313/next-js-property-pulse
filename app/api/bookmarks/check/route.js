import connectdb from "@/config/database";
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

    await user.save();
    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
};
