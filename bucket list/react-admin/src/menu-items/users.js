// third-party
import { FormattedMessage } from 'react-intl';

import { IconUser, IconDeviceAnalytics } from '@tabler/icons';

const icons = {
    IconUser,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - User ||============================== //

const users = {
    id: 'users',
    icon: icons.IconUser,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="Users" />,
            type: 'item',
            url: '/users',
            icon: icons.IconUser,
            breadcrumbs: false
        }
    ]
};

export default users;
