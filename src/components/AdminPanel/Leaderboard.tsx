import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weeklyProgress = [
  { day: 'Monday', points: 350 },
  { day: 'Tuesday', points: 370 },
  { day: 'Wednesday', points: 410 },
  { day: 'Thursday', points: 480 },
  { day: 'Friday', points: 580 },
  { day: 'Saturday', points: 760 },
  { day: 'Sunday', points: 1050 },
];

const badges = [
  { name: 'Brainiac', color: 'bg-blue-100 text-blue-700' },
  { name: 'Creative Thinker', color: 'bg-pink-100 text-pink-700' },
  { name: 'Fast Starter', color: 'bg-amber-100 text-amber-700' },
  { name: 'Top Scorer', color: 'bg-gray-200 text-gray-700' },
  { name: 'Quiz Champion', color: 'bg-yellow-100 text-yellow-700' },
];
export default function Leaderboard() {
  return (
    <>
      <h3 className="font-semibold text-lg mt-6 mb-[-15px]">Leaderboard</h3>
      <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-sm">Badges</h4>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View all Badges
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-lg py-4"
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${badge.color}`}
              >
                ★
              </div>
              <p className="text-xs font-medium text-gray-700 text-center">{badge.name}</p>
            </div>
          ))}
        </div>

        <h4 className="font-medium text-sm mb-4">Weekly Progress</h4>

        <div className="border rounded-lg p-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="points" stroke="#4F46E5" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}
