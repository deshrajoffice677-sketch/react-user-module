import { useParams } from 'react-router-dom';
import AlertDialogComponent from '@/components/AdminPanel/AlertDialogComponent';
import PasswordResetDialog from '@/components/AdminPanel/PasswordResetDialog';
import { toast } from 'sonner';
import { ResultDialog } from '@/components/AdminPanel/ResultDialog';
import { useState } from 'react';
import { ManageModeratorDialog } from '@/components/AdminPanel/ManageModeratorDialog';

import MainLayout from '@/components/layout/MainLayout';
import { MakeModeratorDialog } from '@/components/AdminPanel/MakeModeratorDialog';
import { sampleChannels, subscriptionInfo, upcomingCalls } from '@/components/AdminPanel/UsersData';
import { CourseCard } from '@/components/AdminPanel/CourseCard';
import { useUserDetail } from '@/helpers/queries/user/useUserDetail';
import { useUserDelete } from '@/helpers/queries/user/useUserDelete';
import { useUpdateStatus } from '@/helpers/queries/user/useUpdateStatus';
import { useNavigate } from 'react-router-dom';

const UserDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: currentUser } = useUserDetail(Number(id));

  const RemoveAccount = () => toast.success('User removed successfully');

  const [password, setPassword] = useState('');
  const [result, setResult] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: '',
  });

  const resetPassword = () => {
    setResult({
      isOpen: true,
      title: 'Success',
      message: 'Password reset successfully!',
      type: 'success',
    });
  };

  const { mutate: mutateDelete } = useUserDelete();
  const { mutate: mutateStatus } = useUpdateStatus();
  const suspendAccount = (): any => {
    mutateStatus({ id: Number(id), status: 'Suspended' });
  };
  const deleteAccount = (): any => {
    mutateDelete({ id: Number(id) });

    setTimeout(() => {
      navigate('/user-management/users');
    }, 1000);
  };

  if (!currentUser) return <div>No user Found</div>;

  return (
    <MainLayout>
      <div className="w-full bg-[#F8F9FC] p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">User Profile</h1>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg px-3 py-1 text-sm w-60 bg-white shadow-sm"
            />
            <img src={currentUser.avatar} className="w-9 h-9 rounded-full" alt="user" />
          </div>
        </div>

        <div className="bg-[#E9F0FF] p-5 rounded-xl flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold">{currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
          </div>

          {currentUser.role === 'Moderator' ? <ManageModeratorDialog /> : <MakeModeratorDialog />}
        </div>

        <section className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Activity Summary</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
            <SummaryItem label="Last Login" value="Yesterday" />
            <SummaryItem label="Points Earned" value="160" />
            <SummaryItem label="Lessons Completed" value="42" />
            <SummaryItem label="Channels Joined" value="05" />
            <SummaryItem label="Events Attended" value="07" />
            <SummaryItem label="Leaderboard Ranking" value="#12" />
          </div>
        </section>

        <section className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Leaderboard</h3>

          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-sm">Badges</h4>
            <button className="text-xs font-medium text-blue-600">View all Badges</button>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {['Brainiac', 'Creative Thinker', 'Fast Starter', 'Top Scorer', 'Quiz Champion'].map(
              (b, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-lg p-2 text-center text-xs font-medium"
                >
                  {b}
                </div>
              ),
            )}
          </div>

          <h4 className="font-medium text-sm mb-2">Weekly Progress</h4>
          <div className="border rounded-lg p-4 text-center text-gray-500">No Activity Data</div>
        </section>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <CourseCard />

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Channels</h3>

            <div className="flex flex-col gap-3">
              {sampleChannels.map((ch, i) => (
                <div key={i} className="border rounded-lg px-4 py-3 bg-gray-50 text-sm">
                  {ch}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Subscription Info</h3>

            {subscriptionInfo.map((info, i) => (
              <div key={i} className="flex justify-between py-2 border-b last:border-none">
                <span className="text-gray-500 text-sm">{info.label}</span>
                <span className="font-medium text-sm">{info.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Upcoming Calls</h3>

            {upcomingCalls.map((call, i) => (
              <div key={i} className="border p-4 rounded-lg flex justify-between items-center mb-3">
                <div>
                  <p className="font-medium text-sm">{call.title}</p>
                  <p className="text-xs text-gray-500">{call.date}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    call.status === 'Ending'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {call.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
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
          />

          <AlertDialogComponent
            heading="Delete Account"
            message="Delete this Account?"
            messageDescription="Are you sure you want to delete this account?"
            Delete={deleteAccount}
            DeleteButtonText="Delete"
            CancelButtonText="Cancel"
            type="delete"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDetailPage;

const SummaryItem = ({ label, value }: any) => (
  <div className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm">
    <span className="text-gray-500 text-xs">{label}</span>
    <span className="font-semibold text-lg">{value}</span>
  </div>
);
