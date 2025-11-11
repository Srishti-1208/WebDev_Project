const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Notes', 'Question Papers', 'Reference Books', 'Syllabus', 'Other']
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    enum: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'History', 'Geography', 'Other']
  },
  grade: {
    type: String,
    required: [true, 'Please add a grade/class']
  },
  board: {
    type: String,
    required: [true, 'Please add a board'],
    enum: ['CBSE', 'ICSE', 'State Board', 'Other']
  },
  author: {
    type: String,
    required: [true, 'Please add author name']
  },
  tags: {
    type: [String],
    default: []
  },
  file: {
    filename: {
      type: String,
      required: [true, 'Please upload a file']
    },
    originalName: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    }
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes for better search performance
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Resource', resourceSchema);