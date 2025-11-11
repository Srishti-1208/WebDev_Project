import { useState } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';

export default function UploadModal({ onClose, onUpload, categories, subjects }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Notes',
    subject: 'Mathematics',
    grade: '',
    board: 'CBSE',
    author: '',
    tags: ''
  });
  
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'image/jpeg', 
        'image/jpg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, and PNG files are allowed');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Please enter a description');
      return;
    }
    
    if (!formData.grade.trim()) {
      setError('Please enter a grade/class');
      return;
    }
    
    if (!formData.author.trim()) {
      setError('Please enter author name');
      return;
    }
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    
    try {
      // Create FormData - THIS IS THE KEY FIX!
      const uploadData = new FormData();
      
      // Append the actual file
      uploadData.append('file', file);
      
      // Append all form fields
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('category', formData.category);
      uploadData.append('subject', formData.subject);
      uploadData.append('grade', formData.grade);
      uploadData.append('board', formData.board);
      uploadData.append('author', formData.author);
      uploadData.append('tags', formData.tags);
      
      // Get token
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to upload resources');
        setUploading(false);
        return;
      }
      
      // Send to backend
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // DO NOT set Content-Type - browser sets it automatically for FormData
        },
        body: uploadData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      
      // Success!
      if (onUpload) {
        onUpload(data.data);
      }
      
      // Reset and close
      setFormData({
        title: '',
        description: '',
        category: 'Notes',
        subject: 'Mathematics',
        grade: '',
        board: 'CBSE',
        author: '',
        tags: ''
      });
      setFile(null);
      onClose();
      
    } catch (err) {
      setError(err.message || 'Failed to upload resource. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Notes',
      subject: 'Mathematics',
      grade: '',
      board: 'CBSE',
      author: '',
      tags: ''
    });
    setFile(null);
    setError('');
    onClose();
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg max-h-[85vh] overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition z-10"
        type="button"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800 pr-8">Upload Resource</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., CBSE Class 10 Mathematics Guide"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your resource..."
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.filter(subj => subj !== 'all').map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade/Class *
            </label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="e.g., Class 10"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Board *
            </label>
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., algebra, geometry, practice"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File * (PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, PNG - Max 10MB)
          </label>
          
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, PNG (max 10MB)</p>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <File className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-blue-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 mt-4">
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
          >
            {uploading ? 'Uploading...' : 'Upload Resource'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}