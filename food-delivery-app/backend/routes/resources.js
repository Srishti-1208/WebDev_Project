const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// @route   POST /api/resources
// @desc    Upload a new resource
// @access  Private
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // Parse tags if they're sent as a string
    let tags = [];
    if (req.body.tags) {
      if (typeof req.body.tags === 'string') {
        tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(req.body.tags)) {
        tags = req.body.tags;
      }
    }

    // Create resource object
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      subject: req.body.subject,
      grade: req.body.grade,
      board: req.body.board,
      author: req.body.author,
      tags: tags,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      uploadedBy: req.user.id
    });

    await resource.save();

    res.status(201).json({
      success: true,
      message: 'Resource uploaded successfully',
      data: resource
    });

  } catch (error) {
    // If there's an error, delete the uploaded file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/resources
// @desc    Get all resources with filtering and search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, subject, grade, board, search, page = 1, limit = 10 } = req.query;

    // Build query
    let query = {};

    if (category) query.category = category;
    if (subject) query.subject = subject;
    if (grade) query.grade = grade;
    if (board) query.board = board;

    // Add text search if search parameter exists
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const resources = await Resource.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Resource.countDocuments(query);

    res.json({
      success: true,
      data: resources,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/resources/:id
// @desc    Get single resource by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment views
    resource.views += 1;
    await resource.save();

    res.json({
      success: true,
      data: resource
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/resources/:id/download
// @desc    Download a resource file
// @access  Public
router.get('/:id/download', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if file exists
    if (!fs.existsSync(resource.file.path)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Increment downloads
    resource.downloads += 1;
    await resource.save();

    // Send file
    res.download(resource.file.path, resource.file.originalName);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   DELETE /api/resources/:id
// @desc    Delete a resource
// @access  Private (only resource owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Check if user is the owner or admin
    if (resource.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resource'
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(resource.file.path)) {
      fs.unlinkSync(resource.file.path);
    }

    // Delete resource from database
    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;