import React, { useState, useEffect } from 'react';
import { BookOpen, Upload, Search, Filter, Star, Download, Eye, Tag, Calendar, User, Heart, Share2, TrendingUp, X, Plus, LogOut, GraduationCap } from 'lucide-react';

export default function EduAid() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ userId: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  
  const categories = ['all', 'Notes', 'Presentations', 'Videos', 'Assignments', 'Study Guides', 'Practice Tests'];
  const subjects = ['all', 'Mathematics', 'Science', 'History', 'Literature', 'Computer Science', 'Languages', 'Arts'];
  const boards = ['all', 'CBSE', 'ICSE'];
  const classes = ['all', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

  // Pre-created users
  const users = [
    { userId: 'student1', password: 'pass123', name: 'Rahul Sharma', board: 'CBSE', class: '10th', role: 'student' },
    { userId: 'student2', password: 'pass123', name: 'Priya Verma', board: 'ICSE', class: '12th', role: 'student' },
    { userId: 'student3', password: 'pass123', name: 'Arjun Patel', board: 'CBSE', class: '9th', role: 'student' },
    { userId: 'teacher1', password: 'teach123', name: 'Dr. Sarah Chen', board: 'CBSE', class: 'All', role: 'teacher' },
    { userId: 'teacher2', password: 'teach123', name: 'Prof. James Wilson', board: 'ICSE', class: 'All', role: 'teacher' }
  ];

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'Notes',
    subject: 'Mathematics',
    grade: '',
    board: 'CBSE',
    tags: '',
    author: ''
  });

  // Sample data with board and class info
  useEffect(() => {
    const sampleResources = [
      {
        id: '1',
        title: 'Calculus I - Derivatives Guide',
        description: 'Comprehensive guide covering all derivative rules with step-by-step examples and practice problems',
        category: 'Notes',
        subject: 'Mathematics',
        grade: '12th',
        board: 'CBSE',
        tags: ['calculus', 'derivatives', 'math'],
        author: 'Prof. Sarah Chen',
        date: '2024-10-15',
        views: 342,
        downloads: 128,
        likes: 87,
        rating: 4.8
      },
      {
        id: '2',
        title: 'Photosynthesis Presentation',
        description: 'Detailed slides explaining the photosynthesis process with diagrams and animations',
        category: 'Presentations',
        subject: 'Science',
        grade: '10th',
        board: 'CBSE',
        tags: ['biology', 'plants', 'photosynthesis'],
        author: 'Dr. James Wilson',
        date: '2024-10-20',
        views: 256,
        downloads: 94,
        likes: 63,
        rating: 4.6
      },
      {
        id: '3',
        title: 'World War II Timeline',
        description: 'Interactive timeline with key events, analysis, and historical context',
        category: 'Study Guides',
        subject: 'History',
        grade: '11th',
        board: 'ICSE',
        tags: ['wwii', 'history', 'timeline'],
        author: 'Ms. Emily Rodriguez',
        date: '2024-11-01',
        views: 189,
        downloads: 76,
        likes: 52,
        rating: 4.7
      },
      {
        id: '4',
        title: 'Python Programming Basics',
        description: 'Introduction to Python programming with examples and exercises',
        category: 'Videos',
        subject: 'Computer Science',
        grade: '9th',
        board: 'CBSE',
        tags: ['python', 'programming', 'coding'],
        author: 'Alex Kumar',
        date: '2024-11-05',
        views: 412,
        downloads: 156,
        likes: 98,
        rating: 4.9
      },
      {
        id: '5',
        title: 'Shakespeare Analysis Collection',
        description: 'In-depth analysis of major Shakespeare plays with themes and character studies',
        category: 'Notes',
        subject: 'Literature',
        grade: '11th',
        board: 'ICSE',
        tags: ['shakespeare', 'literature', 'drama'],
        author: 'Dr. Patricia Moore',
        date: '2024-10-28',
        views: 223,
        downloads: 89,
        likes: 67,
        rating: 4.5
      },
      {
        id: '6',
        title: 'Chemistry Practice Test Pack',
        description: 'Collection of practice tests covering organic and inorganic chemistry',
        category: 'Practice Tests',
        subject: 'Science',
        grade: '12th',
        board: 'CBSE',
        tags: ['chemistry', 'practice', 'exam'],
        author: 'Prof. Michael Zhang',
        date: '2024-11-08',
        views: 301,
        downloads: 145,
        likes: 92,
        rating: 4.8
      },
      {
        id: '7',
        title: 'Quadratic Equations Masterclass',
        description: 'Complete guide to solving quadratic equations with multiple methods',
        category: 'Notes',
        subject: 'Mathematics',
        grade: '10th',
        board: 'ICSE',
        tags: ['algebra', 'equations', 'quadratic'],
        author: 'Mr. Rajesh Kumar',
        date: '2024-11-03',
        views: 278,
        downloads: 112,
        likes: 78,
        rating: 4.7
      },
      {
        id: '8',
        title: 'Cell Biology Study Guide',
        description: 'Comprehensive notes on cell structure, functions, and processes',
        category: 'Study Guides',
        subject: 'Science',
        grade: '9th',
        board: 'CBSE',
        tags: ['biology', 'cells', 'science'],
        author: 'Dr. Anjali Desai',
        date: '2024-10-25',
        views: 198,
        downloads: 88,
        likes: 61,
        rating: 4.6
      }
    ];
    setResources(sampleResources);
    setFilteredResources(sampleResources);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      filterResources();
    }
  }, [searchTerm, selectedCategory, selectedSubject, selectedBoard, selectedClass, sortBy, resources, isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const user = users.find(u => u.userId === loginForm.userId && u.password === loginForm.password);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      // Set default filters based on user's board and class
      if (user.role === 'student') {
        setSelectedBoard(user.board);
        setSelectedClass(user.class);
      }
    } else {
      setLoginError('Invalid User ID or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginForm({ userId: '', password: '' });
    setSelectedBoard('all');
    setSelectedClass('all');
  };

  const filterResources = () => {
    let filtered = [...resources];

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(r => r.subject === selectedSubject);
    }

    if (selectedBoard !== 'all') {
      filtered = filtered.filter(r => r.board === selectedBoard);
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(r => r.grade === selectedClass);
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredResources(filtered);
  };

  const handleUpload = () => {
    if (!newResource.title || !newResource.author) {
      alert('Please fill in at least title and author');
      return;
    }

    const resource = {
      id: Date.now().toString(),
      ...newResource,
      tags: newResource.tags.split(',').map(t => t.trim()).filter(t => t),
      date: new Date().toISOString().split('T')[0],
      views: 0,
      downloads: 0,
      likes: 0,
      rating: 0,
      grade: newResource.grade || selectedClass
    };

    setResources([resource, ...resources]);
    setShowUploadModal(false);
    setNewResource({
      title: '',
      description: '',
      category: 'Notes',
      subject: 'Mathematics',
      grade: '',
      board: 'CBSE',
      tags: '',
      author: ''
    });
  };

  const handleLike = (id) => {
    setResources(resources.map(r =>
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    ));
  };

  const handleDownload = (id) => {
    setResources(resources.map(r =>
      r.id === id ? { ...r, downloads: r.downloads + 1 } : r
    ));
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="text-white" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to EduAid</h1>
            <p className="text-emerald-100">Your Learning Resource Hub</p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input
                  type="text"
                  value={loginForm.userId}
                  onChange={(e) => setLoginForm({ ...loginForm, userId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter your user ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3 font-semibold">Demo Accounts:</p>
              <div className="space-y-2 text-xs">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="font-semibold text-emerald-900">Students:</p>
                  <p className="text-emerald-700">student1 / pass123 (CBSE, 10th)</p>
                  <p className="text-emerald-700">student2 / pass123 (ICSE, 12th)</p>
                  <p className="text-emerald-700">student3 / pass123 (CBSE, 9th)</p>
                </div>
                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="font-semibold text-teal-900">Teachers:</p>
                  <p className="text-teal-700">teacher1 / teach123</p>
                  <p className="text-teal-700">teacher2 / teach123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Application (after login)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-10 border-b-2 border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-xl shadow-lg">
                <GraduationCap className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  EduAid
                </h1>
                <p className="text-sm text-gray-600">Learning Resource Sharing Hub</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Upload size={20} />
                Share Resource
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl transition-all">
                  <User size={20} className="text-gray-700" />
                  <span className="font-semibold text-gray-800">{currentUser.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-lg">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{currentUser.name}</p>
                      <p className="text-sm text-gray-600">{currentUser.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen size={16} className="text-emerald-600" />
                      <span className="text-gray-700">Board: <span className="font-semibold">{currentUser.board}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap size={16} className="text-teal-600" />
                      <span className="text-gray-700">Class: <span className="font-semibold">{currentUser.class}</span></span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-emerald-600">{resources.length}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <BookOpen className="text-emerald-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-2xl font-bold text-teal-600">
                  {resources.reduce((sum, r) => sum + r.downloads, 0)}
                </p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg">
                <Download className="text-teal-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-cyan-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {resources.reduce((sum, r) => sum + r.views, 0)}
                </p>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg">
                <Eye className="text-cyan-600" size={28} />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Contributors</p>
                <p className="text-2xl font-bold text-amber-600">
                  {new Set(resources.map(r => r.author)).size}
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <User className="text-amber-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-emerald-600" />
            <h3 className="font-semibold text-gray-800 text-lg">Filters</h3>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                {boards.map(board => (
                  <option key={board} value={board}>{board === 'all' ? 'All Boards' : board}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls === 'all' ? 'All Classes' : cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub === 'all' ? 'All Subjects' : sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-gray-50 hover:bg-white transition-colors"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-emerald-200">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex gap-2">
                    <span className="bg-white/25 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {resource.category}
                    </span>
                    <span className="bg-white/35 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {resource.board}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/25 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={14} className="text-yellow-300 fill-yellow-300" />
                    <span className="text-white text-xs font-semibold">{resource.rating}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{resource.title}</h3>
                <p className="text-emerald-100 text-sm">{resource.subject} • Class {resource.grade}</p>
              </div>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{resource.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download size={16} />
                    <span>{resource.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span>{resource.likes}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{resource.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(resource.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Heart size={18} className="text-red-500" />
                    </button>
                    <button
                      onClick={() => handleDownload(resource.id)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Share a Resource</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g., Introduction to Algebra"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  rows="3"
                  placeholder="Brief description of the resource..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
                  <select
                    value={newResource.board}
                    onChange={(e) => setNewResource({ ...newResource, board: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  >
                    {boards.filter(b => b !== 'all').map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={newResource.grade}
                    onChange={(e) => setNewResource({ ...newResource, grade: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Select Class</option>
                    {classes.filter(c => c !== 'all').map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={newResource.subject}
                    onChange={(e) => setNewResource({ ...newResource, subject: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  >
                    {subjects.filter(s => s !== 'all').map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author/Creator *</label>
                <input
                  type="text"
                  value={newResource.author}
                  onChange={(e) => setNewResource({ ...newResource, author: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newResource.tags}
                  onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g., algebra, equations, beginner"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
                >
                  Share Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}