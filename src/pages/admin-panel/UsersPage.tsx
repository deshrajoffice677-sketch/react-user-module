import AuditLogTable from '@/components/AdminPanel/AuditLogTable';
import BanedSuspendUserDataDialog from '@/components/AdminPanel/SuspendUserDataDialog';
import DropDownComponent from '@/components/AdminPanel/DropDownComponent';
import PendingInvitesDialog from '@/components/AdminPanel/PendingInvitesDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Trash2 } from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUsers } from "../../helpers/queries/user/useUsers"
import { useUpdateStatus } from '@/helpers/queries/user/useUpdateStatus';
import AlertDialogComponent from '@/components/AdminPanel/AlertDialogComponent';
import { ManageModeratorDialog } from '@/components/AdminPanel/ManageModeratorDialog';
import { MakeModeratorDialog } from '@/components/AdminPanel/MakeModeratorDialog';
import { useSuspendedUsers } from '@/helpers/queries/user/useSuspendedUsers';
import { useBannedUsers } from '@/helpers/queries/user/useBannedUsers';
import BanedDataDialog from '@/components/AdminPanel/BannedUserDataDialog';
import { useAuditUsers } from '@/helpers/queries/user/useAuditUsers';
import { useLiftSuspension } from '@/helpers/queries/user/useLiftSuspension';
import { useReinstateUser } from '@/helpers/queries/user/useReinstateUser';
import { useUserDelete } from '@/helpers/queries/user/useUserDelete';
import { ModeratorBadge } from '@/assets/svg/ModeratorBadge';
import { formatDate } from '@/lib/DateFormatter';
import { timeAgo } from '@/lib/RelativeTime';
import { toast } from 'sonner';

const tabs = [
  { label: 'User Directory', value: 'user-directory' },
  { label: 'Invitations & Onboarding', value: 'invitations' },
  { label: 'Suspensions & Bans', value: 'suspensions' },
  { label: 'Audit Log', value: 'audit-log' },
] as const;

const UsersPage = () => {
  const navigate = useNavigate();

  const [selectRole, setSelectRole] = useState<string>('All');
  const [selectStatus, setSelectStatus] = useState<string>('All');
  const [selectSubscription, setSelectSubscription] = useState<string>('All');


  const { data: userData = [] } = useUsers();

  /* const [selectUserList, setSelectUserList] = useState<any[]>(userData); */
  /* useEffect(() => {
    setSelectUserList(userData);
  }, [userData]) */

  const selectUserList = userData.filter((u: any) => {
    const roleMatch = selectRole === 'All' || u.role === selectRole;
    const statusMatch = selectStatus === 'All' || u.status === selectStatus;
    const subMatch = selectSubscription === 'All' || u.subscription === selectSubscription;
    return roleMatch && statusMatch && subMatch;
  });

  const dropDownItems = [
    {
      Label: 'Role',
      getter: selectRole,
      setter: setSelectRole,
      value: ['All', 'Moderator', 'Student'],
    },
    {
      Label: 'Status',
      getter: selectStatus,
      setter: setSelectStatus,
      value: ['All', 'Active', 'Suspended', 'Banned'],
    },
    {
      Label: 'Subscription',
      getter: selectSubscription,
      setter: setSelectSubscription,
      value: ['All', 'Free', 'Yearly', 'Monthly'],
    },
  ];

  /* useEffect(() => {
    setSelectUserList(
      userData.filter((u: any) => {
        const roleMatch = selectRole === 'All' || u.role === selectRole;
        const statusMatch = selectStatus === 'All' || u.status === selectStatus;
        const subMatch = selectSubscription === 'All' || u.subscription === selectSubscription;
        return roleMatch && statusMatch && subMatch;
      }),
    );
  }, [selectRole, selectStatus, selectSubscription]); */
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const removeFile = () => setFile(null);
  const { mutate: mutateStatus } = useUpdateStatus();



  const [selectedUserID, setSelectedUserID] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);



  const suspendAccount = (): any => {
    setOpenDropdownId(null);
    mutateStatus({ id: selectedUserID, status: "Suspended" });

  }
  const { mutate: deleteUser } = useUserDelete();
  const { mutate: reinstate } = useReinstateUser();
  const { mutate: lift } = useLiftSuspension();

  const RemoveAccount = (): any => {
    setOpenDropdownId(null);
    deleteUser({ id: selectedUserID });
  };

  const cancelClick = () => {
    setOpenDropdownId(null);
  };

  const { data: suspendedUser = [] } = useSuspendedUsers();
  const { data: bannedUser = [] } = useBannedUsers();
  const { data: auditLogData = [] } = useAuditUsers();

  const reinstateUser = (id: number) => {
    reinstate(id);
  };

  const liftUserSuspension = (id: number) => {
    lift(id);
  };

  const sendInvitation = () => {
    toast.success("Send invitation successfully.");
    setFile(null);
  }

  return (
    <>
      <div className="w-full px-4">
        <Tabs defaultValue="user-directory" className="mb-6">
          <TabsList className=" w-full justify-start gap-8 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="user-directory"
            className="mt-4 rounded-2xl bg-white p-6 text-sm text-gray-600"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">User Directory</h2>

              <div className="flex items-center gap-5">
                <div className="relative w-72">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400 text-sm" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10 py-2 h-9 rounded-full border-gray-300 text-sm"
                  />
                </div>
                <div className="flex gap-4 items-center">
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

            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-50 font-extrabold text-black">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Subscription</th>
                    <th className="py-3 px-4 text-left">Joined Date</th>
                    <th className="py-3 px-4 text-left">Last Active</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {selectUserList && selectUserList.map((u: any, index: number) => (
                    <tr
                      key={u.id}
                      className=" hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => navigate(`detail/${u.id}`)}
                    >
                      <td className="py-4 px-4">{index + 1}</td>

                      <td className="py-4 px-4 flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="font-medium">{u.name}</span>

                        {u.role === 'Moderator' && <ModeratorBadge />}
                      </td>

                      <td className="py-4 px-4">{u.email}</td>
                      <td className="py-4 px-4">{u.role}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium border
                            ${u.status === 'Active'
                              ? 'bg-green-100 text-green-600 border-green-200'
                              : u.status === 'Banned'
                                ? 'bg-red-100 text-red-600 border-red-200'
                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }
                          `}
                        >
                          {u.status}
                        </span>
                      </td>

                      <td className="py-4 px-4">{u.subscription}</td>
                      <td className="py-4 px-4">
                        {/* {u.joinedDate} */}
                        {formatDate(u.joinedDate)}

                      </td>
                      <td className="py-4 px-4">
                        {/* {u.lastActive} */}
                        {timeAgo(u.lastActive)}
                      </td>

                      <td className="py-4 px-4 text-right" onClick={(e) => {
                        // alert(u.id)
                        setSelectedUserID(u.id);
                        e.stopPropagation()
                      }}>
                        <DropdownMenu open={openDropdownId === u.id}
                          onOpenChange={(open) => {
                            setOpenDropdownId(open ? u.id : null);
                            if (open) setSelectedUserID(u.id);
                          }}  >
                          <DropdownMenuTrigger asChild >
                            <i className="fa-solid fa-ellipsis-vertical cursor-pointer p-2 rounded-md hover:bg-gray-100"></i>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            sideOffset={8}
                            className="w-[160px] bg-white rounded-xl shadow-xl border p-1"
                          >

                            {u.role === 'Moderator' ? <ManageModeratorDialog className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full" cancel={cancelClick} /> : <MakeModeratorDialog className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full" cancel={cancelClick} />}

                            <AlertDialogComponent
                              isSuspended={u.status}
                              heading="Suspend"
                              message="Suspend this Account?"
                              messageDescription="This will temporarily restrict the user from logging in or accessing any platform features. You can reactivate their account anytime."
                              Delete={suspendAccount}
                              DeleteButtonText="Suspend"
                              CancelButtonText="Close"
                              type="suspend"
                              className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full"
                              cancel={cancelClick}
                            />

                            <AlertDialogComponent
                              heading="Remove user"
                              message="Remove this User from Channels?"
                              messageDescription="The user will be removed from all current channels. They’ll lose access to ongoing discussions and shared files."
                              Delete={RemoveAccount}
                              DeleteButtonText="Remove User"
                              CancelButtonText="Close"
                              type="remove"
                              className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full"
                              cancel={cancelClick}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="invitations" className=" w-full flex justify-start">
            <div className="w-full max-w-3xl space-y-8">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">Invitations</h2>
                <button className="text-sm underline text-gray-600 hover:text-gray-800">
                  <PendingInvitesDialog />
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Enter Email Addresses</p>
                <textarea
                  placeholder="Enter multiple emails separated by commas or new lines"
                  className="w-full border rounded-lg p-3 h-28 text-sm focus:outline-none focus:ring"
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 border-t" />
              </div>

              <div className="space-y-2">
                <p className="font-medium">Upload CSV File</p>
                <p className="text-sm text-gray-600">
                  You can upload a CSV file containing the emails of the users to invite.
                </p>

                {!file && (
                  <label className="px-4 py-2 inline-block bg-gray-200 rounded-md cursor-pointer text-sm">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                  </label>
                )}

                {file && (
                  <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-700 font-bold text-sm">.CSV</span>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(1)} MBs
                        </p>
                      </div>
                    </div>

                    <Trash2
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={removeFile}
                    />
                  </div>
                )}
              </div>

              <Button className="w-full bg-gray-700 text-white hover:bg-gray-400" disabled={!file} onClick={() => sendInvitation()}>
                Send Invites
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="suspensions" className="p-6">
            <BanedSuspendUserDataDialog
              title="Suspended Users"
              data={suspendedUser}
              showDuration={true}
              actionLabel="Lift Suspension"
              onActionClick={(id: number) => liftUserSuspension(id)}
            />



            <BanedDataDialog
              title="Banned Users"
              data={bannedUser}
              onReinstate={(id: number) => reinstateUser(id)} />
          </TabsContent>

          <TabsContent value="audit-log" className="p-6">
            <AuditLogTable title="Audit Log" data={auditLogData} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UsersPage;
