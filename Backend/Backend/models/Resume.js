import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"]
    },

    title: {
      type: String,
      required: [true, "Resume title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [50, "Title cannot be more than 50 characters"],
      default: "Untitled Resume"
    },

    public: {
      type: Boolean,
      default: false
    },

    template: {
      type: String,
      enum: {
        values: ["classic", "modern", "professional", "creative"],
        message: "Invalid template selected"
      },
      default: "classic"
    },

    accent_color: {
      type: String,
      match: [
        /^#([0-9A-F]{3}){1,2}$/i,
        "Accent color must be a valid hex code"
      ],
      default: "#3B82F6"
    },

    professional_summary: {
      type: String,
      maxlength: [500, "Summary cannot be more than 500 characters"],
      default: ""
    },

    skills: [{
      type: String,
      trim: true
    }],

    professional_info: {
      image: { type: String, default: "" },

     full_name: {
  type: String,
  trim: true,
  default: "",
  validate: {
    validator: function (v) {
      return !v || v.length >= 3;
    },
    message: "Full name must be at least 3 characters"
  }
},


      profession: { type: String, trim: true, default: "" },

      email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email"
        ],
        default: ""
      },

      phone: {
        type: String,
        match: [/^[0-9+\-()\s]{7,20}$/, "Please enter a valid phone number"],
        default: ""
      },

      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experience: [
      {
        company: {
          type: String,
          trim: true,
          required: [true, "Company name is required"]
        },
        position: {
          type: String,
          trim: true,
          required: [true, "Position is required"]
        },
        start_date: { type: String, required: true },
        end_date: { type: String },
        description: { type: String, maxlength: 1000 },
        is_current: { type: Boolean, default: false },
      },
    ],

    project: [
      {
        name: { type: String, trim: true },
        type: { type: String, trim: true },
        description: { type: String, maxlength: 500 },
      },
    ],

    education: [
      {
        institution: {
          type: String,
          required: [true, "Institution name is required"]
        },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gpa: { type: String },
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;
