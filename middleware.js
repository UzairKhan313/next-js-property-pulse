// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Specify the login page
  },
});

export const config = {
  matcher: ["/properties/add", "/properties/saved", "/profile", "/messages"], // url that we want to protect.
};
