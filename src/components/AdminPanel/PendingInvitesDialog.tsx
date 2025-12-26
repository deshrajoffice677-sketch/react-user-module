// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { EllipsisVertical } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { useState } from 'react';
// import DropDownComponent from './DropDownComponent';
// import { toast } from 'sonner';

// export default function PendingInvitesDialog() {
//   const [selected, setSelected] = useState<number[]>([]);
//   const invites = [
//     { id: 1, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
//     { id: 2, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Expired' },
//     { id: 3, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
//     { id: 4, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
//     { id: 5, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
//   ];

//   const toggleSelect = (id: number) => {
//     setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   const toggleSelectAll = () => {
//     if (selected.length === invites.length) setSelected([]);
//     else setSelected(invites.map((i) => i.id));
//   };

//   const getStatusBadge = (status: string) => {
//     const base = 'px-3 py-1 rounded-full text-xs font-medium border';
//     if (status === 'Pending') return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
//     if (status === 'Expired') return `${base} bg-red-50 text-red-600 border-red-200`;
//     return base;
//   };

//   const [selectStatus, setSelectStatus] = useState('All');
//   const dropDownItem =
//   {
//     Label: 'Status',
//     getter: selectStatus,
//     setter: setSelectStatus,
//     value: ['All', 'Pending', 'Expired'],
//   };

//   const resendMultipleInvites = () => {
//     toast.success("Invites Resend successfully.")
//   }
//   const resendInvite = () => {
//     toast.success("Invite Resend successfully.")
//   }
//   const revoke = () => {
//     toast.success("Invitation Revoked successfully.")
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <span className="cursor-pointer">View Pending Invites</span>
//       </DialogTrigger>

//       <DialogContent
//         className="
//     w-full 
//     max-w-[700px] 
//     p-6 
//     rounded-2xl 
//     bg-white 
//     max-h-[90vh] 
//     overflow-y-auto
//   "
//         style={{ maxWidth: 640 }}

//       >
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">Pending Invites</DialogTitle>
//         </DialogHeader>

//         <div className="flex justify-end gap-3 items-end mt-4">
//           <Button onClick={() => resendMultipleInvites()} className="bg-[#0a2540] text-white hover:bg-[#153e66] rounded-lg">
//             Resend Invites
//           </Button>

//           <div className="flex items-center gap-2 text-sm">
//             {/* <span>Status</span>
//             <select className="border rounded-md px-2 py-1 text-sm">
//               <option>All</option>
//               <option>Pending</option>
//               <option>Expired</option>
//             </select> */}

//             <DropDownComponent
//               label={dropDownItem.Label}
//               value={dropDownItem.getter}
//               setValue={dropDownItem.setter}
//               list={dropDownItem.value}
//             />
//           </div>
//         </div>

//         <div className="mt-6 border rounded-xl overflow-auto">
//           <table className=" text-sm min-w-max">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="p-3 w-10">
//                   <Checkbox
//                     checked={selected.length === invites.length}
//                     onCheckedChange={toggleSelectAll}
//                   />
//                 </th>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Role Invite</th>
//                 <th className="p-3 text-left">Sent On</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {invites.map((item) => (
//                 <tr key={item.id} className="border-t">
//                   <td className="p-3">
//                     <Checkbox
//                       checked={selected.includes(item.id)}
//                       onCheckedChange={() => toggleSelect(item.id)}
//                     />
//                   </td>

//                   <td className="p-3">{item.id}</td>
//                   <td className="p-3">{item.email}</td>
//                   <td className="p-3">{item.role}</td>
//                   <td className="p-3">{item.date}</td>

//                   <td className="p-3">
//                     <span className={getStatusBadge(item.status)}>{item.status}</span>
//                   </td>

//                   <td className="p-3">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger>
//                         <EllipsisVertical className="h-5 w-5 cursor-pointer" />
//                       </DropdownMenuTrigger>

//                       <DropdownMenuContent className="bg-white">
//                         <DropdownMenuItem onClick={() => resendInvite()}>Resend Invite</DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => revoke()}>Revoke</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

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

export default function PendingInvitesDialog() {
  /* ---------------- DATA ---------------- */
  const invites: Invite[] = [
    { id: 1, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 2, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Expired' },
    { id: 3, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 4, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
    { id: 5, email: 'courtney@gmail.com', role: 'Member', date: '23/10/2024', status: 'Pending' },
  ];

  /* ---------------- STATE ---------------- */
  const [selected, setSelected] = useState<number[]>([]);
  const [selectStatus, setSelectStatus] = useState<'All' | 'Pending' | 'Expired'>('All');

  /* ---------------- FILTER ---------------- */
  const filteredInvites = useMemo(() => {
    if (selectStatus === 'All') return invites;
    return invites.filter((i) => i.status === selectStatus);
  }, [selectStatus, invites]);

  /* ---------------- CHECKBOX LOGIC ---------------- */
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredInvites.map((i) => i.id);
    const allVisibleSelected = visibleIds.every((id) => selected.includes(id));

    if (allVisibleSelected) {
      // unselect only visible rows
      setSelected((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      // select visible rows
      setSelected((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  /* ---------------- ACTIONS ---------------- */
  const resendMultipleInvites = () => {
    if (selected.length === 0) return;

    toast.success('Invites resent successfully.');
    setSelected([]); // ✅ CLEAR ALL CHECKBOXES
  };

  const resendInvite = () => {
    toast.success('Invite resent successfully.');
  };

  const revoke = () => {
    toast.success('Invitation revoked successfully.');
  };

  /* ---------------- UI HELPERS ---------------- */
  const getStatusBadge = (status: Invite['status']) => {
    const base = 'px-3 py-1 rounded-full text-xs font-medium border';

    if (status === 'Pending')
      return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;

    if (status === 'Expired')
      return `${base} bg-red-50 text-red-600 border-red-200`;

    return base;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-blue-600 hover:underline">
          View Pending Invites
        </span>
      </DialogTrigger>

      <DialogContent className="w-full p-6 rounded-2xl bg-white max-h-[90vh] overflow-y-auto" style={{ maxWidth: 640 }}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Pending Invites
          </DialogTitle>
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
            label="Status"
            value={selectStatus}
            setValue={setSelectStatus}
            list={['All', 'Pending', 'Expired']}
          />
        </div>

        {/* TABLE */}
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
                    <span className={getStatusBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="h-5 w-5 cursor-pointer" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem onClick={resendInvite}>
                          Resend Invite
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={revoke}>
                          Revoke
                        </DropdownMenuItem>
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
