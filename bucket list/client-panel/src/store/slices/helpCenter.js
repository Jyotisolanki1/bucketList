// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { logoutClient } from './clientStatus';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/clientapi/`;

const initialState = {
    error: null,
    getQuery: [],
    loading: false
};

const slice = createSlice({
    name: 'helpCenter',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.getQuery = action?.payload?.ResponseData?.List;
            state.totalPages = action?.payload?.ResponseData?.totalPages;
        },
        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetUserQuery = (page, limit) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/api/admin/help-center?page=${page}&record=${limit}`);

        if (response.data.succeeded === true) {
            dispatch(slice.actions.requestSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        console.log('error', error);
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const replyQuery = (data) => async (dispatch) => {
    try {
        const auth = JSON.parse(localStorage.getItem('clientToken'));
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`admin/update-query`, data, auth);
        return response.data;
    } catch (error) {
        return error;
    }
};
// export const sendHelpCenterMailRequest = (data) => async (dispatch) => {
//     try {
//         const auth = localStorage.getItem('clientToken');
//         axios.defaults.headers.common.Authorization = `bearer ${auth}`;
//         const response = await axios.post(`${PROXY}help-center`, data);
//         return response.data;
//     } catch (error) {
//         if (error.responseCode === 401) {
//             logoutClient(dispatch, error.message);
//         }
//         return error;
//     }
// };

export const sendHelpCenterMailRequest = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.post(`${PROXY}help-center`, data);

        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
