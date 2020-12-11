const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const workorderSchema = require("./workorderSchema");

//___ profileSchema
// contact:     contactSchema
// workorder:   workorderSchema

const profileSchema = new Schema(
  {
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
    },
    email: {
      type: String,
      required: true,   
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    OAuthUid: Number,
    workorder: [workorderSchema],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

profileSchema.pre("save", async function (next) {
  const profile = this;
  console.log(profile);
  console.log(profile.password);
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
