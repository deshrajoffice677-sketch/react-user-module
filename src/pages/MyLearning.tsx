import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: 'Ecommerce Launch Basics',
    description: 'Build your online store from scratch to launch.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80 ',
    progress: 40,
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Digital Marketing Fundamentals',
    description: 'Master SEO, social media, and paid ads strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    progress: 40,
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'High-Converting Product',
    description: 'Create product pages that drive sales and conversions.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    progress: 40,
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Customer Retention Strategy',
    description: 'Learn email marketing and loyalty programs.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    progress: 40,
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Analytics & Data Insights',
    description: 'Track metrics and optimize your store performance.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    progress: 40,
    status: 'in-progress',
  },
  {
    id: 6,
    title: 'Supply Chain Management',
    description: 'Master inventory, shipping, and fulfillment processes.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    progress: 40,
    status: 'in-progress',
  },
];

// Completed courses data
const completedCourses = [
  {
    id: 7,
    title: 'Ecommerce Launch Basics',
    description: 'Build your online store from scratch to launch. Choose a product',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
  {
    id: 8,
    title: 'Digital Marketing Fundamentals',
    description: 'Master SEO, social media, and paid ads strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
  {
    id: 9,
    title: 'High-Converting Product',
    description: 'Create product pages that drive sales, conversions paid ads strategies',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
  {
    id: 10,
    title: 'Customer Retention Strategy',
    description: 'Learn email marketing and loyalty top-performing DTC brands.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
  {
    id: 11,
    title: 'Analytics & Data Insights',
    description: 'Track metrics and optimize your store performance top-performing.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
  {
    id: 12,
    title: 'Supply Chain Management',
    description: 'Master inventory, shipping, and fulfillment processes.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    progress: 100,
    status: 'completed',
  },
];

const MyLearning = () => {
  const [filter, setFilter] = useState('in-progress');
  const navigate = useNavigate();

  // Get courses based on filter
  const displayedCourses = filter === 'in-progress' ? enrolledCourses : completedCourses;

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => navigate('/courses')}
            className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700"
          >
            All Courses
          </button>

          <button className="px-4 py-2 font-medium text-sm text-blue-600 border-b-2 border-blue-600">
            My Learning
          </button>
        </div>

        {/* Sub Filters */}
        <div className="flex space-x-3 mb-8">
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-5 py-2 rounded-md text-sm font-medium ${filter === 'in-progress'
              ? 'bg-[#0F1A30] text-black'
              : 'bg-white text-gray-700 border border-gray-300'
              }`}
          >
            In Progress
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`px-5 py-2 rounded-md text-sm font-medium ${filter === 'completed'
              ? 'bg-[#0F1A30] text-black'
              : 'bg-white text-gray-700 border border-gray-300'
              }`}
          >
            Completed
          </button>
        </div>

        {/* Course Grid or Empty State */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-28 h-20 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-base">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-700">
                        {course.progress}% completed
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-gray-900 h-1.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {filter === 'in-progress' && (
                    <button className="px-4 py-1.5 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 transition h-fit">
                      Continue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center text-center mt-40">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'in-progress'
                ? "You haven't started any courses."
                : "You haven't completed any courses yet."}
            </h3>

            <p className="text-gray-800 max-w-md mb-8">
              Browse available courses to begin your learning journey.
            </p>

            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-2 bg-[#0F1A30] text-white rounded-lg 
               hover:bg-[#0d1728] transition flex items-center 
               justify-center font-medium shadow-sm"
            >
              Explore courses
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyLearning;
