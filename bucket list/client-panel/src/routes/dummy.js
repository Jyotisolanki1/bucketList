/* eslint-disable no-nested-ternary */
import { useRoutes, useNavigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AdminRoutes from './AdminRoutes';
import ClientRoutes from './ClientRoute'; // Client specific routes
import Loadable from 'ui-component/Loadable';
import NavMotion from 'layout/NavMotion';
import AuthGuard from 'utils/route-guard/AuthGuard';

const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
const ClientLoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication1/clientLogin')));

export default function ThemeRoutes() {
    const { isClientLoggedIn: reduxisClientLoggedIn, role } = useSelector((state) => state.admin);
    const localStorageisClientLoggedIn = localStorage.getItem('isClientLoggedIn') === 'true';
    const localStorageRole = localStorage.getItem('role');

    const isClientLoggedIn = reduxisClientLoggedIn || localStorageisClientLoggedIn;
    const currentRole = role || localStorageRole;

    const navigate = useNavigate();

    // Redirect admin to dashboard if they try to access client login
    useEffect(() => {
        if (currentRole === 'admin' && window.location.pathname === '/client-login') {
            navigate('/admin-dashboard', { replace: true });
        }
    }, [currentRole, navigate]);

    // Define routes based on role
    const routes = [
        // Client login route should always be available to both admins and non-logged-in users
        
        {
            path: '/client-login', // Client login page
            element: (
                <NavMotion>
                    <ClientLoginPage />
                </NavMotion>
            )
        },
        ...(!isClientLoggedIn // If not logged in, show the public login routes
            ? [
                  {
                      path: '/', // Public login page
                      element: (
                          <NavMotion>
                              <AuthGuard>
                                  <LoginPage />
                              </AuthGuard>
                          </NavMotion>
                      )
                  },
                  ...LoginRoutes // Include other login-related public routes
              ]
            : currentRole === 'admin' // If logged in as admin, show admin routes
            ? [AdminRoutes]
            : currentRole === 'client' // If logged in as client, show client routes
            ? [ClientRoutes]
            : [LoginRoutes]) // Default to empty if no valid role
    ];

    return useRoutes(routes.flat()); // Flatten the array to avoid nested arrays
}
