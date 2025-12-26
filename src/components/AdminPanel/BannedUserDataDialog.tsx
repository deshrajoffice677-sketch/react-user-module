import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';

// type BannedUser = {
//   id: number;
//   name: string;
//   avatar: string;
//   reason: string;
//   bannedAt: string;
// };

// type Props = {
//   data: BannedUser[];
//   title: string
//   onReinstate: (id: number) => void;
// };


export default function BanedDataDialog({
  data,
  title,
  onReinstate,
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
      <div className='flex justify-between mt-7 '>
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

      </div>
      <div className="border rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 font-extrabold text-black">
            <tr>
              <th className="py-3 pl-4 pr-2 text-left w-12 ">#</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Date Banned</th>
              <th className="py-3 pr-10 pl-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((u: any, index: number) => (
              <tr key={u.id} className=" hover:bg-gray-50">
                <td className="py-4 pl-4 pr-2 text-left">
                  {index + 1}
                </td>

                <td className="py-4 px-4 flex items-center gap-3">
                  <img
                    src={u.avatar || u.user?.avatar}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span className="font-medium">
                    {u.name || u.user?.name}
                  </span>
                </td>

                <td className="py-4 px-4">{u.reason}</td>

                <td className="py-4 px-4">{u.date}</td>

                <td className="py-4 pr-4 pl-2 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReinstate(u.userId || u.user?.id)}
                  >
                    Reinstate
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
