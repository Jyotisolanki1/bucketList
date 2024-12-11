import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import AuthGuard from 'utils/route-guard/AuthGuard';

const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));

export default function ThemeRoutes() {
    const { isLoggedIn: reduxIsLoggedIn } = useSelector((state) => state.admin);
    const localStorageIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const isLoggedIn = reduxIsLoggedIn || localStorageIsLoggedIn;

    const routes = isLoggedIn
        ? [AdminRoutes] // Wrap AdminRoutes in an array
        : [
              {
                  path: '/',
                  element: (
                      <NavMotion>
                          <AuthGuard>
                              <LoginPage />
                          </AuthGuard>
                      </NavMotion>
                  )
              },
              LoginRoutes
          ];

    return useRoutes(routes.flat()); // Flatten the array to avoid nested arrays
}
