import { useParams } from 'react-router-dom';


const CourseDetail = () => {
  useParams();

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Leading With Performance</h1>

            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur. Cum et sed dapibus mi sagittis commodo risus
              erat luctus.
            </p>

            <p className="text-gray-700 font-medium mb-6">Estimated Time</p>
            <p className="text-gray-900 font-bold text-xl mb-6">5 Hours</p>

            <button className="bg-black hover:bg-gray-900 text-black px-6 py-3 rounded-lg">
              Enroll
            </button>
          </div>

          {/* Right Video Preview */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1598257006626-48b0c252070d?w=800&q=80"
              alt="preview"
              className="w-full h-[350px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653v12.694c0 .856.932 1.385 1.666.944l10.548-6.347a1.125 1.125 0 000-1.888L6.916 4.709c-.734-.44-1.666.088-1.666.944z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Coach Info */}
        <div className="mt-10 bg-gray-100 rounded-2xl p-6 flex gap-4 items-start">
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Jon Kantner</h3>
            <p className="text-gray-600 text-sm mt-1 mb-3">
              Lorem ipsum dolor sit amet consectetur. Cum et sed dapibus mi sagittis.
            </p>
            <ul className="text-gray-700 text-sm list-disc ml-5 space-y-1">
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Cum et sed dapibus mi sagittis commodo risus erat luctus.</li>
            </ul>
          </div>
        </div>

        {/* Lessons */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lessons</h2>

          {/* Lesson 1 Expanded */}
          <div className="border rounded-xl p-6 mb-4">
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="font-bold text-gray-900 text-lg">Lesson 1</h3>
              <span className="text-gray-600">▼</span>
            </div>

            <p className="text-gray-600 text-sm mt-3 mb-4">
              Lorem ipsum dolor sit amet consectetur. Cum et sed dapibus mi sagittis commodo risus
              erat luctus.
            </p>

            <div className="flex items-center gap-6 text-gray-700 text-sm">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
                42 mins
              </span>
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
                </svg>
                20 mins
              </span>
            </div>
          </div>

          {/* Other lessons */}
          {[2, 3, 4, 5].map((lesson) => (
            <div
              key={lesson}
              className="border rounded-xl p-6 mb-4 flex justify-between items-center cursor-pointer"
            >
              <h3 className="font-bold text-gray-900 text-lg">Lesson {lesson}</h3>
              <div className="flex gap-6 text-gray-700 text-sm items-center">
                <span className="flex items-center gap-2">56 mins</span>
                <span className="flex items-center gap-2">20 mins</span>
                <span>›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
