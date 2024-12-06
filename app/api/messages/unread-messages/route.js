import connectDB from "@/config/database";
import Message from "@/Models/message";

import { getSessionUser } from "@/utils/session";

export const dynamic = "force-dynamic";

// PUT /api/messages/unread-messages
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const unReadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unReadMessageCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
