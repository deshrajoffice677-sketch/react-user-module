import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';
import { Loader2 } from 'lucide-react';

type UserRow = {
  id: number;
  name: string;
  avatar: string;
  reason: string;
  date: string;
  duration?: string;
};

type UserTableProps = {
  title: string;
  data: UserRow[];
  showDuration?: boolean;
  actionLabel: string;
  onActionClick: (id: number) => void;
  loading?: boolean;
};

export default function BanedSuspendUserDataDialog({
  title,
  data,
  showDuration = false,
  actionLabel,
  onActionClick,
  loading = false,
}: UserTableProps) {
  const [selectReason, setSelectReason] = useState('All');
  const [selectDate, setSelectDate] = useState('All');
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleAction = async (id: number) => {
    setLoadingId(id);
    await onActionClick(id);
    setLoadingId(null);
  };

  const dropDownItems = [
    {
      Label: 'Reason',
      getter: selectReason,
      setter: setSelectReason,
      value: ['All', 'Spam', 'Misinformation', 'Harassment'],
    },
    {
      Label: 'Date',
      getter: selectDate,
      setter: setSelectDate,
      value: ['All', 'Last 7 Days', 'Last Month'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-7">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-10 h-10 rounded-lg border-gray-200 text-sm w-full focus-visible:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {dropDownItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{item.Label}</span>
                <DropDownComponent
                  value={item.getter}
                  setValue={item.setter}
                  list={item.value}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="py-4 px-4 text-left font-semibold text-gray-900 w-12">#</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-900">User</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-900">Reason</th>
              <th className="py-4 px-4 text-left font-semibold text-gray-900">{showDuration ? 'Date Suspended' : 'Date Banned'}</th>
              {showDuration && <th className="py-4 px-4 text-left font-semibold text-gray-900">Duration</th>}
              <th className="py-4 px-4 text-right font-semibold text-gray-900">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4 text-gray-500">{user.id}</td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-8 h-8 rounded-full border border-gray-100" />
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </div>
                </td>

                <td className="py-4 px-4">{user.reason}</td>
                <td className="py-4 px-4 text-gray-500">{user.date}</td>

                {showDuration && <td className="py-4 px-4 text-gray-500">{user.duration}</td>}

                <td className="py-4 px-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user.id)}
                    className="rounded-lg shadow-none"
                    disabled={loading}
                  >
                    {loading && loadingId === user.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      actionLabel
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
