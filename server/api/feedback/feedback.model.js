'use strict';

import mongoose from 'mongoose';

var FeedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String
});

export default mongoose.model('Feedback', FeedbackSchema);
