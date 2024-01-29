// models/message.js

import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
});


export default mongoose.models.Message || mongoose.model('Message', MessageSchema);

