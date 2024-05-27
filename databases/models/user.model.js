import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      lowercase: true,
      minLength: [2, "name is too short"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      minLength: 1,
      unique: [true, "email is unique"],
    },
    password: {
      type: String,
      required: [true, "email is required"],
      minLength: [6, 'minLength 6 characters'],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    profilePic: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        
      },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
