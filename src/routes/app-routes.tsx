import { useRoutes, BrowserRouter } from 'react-router-dom';
import { routes } from './routes-config';

const AppRoutesList = () => {
  const element = useRoutes(routes);
  return element;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppRoutesList />
    </BrowserRouter>
  );
}

export default AppRoutes;
