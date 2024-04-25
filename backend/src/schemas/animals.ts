import mongoose from "mongoose";

const animalsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image:{type:String,required:true},
  details: { type: String, required: true },
  location: { type: String, required: true },
  foods: { type: String, required: true },
  description: { type: String, required: true },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
});

export const animalModel = mongoose.model("animal", animalsSchema);
