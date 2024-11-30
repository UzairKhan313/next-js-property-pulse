import connectdb from "@/config/database";
import User from "@/Models/user";
import GoogleProvider from "next-auth/providers/google";
import { generatePassword } from "./password";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Allowing user to choose of the their google account evey time they logged in.
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invocked on successfull sign in.
    async signIn({ profile }) {
      // 1. Connect to the database.
      await connectdb();
      // 2. Check if user exist.
      const user = await User.findOne({ email: profile.email });
      // 3. if not, then add the user to the database.
      if (!user) {
        //  1. Trancate user name if it long.
        const username = profile.name.slice(0, 20);
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
          password: generatePassword(),
        });
      }
      // 4. Return true to allow user sign in.
      return true;
    },
    // Modifies the session object.
    async session({ session }) {
      // 1. Get the user from the database.
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session.
      session.user.id = user._id.toString();
      // 3. Return that session.
      return session;
    },
  },
};
