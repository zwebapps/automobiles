import mongoose from 'mongoose';

const SocialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data : {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Social || mongoose.model('Social', SocialSchema);