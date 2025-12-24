import { sampleCourses } from './UsersData';

export const CourseCard = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="font-semibold mb-3">Courses</h3>

    {sampleCourses.map((course, i) => (
      <div key={i} className="flex items-center gap-4 mb-5">
        <img src={course.image} className="w-12 h-12 rounded-lg" />

        <div className="flex-1">
          <p className="font-medium text-sm">{course.title}</p>

          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div className="bg-blue-600 h-2 rounded" style={{ width: `${course.progress}%` }} />
          </div>

          <span className="text-xs text-gray-500 mt-1 block">{course.progress}% completed</span>
        </div>

        <span className="text-green-600 text-xs font-semibold">{course.completedLabel}</span>
      </div>
    ))}
  </div>
);
