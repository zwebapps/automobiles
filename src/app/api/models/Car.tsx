import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  model: { type: String },
  price: { type: Number },
  year: { type: Number },
  color: { type: String },
  description: { type: mongoose.Schema.Types.Mixed }, // JSON object
  mainImage: { type: String },
  galleryImages: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Car || mongoose.model('Car', CarSchema); 