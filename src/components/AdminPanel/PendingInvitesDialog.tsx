'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { useMemo, useState } from 'react';
import DropDownComponent from './DropDownComponent';
import { toast } from 'sonner';

type Invite = {
  id: number;
  email: string;
  role: string;
  date: string;
  status: 'Pending' | 'Expired';
};

const invites: Invite[] = [
  { id: 1, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
  { id: 2, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Expired' },
  { id: 3, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
  { id: 4, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
  { id: 5, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
];

export default function PendingInvitesDialog() {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectStatus, setSelectStatus] = useState<'All' | 'Pending' | 'Expired'>('All');

  const filteredInvites = useMemo(() => {
    if (selectStatus === 'All') return invites;
    return invites.filter((i) => i.status === selectStatus);
  }, [selectStatus]);

  const toggleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredInvites.map((i) => i.id);
    const allVisibleSelected = visibleIds.every((id) => selected.includes(id));

    if (allVisibleSelected) {
      setSelected((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const resendMultipleInvites = () => {
    if (selected.length === 0) return;

    toast.success('Invites resent successfully.');
    setSelected([]);
  };

  const resendInvite = () => {
    toast.success('Invite resent successfully.');
  };

  const revoke = () => {
    toast.success('Invitation revoked successfully.');
  };

  const getStatusBadge = (status: Invite['status']) => {
    const base = 'px-3 py-1 rounded-full text-xs font-medium border';

    if (status === 'Pending') return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;

    if (status === 'Expired') return `${base} bg-red-50 text-red-600 border-red-200`;

    return base;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-black hover:underline">View Pending Invites</span>
      </DialogTrigger>

      <DialogContent
        className="w-full p-6 rounded-2xl bg-white max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: 640 }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Pending Invites</DialogTitle>
        </DialogHeader>

        {/* ACTION BAR */}
        <div className="flex justify-end gap-3 items-end mt-4">
          <Button
            onClick={resendMultipleInvites}
            disabled={selected.length === 0}
            className="bg-[#0a2540] text-white hover:bg-[#153e66] rounded-lg disabled:opacity-50"
          >
            Resend Invites
          </Button>

          <DropDownComponent
            // label="Status"
            value={selectStatus}
            setValue={(val) => setSelectStatus(val as 'All' | 'Pending' | 'Expired')}
            list={['All', 'Pending', 'Expired']}
          />
        </div>

        <div className="mt-6 border rounded-xl overflow-auto">
          <table className="text-sm min-w-max w-full">
            <thead className="bg-gray-50 font-extrabold text-black">
              <tr>
                <th className="p-3 w-10">
                  <Checkbox
                    checked={
                      filteredInvites.length > 0 &&
                      filteredInvites.every((i) => selected.includes(i.id))
                    }
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
              {filteredInvites.map((item) => (
                <tr key={item.id} className="">
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
                        <DropdownMenuItem onClick={resendInvite}>Resend Invite</DropdownMenuItem>
                        <DropdownMenuItem onClick={revoke}>Revoke</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {filteredInvites.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No invites found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
