import { useParams } from 'react-router-dom';
import AlertDialogComponent from '@/components/AdminPanel/AlertDialogComponent';
import PasswordResetDialog from '@/components/AdminPanel/PasswordResetDialog';
import { toast } from 'sonner';
import { ResultDialog } from '@/components/AdminPanel/ResultDialog';
import { useState } from 'react';
import { ManageModeratorDialog } from '@/components/AdminPanel/ManageModeratorDialog';
import { ArrowLeft, Lock } from 'lucide-react';

import { MakeModeratorDialog } from '@/components/AdminPanel/MakeModeratorDialog';

import { useUserDetail } from '@/helpers/queries/user/useUserDetail';
import { useUserDelete } from '@/helpers/queries/user/useUserDelete';
import { useUpdateStatus } from '@/helpers/queries/user/useUpdateStatus';
import { useNavigate } from 'react-router-dom';
import Leaderboard from '@/components/AdminPanel/Leaderboard';
import { ModeratorBadge } from '@/assets/svg/ModeratorBadge';
import Loader from '@/components/AdminPanel/Loader';

const UserDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: currentUser, isLoading } = useUserDetail(Number(id));

  const { mutateAsync: deleteUserAsync, isPending: isDeletePending } = useUserDelete();

  const RemoveAccount = () => {
    toast.promise(deleteUserAsync({ id: Number(id) }), {
      loading: 'Removing user...',
      success: 'User removed successfully',
      error: 'Failed to remove user',
    });
  };

  const [password, setPassword] = useState('');
  const [result, setResult] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  const resetPassword = () => {
    setResult({
      isOpen: true,
      title: 'Success',
      message: 'Password reset successfully!',
      type: 'success',
    });
  };

  const { mutateAsync: mutateStatusAsync, isPending: isStatusPending } = useUpdateStatus();
  const suspendAccount = (): void => {
    toast.promise(mutateStatusAsync({ id: Number(id), status: 'Suspended' }), {
      loading: 'Suspending account...',
      success: 'Account suspended successfully',
      error: 'Failed to suspend account',
    });
  };
  const deleteAccount = (): void => {
    toast.promise(
      deleteUserAsync({ id: Number(id) }).then(() => {
        setTimeout(() => {
          navigate('/user-management/users');
        }, 1000);
      }),
      {
        loading: 'Deleting account...',
        success: 'Account deleted successfully',
        error: 'Failed to delete account',
      },
    );
  };

  if (!currentUser && isLoading)
    return (
      <>
        {' '}
        <div className="min-h-screen flex items-center justify-center">
          <Loader size={32} />
        </div>
      </>
    );

  return (
    <>
      <div className="w-full bg-[#F8F9FC] p-6">
        <div className="flex items-center  mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-6 w-6 text-gray-900" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>
        </div>

        <div className="bg-[#E9F0FF] p-5 rounded-xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} className="w-16 h-16 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold leading-none">{currentUser.name}</h2>

                {currentUser.role === 'Moderator' && <ModeratorBadge />}
              </div>

              <p className="text-sm text-gray-500 mt-1">{currentUser.email}</p>
            </div>
          </div>

          {currentUser.role === 'Moderator' ? <ManageModeratorDialog /> : <MakeModeratorDialog />}
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-[-15px]">Activity Summary</h3>
        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12 text-sm">
            <div>
              <p className="text-gray-500">Last Login</p>
              <p className="text-base font-semibold text-gray-900 mt-1">Yesterday</p>
            </div>

            <div>
              <p className="text-gray-500">Lessons Completed</p>
              <p className="text-base font-semibold text-gray-900 mt-1">42</p>
            </div>

            <div>
              <p className="text-gray-500">Events Attended</p>
              <p className="text-base font-semibold text-gray-900 mt-1">07</p>
            </div>

            <div>
              <p className="text-gray-500">Points Earned</p>
              <p className="text-base font-semibold text-gray-900 mt-1">160</p>
            </div>

            <div>
              <p className="text-gray-500">Channels Joined</p>
              <p className="text-base font-semibold text-gray-900 mt-1">05</p>
            </div>

            <div>
              <p className="text-gray-500">Leaderboard Ranking</p>
              <p className="text-base font-semibold text-gray-900 mt-1">#12</p>
            </div>
          </div>
        </section>

        <Leaderboard />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Courses</h3>

            <div className="bg-white rounded-xl border border-gray-200 p-6 h-[280px]">
              <div className="space-y-6 h-full overflow-y-auto">
                {[
                  { title: 'Lorem ipsum dolor', progress: 100, status: 'Completed' },
                  { title: 'Lorem ipsum dolor', progress: 40, status: 'In progress' },
                  { title: 'Lorem ipsum dolor', progress: 100, status: 'Completed' },
                ].map((course, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_u0S7cYc4ncDdS9rZo8a-cvDrt9Vuu1gSww&s"
                      className="w-12 h-12 rounded-md object-cover"
                      alt=""
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{course.title}</p>

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            course.status === 'Completed'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">{course.progress}% completed</p>

                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-2 bg-gray-900 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Channels</h3>

            <div className="bg-white rounded-xl border border-gray-200 h-[280px] overflow-y-auto">
              <div className="divide-y divide-gray-100 text-sm">
                <div className="py-4 px-6"># Q&amp;A</div>
                <div className="py-4 px-6"># Wins</div>
                <div className="py-4 px-6 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-700" />
                  <span>Private</span>
                </div>
                <div className="py-4 px-6"># Course</div>
                <div className="py-4 px-6"># Q&amp;A</div>
              </div>
            </div>
          </div>

          <div className="h-[260px]">
            <h3 className="font-semibold text-lg mb-4">Subscription Info</h3>

            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
              <div className="divide-y divide-gray-100 text-sm flex-1 overflow-y-auto">
                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">{currentUser.subscription}</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Renewal Date</span>
                  <span className="font-medium">April 30, 2025</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Billing Status</span>
                  <span className="font-medium">Active</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Joined On</span>
                  <span className="font-medium">
                    {new Date(currentUser.joinedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[260px]">
            <h3 className="font-semibold text-lg mb-4">Upcoming Calls</h3>

            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
              <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
                {[{ status: 'Going' }, { status: 'Not Going' }, { status: 'Going' }].map(
                  (call, i) => (
                    <div key={i} className="flex justify-between items-center py-4">
                      <div>
                        <p className="font-medium text-sm">Lorem ipsum dolor</p>
                        <p className="text-xs text-gray-500">April 30, 2025 at 2:00 PM</p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          call.status === 'Going'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {call.status}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-20 mb-[-25px]">
          <PasswordResetDialog
            heading="Reset Password"
            password={password}
            setPassword={setPassword}
            resetPassword={resetPassword}
          />

          {result.isOpen && (
            <ResultDialog
              type={result.type}
              isOpen={result.isOpen}
              setIsOpen={() => setResult((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              title={result.title}
              message={result.message}
            />
          )}

          <AlertDialogComponent
            heading="Remove this User from Channels"
            message="Remove this User from Channels?"
            messageDescription="The user will be removed from all current channels. They’ll lose access to ongoing discussions and shared files."
            Delete={RemoveAccount}
            DeleteButtonText="Remove User"
            CancelButtonText="Close"
            type="remove"
            loading={isDeletePending}
          />

          <AlertDialogComponent
            isSuspended={currentUser.status}
            heading="Suspend Account"
            message="Suspend this Account?"
            messageDescription="This will temporarily restrict the user from logging in or accessing any platform features. You can reactivate their account anytime."
            Delete={suspendAccount}
            DeleteButtonText="Suspend"
            CancelButtonText="Close"
            type="suspend"
            loading={isStatusPending}
          />

          <AlertDialogComponent
            heading="Delete Account"
            message="Delete this Account?"
            messageDescription="Are you sure you want to delete this account?"
            Delete={deleteAccount}
            DeleteButtonText="Delete Account"
            CancelButtonText="Close"
            type="delete"
            loading={isDeletePending}
          />
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
