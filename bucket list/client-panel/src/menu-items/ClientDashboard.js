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
    IconServicemark,
    IconFileInvoice,
    IconBusinessplan,
    IconHelp
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
    // title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="Dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'bucket',
            title: <FormattedMessage id="Bucket Management" />,
            type: 'item',
            url: '/bucket',
            icon: IconServicemark,
            breadcrumbs: false
        },
        {
            id: 'order',
            title: <FormattedMessage id="Request Management" />,
            type: 'item',
            url: '/request-management',
            icon: IconBusinessplan,
            breadcrumbs: false
        },
        // {
        //     id: 'billing',
        //     title: <FormattedMessage id="Billing Management" />,
        //     type: 'item',
        //     url: '/help-center',
        //     icon: IconFileInvoice,
        //     breadcrumbs: false
        // },
        {
            id: 'helpceter',
            title: <FormattedMessage id="Help Center" />,
            type: 'item',
            url: '/help-center',
            icon: IconHelp,
            breadcrumbs: false
        }
        // {
        //     id: 'game-history',
        //     title: <FormattedMessage id="Game History" />,
        //     type: 'item',
        //     url: '/game-history',
        //     icon: icons.IconTower,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'help-center',
        //     title: <FormattedMessage id="Help Center" />,
        //     type: 'item',
        //     url: '/help-center',
        //     icon: icons.IconMessageReport,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'notifications',
        //     title: <FormattedMessage id="Notifications" />,
        //     type: 'item',
        //     url: '/notifications',
        //     icon: IconBellPlus,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'content-management',
        //     title: <FormattedMessage id="Content Management" />,
        //     type: 'collapse',
        //     icon: icons.IconFileText,
        //     children: [
        //         {
        //             id: 'aboutus',
        //             title: <FormattedMessage id="About Us" />,
        //             type: 'item',
        //             url: '/aboutus'
        //         },
        //         {
        //             id: 'privacyandpolicy',
        //             title: <FormattedMessage id="Privacy Policy" />,
        //             type: 'item',
        //             url: '/privacyandpolicy'
        //         },
        //         {
        //             id: 'termsandcondition',
        //             title: <FormattedMessage id="Terms And Conditions" />,
        //             type: 'item',
        //             url: '/termsandcondition'
        //         }
        //     ]
        // }
    ]
};

export default AdminDashboard;
