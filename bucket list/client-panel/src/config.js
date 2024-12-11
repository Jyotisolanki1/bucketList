import LAYOUT_CONST from 'constant';
import axios from 'utils/axios';
// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'

export const DEV_TOOLS = true; // dev=true Live=false
export const BASE_PATH = '/client'; // dev= /LmsAdmin Live=/
export const BASE_URL = process.env.REACT_APP_API_URL;

export const DEV_CUSTOMIZE = true; // dev=true Live=false
export const DASHBOARD_PATH = '/dashboard';
export const LOGIN_PATH = '/login';
export const HORIZONTAL_MAX_ITEM = 6;

export const setAuthSession = (clientServiceToken) => {
    const auth = localStorage.getItem('clientToken');
    if (clientServiceToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${clientServiceToken}`;
    } else {
        axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
        // localStorage.removeItem('clientServiceToken');
        // delete axios.defaults.headers.common.Authorization;
    }
};
export const ThemeMode = {
    LIGHT: 'light',
    DARK: 'dark'
};
export const ThemeDirection = {
    LTR: 'ltr',
    RTL: 'rtl'
};
const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 10,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

// const config = {
//     layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
//     drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
//     fontFamily: `'Roboto', sans-serif`,
//     borderRadius: 8,
//     outlinedFilled: true,
//     navType: 'light', // light, dark
//     presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
//     locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
//     rtlLayout: false,
//     container: false
// };
export default config;
