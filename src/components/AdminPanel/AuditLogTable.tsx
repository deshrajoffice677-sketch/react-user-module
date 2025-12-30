import { Input } from '@/components/ui/input';

import DropDownComponent from './DropDownComponent';
import { useState } from 'react';
import type { AuditLogEntry } from '@/types/interface/UsersInterface';

export default function AuditLogTable({ title, data }: { title: string; data: AuditLogEntry[] }) {
  const [selectReason, setSelectReason] = useState('All');
  const [selectDate, setSelectDate] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredData = data.filter((row: AuditLogEntry) => {
    const reasonMatch = selectReason === 'All' || row.reason === selectReason;
    const searchMatch = searchQuery === '' ||
      (row.actionBy?.name || row.moderator?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.user?.name || row.student?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.reason || '').toLowerCase().includes(searchQuery.toLowerCase());

    let dateMatch = true;
    if (selectDate !== 'All') {
      const [day, month, year] = row.date.split('/').map(Number);
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

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                <th className="py-4 px-4 text-left font-semibold text-gray-900">Action Taken By</th>
                <th className="py-4 px-4 text-left font-semibold text-gray-900">Action</th>
                <th className="py-4 px-4 text-left font-semibold text-gray-900">User</th>
                <th className="py-4 px-4 text-left font-semibold text-gray-900">Reason</th>
                <th className="py-4 px-4 text-left font-semibold text-gray-900">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row: AuditLogEntry, index: number) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-gray-500">{index + 1}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.actionBy?.avatar || row.moderator?.avatar}
                        className="w-8 h-8 rounded-full border border-gray-100"
                      />
                      <span className="font-medium text-gray-900">{row.actionBy?.name || row.moderator?.name}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">{row.action}</td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.user?.avatar || row.student?.avatar}
                        className="w-8 h-8 rounded-full border border-gray-100"
                      />
                      <span className="font-medium text-gray-900">{row.user?.name || row.student?.name}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">{row.reason || '-'}</td>

                  <td className="py-4 px-4 text-gray-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
