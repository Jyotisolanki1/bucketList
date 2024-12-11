// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/admin`;

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
            console.log(action.payload);
            state.loading = false;
            state.getQuery = action?.payload?.data?.helpList;
            state.totalPages = action?.payload?.data?.totalPages;
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
        const auth = localStorage.getItem('adminToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/help-center?page=${page}&record=${limit}`);
        if (response?.data?.success === true) {
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
    console.log('ugytg');
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}/help-center-reply`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
