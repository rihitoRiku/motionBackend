import mongoose, { Schema } from "mongoose";

const emailRegesPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const spaceRegesPattern = /\s/;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          return emailRegesPattern.test(value);
        },
        message: "Please enter a valid email address",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    nickname: {
      type: String,
      maxLength: [15, "Nickname must be less than 20 characters"],
      validate: {
        validator: function (value) {
          return !spaceRegesPattern.test(value);
        },
        message: "Nickname must not contain spaces",
      },
    },
    role: {
      type: String,
      default: "user",
    },
    room: {
      type: String,
    },
    status: {
      type: String,
    },
    pict_url: {
      type: String,
    },
    challenge_point: {
      type: Number,
    },
    qualification: {
      type: String,
    },
    admin_room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    is_doing_challenge: {
      type: String,
      enum: ["pretest", "posttest", "practice", "structure", "written", "free"],
    },
    pretest_done: {
      type: Boolean,
    },
    posttest_done: {
      type: Boolean,
    },
    pretest_score: {
      type: Number,
    },
    posttest_score: {
      type: Number,
    },
    star_collected: {
      type: Number,
    },
    simulation_count: {
      type: Number,
    },
    practice_count: {
      type: Number,
    },
    modules_completed: {
      type: [Boolean],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    achievement: {
      type: [Boolean],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const pictAPI = [
    "Tinkerbell",
    "Peanut",
    "Sammy",
    "Rascal",
    "Mimi",
    "Bandit",
    "Charlie",
    "Lucky",
    "Snowball",
    "Boots",
    "Lucy",
    "Jasmine",
    "Pepper",
    "Sasha",
    "Trouble",
  ];
  // Selecting a random element from pictAPI
  const randomIndex = Math.floor(Math.random() * pictAPI.length);
  const randomPict = pictAPI[randomIndex];

  if (!this.isNew) {
    return next();
  }

  this.pict_url = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${randomPict}`;
  next();
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
