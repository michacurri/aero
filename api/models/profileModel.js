const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
// const workorderModel = require("./workorderModel");

//___ profileSchema
// contact:     contactSchema
// workorder:   workorderSchema

const profileSchema = new Schema(
  {
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 11,
      match: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    },
    workorders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workorder",
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

profileSchema.pre("save", async function (next) {
  const profile = this;
  try {
    if (profile.isModified("password") || profile.isNew) {
      const hashedPassword = await bcrypt.hash(profile.password, 12);
      profile.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

profileSchema.methods.comparePasswords = function (password) {
  const profile = this;
  return bcrypt.compare(password, profile.password);
};

module.exports = mongoose.model("Profile", profileSchema);
