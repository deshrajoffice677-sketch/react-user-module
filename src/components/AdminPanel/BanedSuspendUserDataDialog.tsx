import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';

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
};

export default function BanedSuspendUserDataDialog({
  title,
  data,
  showDuration = false,
  actionLabel,
  onActionClick,
}: UserTableProps) {
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="flex items-center justify-between gap-4">
        <Input placeholder="Search" className="max-w-sm rounded-lg" />

        <div className="flex items-center gap-6">
          {/* <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Reason</span> */}
          {/* <Select>
              <SelectTrigger className="w-28 rounded-lg">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="misinfo">Misinformation</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
              </SelectContent>
            </Select> */}
          {dropDownItems.map((item) => (
            <DropDownComponent
              label={item.Label}
              value={item.getter}
              setValue={item.setter}
              list={item.value}
            />
          ))}

          {/* </div> */}

          {/* <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Date</span>
            <Select>
              <SelectTrigger className="w-28 rounded-lg">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Last 7 Days</SelectItem>
                <SelectItem value="week">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 text-left w-10">#</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">{showDuration ? 'Date Suspended' : 'Date Banned'}</th>
              {showDuration && <th className="p-4 text-left">Duration</th>}
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">{user.id}</td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-8 h-8 rounded-full" />
                    <span>{user.name}</span>
                  </div>
                </td>

                <td className="p-4">{user.reason}</td>
                <td className="p-4">{user.date}</td>

                {showDuration && <td className="p-4">{user.duration}</td>}

                <td className="p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onActionClick(user.id)}
                    className="rounded-lg"
                  >
                    {actionLabel}
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
