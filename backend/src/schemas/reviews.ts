import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  animalId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const ReviewModel = mongoose.model("review", reviewSchema);
