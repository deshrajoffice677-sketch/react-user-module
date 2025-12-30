import type {
  User,
  BannedUser,
  SuspendedUser,
  AuditLogEntry,
  SampleCourse,
  SubscriptionInfoItem,
  UpcomingCall,
} from '../../types/interface/UsersInterface';

export const users: User[] = [
  {
    id: 1,
    name: 'Robbie Fleming',
    email: 'courtney@gmail.com',
    role: 'Student',
    status: 'Active',
    subscription: 'Monthly',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 2,
    name: 'Kaden Fane',
    email: 'courtney@gmail.com',
    role: 'Student',
    status: 'Banned',
    subscription: 'Yearly',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 3,
    name: 'Brian Bargeman',
    email: 'courtney@gmail.com',
    role: 'Student',
    status: 'Active',
    subscription: 'Monthly',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 4,
    name: 'Juan Attwood',
    email: 'courtney@gmail.com',
    role: 'Moderator',
    status: 'Suspended',
    subscription: 'Free',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: true,
  },
  {
    id: 5,
    name: 'Arnold Aldridge',
    email: 'courtney@gmail.com',
    role: 'Student',
    status: 'Active',
    subscription: 'Free',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 6,
    name: 'Brendan Carroll',
    email: 'courtney@gmail.com',
    role: 'Moderator',
    status: 'Active',
    subscription: 'Monthly',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: true,
  },
  {
    id: 7,
    name: 'Zhanatan Donaldson',
    email: 'courtney@gmail.com',
    role: 'Student',
    status: 'Active',
    subscription: 'Yearly',
    joinedDate: '23/10/2024',
    lastActive: '30 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 8,
    name: 'Emily Carter',
    email: 'emily.carter@gmail.com',
    role: 'Student',
    status: 'Active',
    subscription: 'Monthly',
    joinedDate: '22/10/2024',
    lastActive: '15 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
  {
    id: 9,
    name: 'David Brown',
    email: 'david.brown@gmail.com',
    role: 'Moderator',
    status: 'Active',
    subscription: 'Yearly',
    joinedDate: '21/10/2024',
    lastActive: '5 min ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: true,
  },
  {
    id: 10,
    name: 'Sophia Miller',
    email: 'sophia.miller@gmail.com',
    role: 'Student',
    status: 'Suspended',
    subscription: 'Free',
    joinedDate: '19/10/2024',
    lastActive: '1 hr ago',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    isVerified: false,
  },
];

export const bannedUsers: BannedUser[] = [
  {
    id: 1,
    name: 'Cody Fisher',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Misinformation',
    date: '23/10/2024',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Harassment',
    date: '23/10/2024',
  },
  {
    id: 3,
    name: 'Esther Howard',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Spam',
    date: '23/10/2024',
  },
  {
    id: 4,
    name: 'Theresa Webb',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Severe Abuse',
    date: '24/10/2024',
  },
  {
    id: 5,
    name: 'Albert Flores',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Dangerous Content',
    date: '25/10/2024',
  },
  {
    id: 6,
    name: 'Brooklyn Simmons',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Illegal Activity',
    date: '26/10/2024',
  },
  {
    id: 7,
    name: 'Darlene Robertson',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Multiple Violations',
    date: '26/10/2024',
  },
];

export const suspendedUsers: SuspendedUser[] = [
  {
    id: 1,
    name: 'Ralph Edwards',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Misinformation',
    date: '23/10/2024',
    duration: '3 Days',
  },
  {
    id: 2,
    name: 'Bessie Cooper',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Harassment',
    date: '23/10/2024',
    duration: '7 Days',
  },
  {
    id: 3,
    name: 'Ronald Richards',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Spam',
    date: '23/10/2024',
    duration: '2 Days',
  },
  {
    id: 4,
    name: 'Eleanor Pena',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Misinformation',
    date: '24/10/2024',
    duration: '1 Day',
  },
  {
    id: 5,
    name: 'Wade Warren',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Harassment',
    date: '25/10/2024',
    duration: '10 Days',
  },
  {
    id: 6,
    name: 'Jenny Wilson',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Bullying',
    date: '26/10/2024',
    duration: '5 Days',
  },
  {
    id: 7,
    name: 'Courtney Simmons',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Impersonation',
    date: '27/10/2024',
    duration: '14 Days',
  },
  {
    id: 8,
    name: 'Devon Lane',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    reason: 'Hate Speech',
    date: '27/10/2024',
    duration: '30 Days',
  },
];

export const auditLogData: AuditLogEntry[] = [
  {
    id: 1,
    actionBy: {
      id: 1,
      name: 'Juan Attwood',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    action: 'Suspended',
    user: {
      id: 1,
      name: 'Vishnu Prasad',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    reason: 'Misinformation',
    date: '23/10/2023',
  },
  {
    id: 2,
    actionBy: {
      id: 1,
      name: 'Kaden Fane',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    action: 'Banned',
    user: {
      id: 1,
      name: 'Sigmund Legros',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    reason: 'Harassment',
    date: '23/10/2023',
  },
  {
    id: 3,
    actionBy: {
      id: 1,
      name: 'Colin Miller',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    action: 'Reinstated',
    user: {
      id: 1,
      name: 'Matt Li',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s',
    },
    reason: '-',
    date: '23/10/2023',
  },
];

export const sampleCourses: SampleCourse[] = [
  {
    title: 'Lorem ipsum dolor',
    progress: 76,
    completedLabel: 'Completed',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O42VTWVI0EY_iGy5g0dbXeXkE0ZbZfuc0g&s',
  },
  {
    title: 'Lorem ipsum dolor',
    progress: 32,
    completedLabel: 'In Progress',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O42VTWVI0EY_iGy5g0dbXeXkE0ZbZfuc0g&s',
  },
  {
    title: 'Lorem ipsum dolor',
    progress: 90,
    completedLabel: 'Completed',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O42VTWVI0EY_iGy5g0dbXeXkE0ZbZfuc0g&s',
  },
  {
    title: 'Lorem ipsum dolor',
    progress: 90,
    completedLabel: 'Completed',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O42VTWVI0EY_iGy5g0dbXeXkE0ZbZfuc0g&s',
  },
  {
    title: 'Lorem ipsum dolor',
    progress: 90,
    completedLabel: 'Completed',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4O42VTWVI0EY_iGy5g0dbXeXkE0ZbZfuc0g&s',
  },
];

export const sampleChannels: string[] = ['# Q&A', '# Win', '# Course', '# Announcements', '# Q&A'];

export const subscriptionInfo: SubscriptionInfoItem[] = [
  { label: 'Plan', value: 'Yearly' },
  { label: 'Renewal Date', value: 'April 30, 2025' },
  { label: 'Billing Status', value: 'Active' },
  { label: 'Joined On', value: 'Jan 12, 2024' },
];

export const upcomingCalls: UpcomingCall[] = [
  { title: 'Lorem ipsum dolor', date: 'April 23, 2025 at 3:00 PM', status: 'Ending' },
  { title: 'Lorem ipsum dolor', date: 'April 25, 2025 at 2:00 PM', status: 'Scheduled' },
];
