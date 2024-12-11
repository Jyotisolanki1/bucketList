// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconBell,
    IconHistory,
    IconChartInfographic,
    IconTargetArrow,
    IconUsers,
    IconFileText,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics,
    IconMessageReport,
    IconBellPlus,
    IconHelp,
    IconMail,
    IconNotification,
    IconMessages,
    IconEmphasis,
    IconTruckDelivery,
    IconServicemark
} from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconFileText,
    IconHistory,
    IconChartInfographic,
    IconTargetArrow,
    IconUsers,
    IconBell,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics,
    IconMessageReport
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const AdminDashboard = {
    id: 'dashboard',
    // title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'user-management',
            title: <FormattedMessage id="User Management" />,
            type: 'collapse',
            icon: icons.IconFileText,
            children: [
                {
                    id: 'clientmanagment',
                    title: <FormattedMessage id="Client Management" />,
                    type: 'item',
                    url: '/client-management'
                },
                {
                    id: 'customermanagement',
                    title: <FormattedMessage id="Customer Management" />,
                    type: 'item',
                    url: '/customer-management'
                }
            ]
        },
        {
            id: 'employeemanagement',
            title: <FormattedMessage id="Employee Management" />,
            type: 'item',
            url: '/employee-management',
            icon: IconEmphasis,
            breadcrumbs: false
        },
        {
            id: 'requestmanagement',
            title: <FormattedMessage id="Request Management" />,
            type: 'item',
            url: '/request-management',
            icon: IconTruckDelivery,
            breadcrumbs: false
        },
        {
            id: 'servicemanagement',
            title: <FormattedMessage id="Service Management" />,
            type: 'item',
            url: '/service-management',
            icon: IconServicemark,
            breadcrumbs: false
        },
        {
            id: 'helpcenter',
            title: <FormattedMessage id="Help Center" />,
            type: 'item',
            url: '/help-center',
            icon: IconHelp,
            breadcrumbs: false
        },

        {
            id: 'faqs',
            title: <FormattedMessage id="FAQS" />,
            type: 'item',
            url: '/faqs',
            icon: IconMessages,
            breadcrumbs: false
        },
        {
            id: 'broadcast-mail',
            title: <FormattedMessage id="Broadcast Mail" />,
            type: 'item',
            url: '/mailbroadcast',
            icon: IconMail,
            breadcrumbs: false
        },
        {
            id: 'broadcast-notification',
            title: <FormattedMessage id="Broadcast Notification" />,
            type: 'item',
            url: '/notificationbroadcast',
            icon: IconNotification,
            breadcrumbs: false
        },
        // {
        //     id: 'notifications',
        //     title: <FormattedMessage id="Notifications" />,
        //     type: 'item',
        //     url: '/notifications',
        //     icon: IconBellPlus,
        //     breadcrumbs: false
        // },
        {
            id: 'content-management',
            title: <FormattedMessage id="CMS" />,
            type: 'collapse',
            icon: icons.IconFileText,
            children: [
                {
                    id: 'aboutus',
                    title: <FormattedMessage id="About Us" />,
                    type: 'item',
                    url: '/aboutus'
                },
                {
                    id: 'privacyandpolicy',
                    title: <FormattedMessage id="Privacy Policy" />,
                    type: 'item',
                    url: '/privacyandpolicy'
                },
                {
                    id: 'termsandcondition',
                    title: <FormattedMessage id="Terms And Conditions" />,
                    type: 'item',
                    url: '/termsandcondition'
                }
            ]
        }
    ]
};

export default AdminDashboard;
