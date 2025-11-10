// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FiltersBar from './components/FiltersBar';
import ResourceCard from './components/ResourceCard';
import UploadModal from './components/UploadModal';
import AuthPage from './components/AuthPage';
import { BookOpen } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  
  const categories = ['all', 'Notes', 'Presentations', 'Videos', 'Assignments', 'Study Guides', 'Practice Tests'];
  const subjects = ['all', 'Mathematics', 'Science', 'History', 'Literature', 'Computer Science', 'Languages', 'Arts'];

  // Sample data
  useEffect(() => {
    const sampleResources = [
      {
        id: '1',
        title: 'CBSE Class 10 Mathematics Complete Guide',
        description: 'Comprehensive guide covering all chapters with solved examples, practice problems, and previous year questions',
        category: 'Study Guides',
        subject: 'Mathematics',
        grade: 'Class 10',
        board: 'CBSE',
        tags: ['algebra', 'geometry', 'trigonometry', 'cbse'],
        author: 'Prof. Rajesh Kumar',
        date: '2024-11-10',
        views: 542,
        downloads: 234,
        likes: 156,
        rating: 4.9,
        imageUrl: 'cbse-math'
      },
      {
        id: '2',
        title: 'ICSE Physics Class 10 Question Bank',
        description: 'Collection of 500+ solved problems from ICSE board exams covering mechanics, heat, light, and electricity',
        category: 'Practice Tests',
        subject: 'Science',
        grade: 'Class 10',
        board: 'ICSE',
        tags: ['physics', 'icse', 'practice', 'exam-prep'],
        author: 'Dr. Priya Sharma',
        date: '2024-11-08',
        views: 412,
        downloads: 189,
        likes: 123,
        rating: 4.8,
        imageUrl: 'icse-physics'
      },
      {
        id: '3',
        title: 'CBSE Chemistry Class 11 Lab Manual',
        description: 'Detailed lab experiments with procedures, observations, and inferences for CBSE Class 11 chemistry',
        category: 'Notes',
        subject: 'Science',
        grade: 'Class 11',
        board: 'CBSE',
        tags: ['chemistry', 'lab', 'experiments', 'cbse'],
        author: 'Dr. Amit Patel',
        date: '2024-11-05',
        views: 367,
        downloads: 156,
        likes: 98,
        rating: 4.7,
        imageUrl: 'cbse-chemistry'
      },
      {
        id: '4',
        title: 'ICSE English Literature Notes - Class 9',
        description: 'Chapter-wise summary, character analysis, and important questions from ICSE prescribed books',
        category: 'Notes',
        subject: 'Literature',
        grade: 'Class 9',
        board: 'ICSE',
        tags: ['english', 'literature', 'icse', 'summary'],
        author: 'Ms. Anjali Desai',
        date: '2024-11-07',
        views: 298,
        downloads: 134,
        likes: 87,
        rating: 4.6,
        imageUrl: 'icse-english'
      },
      {
        id: '5',
        title: 'CBSE Biology Class 12 Diagrams',
        description: 'High-quality labeled diagrams for all chapters with explanations and exam tips',
        category: 'Study Guides',
        subject: 'Science',
        grade: 'Class 12',
        board: 'CBSE',
        tags: ['biology', 'diagrams', 'cbse', 'class12'],
        author: 'Prof. Sunita Verma',
        date: '2024-11-09',
        views: 489,
        downloads: 201,
        likes: 145,
        rating: 4.9,
        imageUrl: 'cbse-biology'
      },
      {
        id: '6',
        title: 'ICSE History Class 10 Timeline & Maps',
        description: 'Visual timeline of important historical events with maps and illustrations for ICSE board',
        category: 'Presentations',
        subject: 'History',
        grade: 'Class 10',
        board: 'ICSE',
        tags: ['history', 'timeline', 'maps', 'icse'],
        author: 'Mr. Vikram Singh',
        date: '2024-11-06',
        views: 334,
        downloads: 142,
        likes: 95,
        rating: 4.5,
        imageUrl: 'icse-history'
      },
      {
        id: '7',
        title: 'CBSE Computer Science Python Programs',
        description: '100+ Python programs with explanations for CBSE Class 11 & 12 computer science',
        category: 'Notes',
        subject: 'Computer Science',
        grade: 'Class 11-12',
        board: 'CBSE',
        tags: ['python', 'programming', 'cbse', 'computer-science'],
        author: 'Er. Rohit Mehta',
        date: '2024-11-11',
        views: 623,
        downloads: 287,
        likes: 198,
        rating: 4.9,
        imageUrl: 'cbse-cs'
      },
      {
        id: '8',
        title: 'ICSE Mathematics Solved Papers 2020-2024',
        description: 'Last 5 years ICSE board exam solved papers with detailed solutions and marking scheme',
        category: 'Practice Tests',
        subject: 'Mathematics',
        grade: 'Class 10',
        board: 'ICSE',
        tags: ['mathematics', 'solved-papers', 'icse', 'board-exam'],
        author: 'Prof. Meena Iyer',
        date: '2024-11-04',
        views: 756,
        downloads: 342,
        likes: 234,
        rating: 4.9,
        imageUrl: 'icse-math'
      }
    ];
    setResources(sampleResources);
    setFilteredResources(sampleResources);
  }, []);

  const filterResources = useCallback(() => {
    let filtered = [...resources];

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        r.board.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(r => r.subject === selectedSubject);
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
  }, [resources, searchTerm, selectedCategory, selectedSubject, sortBy]);

  useEffect(() => {
    filterResources();
  }, [filterResources]);

  const handleUpload = (newResourceData) => {
    const resource = {
      id: Date.now().toString(),
      ...newResourceData,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      downloads: 0,
      likes: 0,
      rating: 0,
      imageUrl: 'default'
    };

    setResources([resource, ...resources]);
    setShowUploadModal(false);
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

  const handleLogout = () => {
    setUser(null);
  };

  // Show Auth Page if user is not logged in
  if (!user) {
    return <AuthPage onLogin={setUser} />;
  }

  // Show Main App if user is logged in
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Darker Overlay - Study Notes Theme */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000')`,
            filter: 'blur(2px)',
          }}
        />
        {/* Darker Brown/Orange Gradient Overlay matching login page */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/85 via-orange-950/80 to-red-950/85" />
      </div>

      {/* Decorative Floating Books */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-10 left-10 transform rotate-12 animate-float">
          <BookOpen size={100} className="text-amber-300" />
        </div>
        <div className="absolute bottom-20 right-20 transform -rotate-12 animate-float-delayed">
          <BookOpen size={80} className="text-orange-300" />
        </div>
        <div className="absolute top-1/2 left-1/4 transform rotate-45 animate-float-slow">
          <BookOpen size={70} className="text-yellow-300" />
        </div>
        <div className="absolute top-1/3 right-1/3 transform -rotate-30 animate-float">
          <BookOpen size={75} className="text-amber-200" />
        </div>
      </div>

      <div className="relative z-10">
        <Header 
          onUploadClick={() => setShowUploadModal(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
          onLogout={handleLogout}
        />

        <div className="max-w-7xl mx-auto px-4 py-6">
          <StatsBar resources={resources} />
          
          <FiltersBar 
            categories={categories}
            subjects={subjects}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard 
                key={resource.id}
                resource={resource}
                onLike={handleLike}
                onDownload={handleDownload}
              />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12 bg-white/95 backdrop-blur rounded-2xl shadow-xl">
              <BookOpen size={48} className="mx-auto text-amber-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          categories={categories}
          subjects={subjects}
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}