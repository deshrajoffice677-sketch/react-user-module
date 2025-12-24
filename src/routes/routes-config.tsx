import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Courses from '@/pages/Courses';
import MyLearning from '@/pages/MyLearning';
import CourseDetail from '@/pages/CourseDetail';
import UserDetailPage from '@/pages/admin-panel/UserDetailPage';
import UsersPage from '@/pages/admin-panel/UsersPage';

export const routes = [
  {
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      { path: '/', element: <Navigate to="/courses" replace /> },
      { path: 'courses', element: <Courses /> },
      { path: 'course/:id', element: <CourseDetail /> },
      { path: 'my-learning', element: <MyLearning /> },
      { path: 'user-management/users', element: <UsersPage /> },
      { path: 'user-management/users/detail/:id', element: <UserDetailPage /> },
    ],
  },
];
