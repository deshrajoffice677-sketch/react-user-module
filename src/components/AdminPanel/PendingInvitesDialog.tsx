import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import DropDownComponent from './DropDownComponent';

export default function PendingInvitesDialog() {
  const [selected, setSelected] = useState<number[]>([]);
  const invites = [
    { id: 1, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 2, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Expired' },
    { id: 3, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 4, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 5, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
  ];

  const toggleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selected.length === invites.length) setSelected([]);
    else setSelected(invites.map((i) => i.id));
  };

  const getStatusBadge = (status: string) => {
    const base = 'px-3 py-1 rounded-full text-xs font-medium border';
    if (status === 'Pending') return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
    if (status === 'Expired') return `${base} bg-red-50 text-red-600 border-red-200`;
    return base;
  };

  const [selectStatus, setSelectStatus] = useState('All');
  const dropDownItem =
  {
    Label: 'Status',
    getter: selectStatus,
    setter: setSelectStatus,
    value: ['All', 'Pending', 'Expired'],
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">View Pending Invites</span>
      </DialogTrigger>

      <DialogContent
        className="
    w-full 
    max-w-[700px] 
    p-6 
    rounded-2xl 
    bg-white 
    max-h-[90vh] 
    overflow-y-auto
  "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Pending Invites</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mt-4">
          <Button className="bg-[#0a2540] text-white hover:bg-[#153e66] rounded-lg">
            Resend Invites
          </Button>

          <div className="flex items-center gap-2 text-sm">
            {/* <span>Status</span>
            <select className="border rounded-md px-2 py-1 text-sm">
              <option>All</option>
              <option>Pending</option>
              <option>Expired</option>
            </select> */}

            <DropDownComponent
              label={dropDownItem.Label}
              value={dropDownItem.getter}
              setValue={dropDownItem.setter}
              list={dropDownItem.value}
            />
          </div>
        </div>

        <div className="mt-6 border rounded-xl overflow-auto">
          <table className=" text-sm min-w-max">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 w-10">
                  <Checkbox
                    checked={selected.length === invites.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role Invite</th>
                <th className="p-3 text-left">Sent On</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {invites.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onCheckedChange={() => toggleSelect(item.id)}
                    />
                  </td>

                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.role}</td>
                  <td className="p-3">{item.date}</td>

                  <td className="p-3">
                    <span className={getStatusBadge(item.status)}>{item.status}</span>
                  </td>

                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="h-5 w-5 cursor-pointer" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                        <DropdownMenuItem>Revoke</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
