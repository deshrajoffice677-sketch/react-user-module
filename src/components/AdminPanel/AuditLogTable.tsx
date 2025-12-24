import { Input } from '@/components/ui/input';

import DropDownComponent from './DropDownComponent';
import { useState } from 'react';

// type AuditRow = {
//   id: number;
//   actionBy: {
//     name: string;
//     avatar: string;
//   };
//   action: string;
//   user: {
//     name: string;
//     avatar: string;
//   };
//   reason: string;
//   date: string;
// };

// type AuditLogTableProps = {
//   title: string;
//   data: AuditRow[];
// };

export default function AuditLogTable({ title, data }: any) {
  const [selectReason, setSelectReason] = useState('All');
  const [selectDate, setSelectDate] = useState('All');

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

  const filteredData = data.filter((row: any) => {
    const reasonMatch = selectReason === 'All' || row.reason === selectReason;

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

    return reasonMatch && dateMatch;
  });

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center justify-between gap-4">
          <Input placeholder="Search" className="max-w-sm rounded-lg" />

          <div className="flex items-center gap-6">
            {dropDownItems.map((item, index) => (
              <DropDownComponent
                key={index}
                label={item.Label}
                value={item.getter}
                setValue={item.setter}
                list={item.value}
              />
            ))}
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 text-left w-10">#</th>
                <th className="p-4 text-left">Action Taken By</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Reason</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row: any) => (
                <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{row.id}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={row.actionBy?.avatar || row.moderator?.avatar} className="w-8 h-8 rounded-full" />
                      <span>{row.actionBy?.name || row.moderator?.name}</span>
                    </div>
                  </td>

                  <td className="p-4">{row.action}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={row.user?.avatar || row.student?.avatar} className="w-8 h-8 rounded-full" />
                      <span>{row.user?.name || row.student?.name}</span>
                    </div>
                  </td>

                  <td className="p-4">{row.reason || '-'}</td>

                  <td className="p-4">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

}
