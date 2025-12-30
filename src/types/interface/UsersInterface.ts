export interface BaseUser {
  id: number;
  name: string;
  avatar: string;
}

export interface User extends BaseUser {
  email: string;
  role: 'Student' | 'Moderator' | 'Admin';
  status: 'Active' | 'Banned' | 'Suspended';
  subscription: 'Free' | 'Monthly' | 'Yearly';
  joinedDate: string;
  lastActive: string;
  isVerified: boolean;
}

export interface BannedUser extends BaseUser {
  reason: string;
  date: string;
  user?: BaseUser;
  userId?: number;
}

export interface SuspendedUser extends BaseUser {
  reason: string;
  date: string;
  duration: string;
  user?: BaseUser;
  userId?: number;
}

export interface AuditLogEntry {
  id: number;

  actionBy: BaseUser;

  action: 'Suspended' | 'Banned' | 'Lift Suspension' | 'Reinstated';

  user: BaseUser;
  moderator?: BaseUser;
  student?: BaseUser;
  reason: string;
  date: string;
}
export interface SampleCourse {
  title: string;
  progress: number;
  completedLabel: 'Completed' | 'In Progress';
  image: string;
}

export type Channel = 'Q&A' | 'Write' | 'Private' | 'Courses';

export interface SubscriptionInfoItem {
  label: string;
  value: string;
}

export interface UpcomingCall {
  title: string;
  date: string;
  status: 'Ending' | 'Scheduled';
}
