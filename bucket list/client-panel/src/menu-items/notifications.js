// third-party
import { FormattedMessage } from 'react-intl';

import { IconBell, IconDeviceAnalytics } from '@tabler/icons';

const icons = {
    IconBell,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - NOTIFICATIONS ||============================== //

const notifications = {
    id: 'help-center',
    icon: icons.IconBell,
    type: 'group',
    children: [
        {
            id: 'help-center',
            title: <FormattedMessage id="Help Center" />,
            type: 'item',
            url: '/help-center',
            icon: icons.IconBell,
            breadcrumbs: false
        }
    ]
};

export default notifications;
