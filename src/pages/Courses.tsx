import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
};

type InProgressCourse = {
  id: number;
  title: string;
  description: string;
  progress: number;
  image: string;
};

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const inProgressCourses: InProgressCourse[] = [
    {
      id: 1,
      title: 'Ecommerce Launch Basics',
      description: 'Build your online store from scratch to launch.',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
      id: 2,
      title: 'Digital Marketing Fundamentals',
      description: 'Track metrics and optimize your store performance.',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    },
  ];

  const courses: Course[] = [
    {
      id: 1,
      title: 'Ecommerce Launch Basics',
      description: 'Learn how to set up a profitable online store from zero.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: 'Business',
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      description: 'Master social media, SEO, and paid advertising strategies.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      category: 'Marketing',
    },
    {
      id: 3,
      title: 'Web Development Pro',
      description: 'Build modern websites with HTML, CSS, and JavaScript.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      category: 'Development',
    },
    {
      id: 4,
      title: 'Graphic Design Fundamentals',
      description: 'Create stunning visuals using design principles and tools.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      category: 'Design',
    },
    {
      id: 5,
      title: 'Financial Planning 101',
      description: 'Learn to manage your finances and invest wisely.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      category: 'Finance',
    },
    {
      id: 6,
      title: 'Content Writing Essentials',
      description: 'Craft compelling content that engages and converts.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
      category: 'Writing',
    },
  ];

  return (
    <>
      <div className="w-full">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'all'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            All Courses
          </button>
          <button
            onClick={() => navigate('/my-learning')}
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'my-learning'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            My Learning
          </button>
        </div>

        {/* Continue Learning Section */}
        <div className="bg-gray-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inProgressCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl p-6 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {course.progress}% completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="border border-gray-900 text-gray-900 font-medium py-2 px-6 rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Courses Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-200"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-xl text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 text-base mb-6 flex-1">{course.description}</p>
                <button
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="border border-gray-900 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 hover:text-black transition-colors"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
