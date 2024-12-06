import connectdb from "@/config/database";
import Message from "@/Models/message";
import { getSessionUser } from "@/utils/session";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async (req) => {
  try {
    connectdb();

    // extracting user id from the session.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to sent message." }),
        {
          status: 401,
        }
      );
    }
    const { userId } = sessionUser;

    // Get read Messages.
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "name")
      .populate("property", "name");

    // get unread messages and sort it.
    const unReadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name")
      .populate("property", "name");

    const messages = [...unReadMessages, ...readMessages];
    // Sending response.
    return new Response(JSON.stringify({ messages }), { status: 200 });
  } catch (error) {
    console.log("Faild to fetch Message", error);
    return new Response("Faild to fetch Message", { status: 500 });
  }
};

// POST /api/messages.
export const POST = async (req) => {
  try {
    connectdb();
    const { name, email, phone, message, recipient, property } =
      await req.json();

    // extracting user id from the session.
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to sent message." }),
        {
          status: 401,
        }
      );
    }
    const { user } = sessionUser;

    // con't sent message to your self.
    if (recipient.toString() === user.id.toString()) {
      return new Response(
        JSON.stringify({ message: "Cannot sent message to your own." }),
        { status: 400 }
      );
    }
    const newMsg = new Message({
      sender: user.id,
      recipient,
      property,
      body: message,
      phone,
      email,
      name,
    });

    await newMsg.save();
    // Sending response.
    return new Response(
      JSON.stringify({ message: "Message sent successfully." }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Faild to sent Message", error);
    return new Response("Faild to sent Message", { status: 500 });
  }
};
