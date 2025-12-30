import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';
import type { BannedUser } from '@/types/interface/UsersInterface';
import { Loader2 } from 'lucide-react';

export default function BanedDataDialog({
  data,
  title,
  onReinstate,
  loading = false
}: {
  data: BannedUser[];
  title: string;
  onReinstate: (id: number) => void;
  loading?: boolean;
}) {
  const [selectReason, setSelectReason] = useState('All');
  const [selectDate, setSelectDate] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingId, setLoadingId] = useState<number | null>(null);

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

  const filteredData = data.filter((u: BannedUser) => {
    const reasonMatch = selectReason === 'All' || u.reason === selectReason;
    const searchMatch = searchQuery === '' ||
      (u.name || u.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.reason || '').toLowerCase().includes(searchQuery.toLowerCase());

    let dateMatch = true;
    if (selectDate !== 'All') {
      const [day, month, year] = u.date.split('/').map(Number);
      const rowDate = new Date(year, month - 1, day);
      const now = new Date();

      if (selectDate === 'Last 7 Days') {
        const pastDate = new Date();
        pastDate.setDate(now.getDate() - 7);
        dateMatch = rowDate >= pastDate;
      } else if (selectDate === 'Last Month') {
        const pastDate = new Date();
        pastDate.setMonth(now.getMonth() - 1);
        dateMatch = rowDate >= pastDate;
      }
    }

    return reasonMatch && searchMatch && dateMatch;
  });

  const handleAction = async (id: number) => {
    setLoadingId(id);
    await onReinstate(id);
    setLoadingId(null);
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-7">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 rounded-lg border-gray-200 text-sm w-full focus-visible:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
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
              <th className="py-4 px-4 text-left font-semibold text-gray-900">Date Banned</th>
              <th className="py-4 px-4 text-right font-semibold text-gray-900">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((u: BannedUser, index: number) => {
              const id = u.userId || u.user?.id || u.id;
              const isRowLoading = loading && loadingId === id;
              return (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-gray-500">{index + 1}</td>

                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={u.avatar || u.user?.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <span className="font-medium">{u.name || u.user?.name}</span>
                  </td>

                  <td className="py-4 px-4">{u.reason}</td>

                  <td className="py-4 px-4">{u.date}</td>

                  <td className="py-4 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(id)}
                      disabled={loading}
                    >
                      {isRowLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reinstate'}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
