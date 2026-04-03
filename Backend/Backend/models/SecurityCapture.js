import mongoose from "mongoose";

const securityCaptureSchema = new mongoose.Schema({
  resumeId: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  screenshot: {
    type: String, // Base64 encoded image or URL to stored image
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  isSubmissionScreenshot: {
    type: Boolean,
    default: false,
  },
  screenshotOrder: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
securityCaptureSchema.index({ sessionId: 1, createdAt: -1 });
securityCaptureSchema.index({ resumeId: 1, createdAt: -1 });

const SecurityCapture = mongoose.model("SecurityCapture", securityCaptureSchema);

export default SecurityCapture;