import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already registered. Please pick another one."],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    image: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const User = models.user || model("User", UserSchema);

export default User;
