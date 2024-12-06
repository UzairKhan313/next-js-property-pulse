import connectdb from "@/config/database";
import Message from "@/Models/message";
import { getSessionUser } from "@/utils/session";
export const dynamic = "force-dynamic";

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
