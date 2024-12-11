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
import puzzleReducer from './slices/puzzle';
import notificationReducer from './slices/notifications';

import helpCenterReducer from './slices/helpCenter';
import CmsReducer from './slices/cms';
import gameHistoryReducer from './slices/gameHistory';
import mailAndnotificationReducer from './slices/mailAndnotification';
import faqsReducer from './slices/faqs';
import clientReducer from './slices/client';
import employeeReducer from './slices/employee';
import requestReducer from './slices/request';
import serviceReducer from './slices/service';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    admin: adminReducer,
    snackbar: snackbarReducer,
    puzzle: puzzleReducer,
    notification: notificationReducer,
    user1: userReducer,
    gameHistory: gameHistoryReducer,
    menu: menuReducer,
    helpCenter: helpCenterReducer,
    CMS: CmsReducer,
    mailAndnotification: mailAndnotificationReducer,
    faqs: faqsReducer,
    client: clientReducer,
    employee: employeeReducer,
    request: requestReducer,
    service: serviceReducer,
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
