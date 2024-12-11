import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import { element } from 'prop-types';
import ViewCategory from 'views/Service/viewService';

// puzzle routing

// notifications routing
const Users = Loadable(lazy(() => import('views/UserList/Index')));
const Client = Loadable(lazy(() => import('views/clientList/Index')));
const Profile = Loadable(lazy(() => import('views/profile/index')));
const GameHistory = Loadable(lazy(() => import('views/GameHistory')));
const HelpCenter = Loadable(lazy(() => import('views/HelpCenter')));

const Notifications = Loadable(lazy(() => import('views/Notifications/Index')));
const PuzzleForm = Loadable(lazy(() => import('views/Puzzle/PuzzleForm')));
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard1/index')));
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const Aboutus = Loadable(lazy(() => import('views/CMS/aboutus')));
const PrivacyPolicy = Loadable(lazy(() => import('views/CMS/privacypolicy')));
const TermConditions = Loadable(lazy(() => import('views/CMS/termsandconditions')));
const Notification = Loadable(lazy(() => import('views/Notifications/Index')));
const MailBroadcast = Loadable(lazy(() => import('views/broadcastMail/mail')));
const FAQS = Loadable(lazy(() => import('views/faqs/list')));
const NotificationBroadcast = Loadable(lazy(() => import('views/broadcastNotification/notification')));
const ClientProfile = Loadable(lazy(() => import('views/clientList/viewClient')));
const Employee = Loadable(lazy(() => import('views/employee/Index')));
const EmployeeProfile = Loadable(lazy(() => import('views/employee/employeeIndex')));
const Request = Loadable(lazy(() => import('views/Request/Index')));
const RequestDetails = Loadable(lazy(() => import('views/Request/viewRequest')));
const ServiceManagement = Loadable(lazy(() => import('views/Service/Index')));
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
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/customer-management',
            element: <Users />
        },
        {
            path: '/client-management',
            element: <Client />
        },
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/service-management',
            element: <ServiceManagement />
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
            path: '/mailbroadcast',
            element: <MailBroadcast />
        },
        {
            path: '/notificationbroadcast',
            element: <NotificationBroadcast />
        },
        {
            path: '/faqs',
            element: <FAQS />
        },
        {
            path: '/client-profile',
            element: <ClientProfile />
        },
        {
            path: '/employee-management',
            element: <Employee />
        },
        {
            path: '/employee-profile',
            element: <EmployeeProfile />
        },
        {
            path: '/request-management',
            element: <Request />
        },
        {
            path: '/request-details',
            element: <RequestDetails />
        },
        {
            path: '/view-category',
            element: <ViewCategory />
        }

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
