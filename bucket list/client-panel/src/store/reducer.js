// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import userReducer from './slices/user1';
import cartReducer from './slices/cart';
import menuReducer from './slices/menu';
import adminReducer from './slices/adminAuth';
import notificationReducer from './slices/notifications';

import helpCenterReducer from './slices/helpCenter';
import CmsReducer from './slices/cms';
import gameHistoryReducer from './slices/gameHistory';
import serviceReducer from './slices/service';
import requestReducer from './slices/request';
import clientReducer from './slices/client';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    admin: adminReducer,
    snackbar: snackbarReducer,
    notification: notificationReducer,
    user1: userReducer,
    gameHistory: gameHistoryReducer,
    menu: menuReducer,
    helpCenter: helpCenterReducer,
    CMS: CmsReducer,
    service: serviceReducer,
    request: requestReducer,
    client: clientReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    )
});

export default reducer;
