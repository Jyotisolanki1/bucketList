/* eslint-disable import/no-unresolved */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ViewBucket from 'views/ServiceManagement/viewService';

// puzzle routing

// notifications routing
const Service = Loadable(lazy(() => import('views/ServiceManagement/Index')));
const Profile = Loadable(lazy(() => import('views/profile/index')));
const HelpCenter = Loadable(lazy(() => import('views/HelpCenter')));

const Notifications = Loadable(lazy(() => import('views/Notifications/Index')));
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard1/index')));
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const Aboutus = Loadable(lazy(() => import('views/CMS/aboutus')));
const PrivacyPolicy = Loadable(lazy(() => import('views/CMS/privacypolicy')));
const TermConditions = Loadable(lazy(() => import('views/CMS/termsandconditions')));
const Request = Loadable(lazy(() => import('views/request/Index')));
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
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/bucket',
            element: <Service />
        },
        {
            path: '/profile',
            element: <Profile />
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
        },
        {
            path: '/request-management',
            element: <Request />
        },
        {
            path: '/*',
            element: <DashboardDefault />
        },
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/view-bucket',
            element: <ViewBucket />
        }
        // {
        //     path: '/puzzle/PuzzleForm',
        //     element: <PuzzleForm />
        // },
    ]
};

export default AdminRoutes;
