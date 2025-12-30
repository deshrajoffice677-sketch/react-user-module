import AuditLogTable from '@/components/AdminPanel/AuditLogTable';
import type { User } from '@/types/interface/UsersInterface';
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
import { Badge } from '@/components/ui/badge';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUsers } from '../../helpers/queries/user/useUsers';
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
import Loader from '@/components/AdminPanel/Loader';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: userData = [], isLoading } = useUsers();

  const selectUserList = userData.filter((u: User) => {
    const roleMatch = selectRole === 'All' || u.role === selectRole;
    const statusMatch = selectStatus === 'All' || u.status === selectStatus;
    const subMatch = selectSubscription === 'All' || u.subscription === selectSubscription;
    const searchMatch = searchQuery === '' ||
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    return roleMatch && statusMatch && subMatch && searchMatch;
  });


  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const removeFile = () => setFile(null);
  const { mutateAsync: mutateStatusAsync, isPending: isStatusPending } = useUpdateStatus();
  const [isSending, setIsSending] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const suspendAccount = async (): Promise<void> => {
    const promise = mutateStatusAsync({ id: selectedUserID, status: 'Suspended' });
    toast.promise(promise, {
      loading: 'Suspending user...',
      success: 'User suspended successfully',
      error: 'Failed to suspend user',
    });
    await promise;
    setOpenDropdownId(null);
  };
  const { mutateAsync: deleteUserAsync, isPending: isDeletePending } = useUserDelete();
  const { mutateAsync: reinstateAsync, isPending: isReinstatePending } = useReinstateUser();
  const { mutateAsync: liftAsync, isPending: isLiftPending } = useLiftSuspension();

  const RemoveAccount = async (): Promise<void> => {
    const promise = deleteUserAsync({ id: selectedUserID });
    toast.promise(promise, {
      loading: 'Removing user...',
      success: 'User removed successfully',
      error: 'Failed to remove user',
    });
    await promise;
    setOpenDropdownId(null);
  };

  const cancelClick = () => {
    setOpenDropdownId(null);
  };

  const { data: suspendedUser = [] } = useSuspendedUsers();
  const { data: bannedUser = [] } = useBannedUsers();
  const { data: auditLogData = [] } = useAuditUsers();

  const reinstateUser = (id: number) => {
    const promise = reinstateAsync(id);
    toast.promise(promise, {
      loading: 'Reinstating user...',
      success: 'User reinstated successfully',
      error: 'Failed to reinstate user',
    });
    return promise;
  };

  const liftUserSuspension = (id: number) => {
    const promise = liftAsync(id);
    toast.promise(promise, {
      loading: 'Lifting suspension...',
      success: 'User suspension lifted successfully',
      error: 'Failed to lift suspension',
    });
    return promise;
  };

  const sendInvitation = async () => {
    setIsSending(true);
    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
    toast.promise(promise, {
      loading: 'Sending invitations...',
      success: 'Send invitation successfully.',
      error: 'Failed to send invitations',
    });

    try {
      await promise;
      setFile(null);
    } finally {
      setIsSending(false);
    }
  };

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">User Directory</h2>

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
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Role</span>
                    <DropDownComponent
                      value={selectRole}
                      setValue={setSelectRole}
                      list={['All', 'Moderator', 'Student']}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Status</span>
                    <DropDownComponent
                      value={selectStatus}
                      setValue={setSelectStatus}
                      list={['All', 'Active', 'Suspended', 'Banned']}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Subscription</span>
                    <DropDownComponent
                      value={selectSubscription}
                      setValue={setSelectSubscription}
                      list={['All', 'Free', 'Yearly', 'Monthly']}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm text-gray-600">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900 w-12">#</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Name</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Email</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Role</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Status</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Subscription</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Joined Date</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Last Active</th>
                    <th className="py-4 px-4 text-right font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center">
                        <div className="flex justify-center">
                          <Loader size={32} />
                        </div>
                      </td>
                    </tr>
                  )}
                  {selectUserList && !isLoading &&
                    selectUserList.map((u: User, index: number) => (
                      <tr
                        key={u.id}
                        className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`detail/${u.id}`)}
                      >
                        <td className="py-4 px-4 text-gray-500">{index + 1}</td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="h-10 w-10 rounded-full object-cover border border-gray-100"
                            />
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{u.name}</span>
                              {u.role === 'Moderator' && <ModeratorBadge />}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-gray-500">{u.email}</td>

                        <td className="py-4 px-4 font-medium">{u.role}</td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={
                              u.status === 'Active'
                                ? 'success'
                                : u.status === 'Suspended'
                                  ? 'warning'
                                  : u.status === 'Banned'
                                    ? 'destructive'
                                    : 'secondary'
                            }
                            className="font-medium"
                          >
                            {u.status}
                          </Badge>
                        </td>

                        <td className="py-4 px-4">{u.subscription}</td>
                        <td className="py-4 px-4 text-gray-500">{formatDate(u.joinedDate)}</td>
                        <td className="py-4 px-4 text-gray-500">{timeAgo(u.lastActive)}</td>

                        <td
                          className="py-4 px-4 text-right"
                          onClick={(e) => {
                            setSelectedUserID(u.id);
                            e.stopPropagation();
                          }}
                        >
                          <DropdownMenu
                            open={openDropdownId === u.id}
                            onOpenChange={(open) => {
                              setOpenDropdownId(open ? u.id : null);
                              if (open) setSelectedUserID(u.id);
                            }}
                          >
                            <DropdownMenuTrigger asChild>
                              <i className="fa-solid fa-ellipsis-vertical cursor-pointer p-2 rounded-md hover:bg-gray-100"></i>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              sideOffset={8}
                              className="w-[160px] bg-white rounded-xl shadow-xl border p-1"
                            >
                              {u.role === 'Moderator' ? (
                                <ManageModeratorDialog
                                  className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full"
                                  cancel={cancelClick}
                                />
                              ) : (
                                <MakeModeratorDialog
                                  className="border-none cursor-pointer px-4 py-2 text-sm text-left hover:bg-gray-300 flex justify-start hover:border-4 w-full"
                                  cancel={cancelClick}
                                />
                              )}

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
                                loading={isStatusPending}
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
                                loading={isDeletePending}
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
                  <div className="flex items-center justify-between bg-white border-none rounded-xl p-4 shadow-sm">
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

              <Button
                className="w-full bg-gray-700 text-white hover:bg-gray-400"
                disabled={!file || isSending}
                onClick={() => sendInvitation()}
              >
                {isSending ? 'Sending...' : 'Send Invites'}
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
              loading={isLiftPending}
            />

            <BanedDataDialog
              title="Banned Users"
              data={bannedUser}
              onReinstate={(id: number) => reinstateUser(id)}
              loading={isReinstatePending}
            />
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
