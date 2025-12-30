import { useState } from 'react';
import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiBook,
  FiHome,
  FiBookOpen,
  FiAward,
  FiSettings,
  FiUser,
} from 'react-icons/fi';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import logo from '../../assets/images/mb.png';

type NavItemProps = {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  sidebarOpen: boolean;
  onClick?: () => void;
};


interface MainLayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const NavItem = ({ icon, text, isActive, sidebarOpen, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center px-4 py-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'} cursor-pointer`}
  >
    <span className="text-xl">{icon}</span>
    {sidebarOpen && <span className="ml-3 font-medium">{text}</span>}
  </div>
);

const MainLayout = ({
  children,
  showSearch = true,
  searchPlaceholder = 'Search for courses...',
}: MainLayoutProps) => {
  const [sidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isStartsWith = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-54' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col flex-shrink-0`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <FiBook />
            </div>
          )}
        </div>

        <nav className="flex-1 mt-8">
          <NavItem
            icon={<FiHome />}
            text="Home"
            isActive={isActive('/')}
            sidebarOpen={sidebarOpen}
            onClick={() => navigate('/')}
          />
          <NavItem
            icon={<FiBookOpen />}
            text="Courses"
            isActive={isStartsWith('/courses') || isStartsWith('/course/')}
            sidebarOpen={sidebarOpen}
            onClick={() => navigate('/courses')}
          />
          <NavItem
            icon={<FiAward />}
            text="Achievements"
            isActive={isActive('/achievements')}
            sidebarOpen={sidebarOpen}
            onClick={() => navigate('/achievements')}
          />
          <NavItem
            icon={<FiSettings />}
            text="Settings"
            isActive={isActive('/settings')}
            sidebarOpen={sidebarOpen}
            onClick={() => navigate('/settings')}
          />
          <NavItem
            icon={<FiUser />}
            text="Users"
            isActive={isStartsWith('/user-management')}
            sidebarOpen={sidebarOpen}
            onClick={() => navigate('/user-management/users')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            {showSearch && (
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-5 top-3 text-black" />
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <FiMessageSquare size={20} />
              </button>
              <button className="p-2 text-black hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  U
                </div>
                {sidebarOpen && <span className="text-sm font-medium">User Name</span>}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 w-full">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
