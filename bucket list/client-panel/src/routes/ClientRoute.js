import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// puzzle routing

// notifications routing
const HelpCenter = Loadable(lazy(() => import('views/HelpCenter')));

const Notifications = Loadable(lazy(() => import('views/Notifications/Index')));
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard1/clientDashboard')));
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const Aboutus = Loadable(lazy(() => import('views/CMS/aboutus')));
const PrivacyPolicy = Loadable(lazy(() => import('views/CMS/privacypolicy')));
const TermConditions = Loadable(lazy(() => import('views/CMS/termsandconditions')));
const Notification = Loadable(lazy(() => import('views/Notifications/Index')));
// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboardk',
            element: <DashboardDefault />
        },
        {
            path: '/help-center',
            element: <HelpCenter />
        },

        {
            path: '/notifications',
            element: <Notifications />
        },
        {
            path: '/aboutus',
            element: <Aboutus />
        },
        {
            path: '/privacyandpolicy',
            element: <PrivacyPolicy />
        },
        {
            path: '/termsandcondition',
            element: <TermConditions />
        }
        // {
        //     path: '/notification',
        //     element: <Notification />
        // }
        // {
        //     path: '/daily-puzzle',
        //     element: <Puzzle />
        // },
        // {
        //     path: '/puzzle/PuzzleForm',
        //     element: <PuzzleForm />
        // },
    ]
};

export default AdminRoutes;
