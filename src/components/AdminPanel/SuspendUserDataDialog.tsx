import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';

// type UserRow = {
//   id: number;
//   name: string;
//   avatar: string;
//   reason: string;
//   startDate: string;
//   duration?: string;
// };

// type UserTableProps = {
//   title: string;
//   data: UserRow[];
//   showDuration?: boolean;
//   actionLabel: string;
//   onActionClick: (id: number) => void;
// };


export default function BanedSuspendUserDataDialog({
  title,
  data,
  onActionClick
}: any) {
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



  const filteredData = data.filter((u: any) => {
    const reasonMatch = selectReason === 'All' || u.reason === selectReason;

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

    return reasonMatch && dateMatch;
  });

  return (
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

      <div className="border rounded-xl bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Start Date</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((u: any) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={u.avatar || u.user?.avatar} className="w-8 h-8 rounded-full" />
                  {u.name || u.user?.name}
                </td>

                <td className="p-4">{u.reason}</td>
                <td className="p-4">{u.date}</td>
                <td className="p-4">{u.duration}</td>

                <td className="p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onActionClick(u.userId || u.user?.id)}
                  >
                    Lift Suspension
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
