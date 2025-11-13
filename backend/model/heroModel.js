import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
  },
  {
    timestamps: true, // Enables `createdAt` and `updatedAt` fields
  }
);

const Hero = mongoose.model('Hero', heroSchema);

export default Hero;
