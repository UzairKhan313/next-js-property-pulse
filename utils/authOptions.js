import GoogleProvider from "next-auth/providers/google";
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
      // 2. Check if user exist.
      // 3. if not, then add the user to the database.
      // 4. Return true to allow user sign in.
    },
    // Modifies the session object.
    async session({ session }) {
      // 1. Get the user from the database.
      // 2. Assign the user id to the session.
      // 3. Return that session.
    },
  },
};
