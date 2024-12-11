/* eslint-disable prettier/prettier */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { selectClientToken } from './adminAuth';
import { logoutClient } from './clientStatus';
// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/clientapi/`;

const initialState = {
    error: null,
    requests: null,
    loading: false,
    buckets: null
};

const slice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.requests = action?.payload?.List;
            state.totalPages = action?.payload?.totalPages;
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

export const getRequest = (search, page, limit) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('clientToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${PROXY}get-request?page=${page}&record=${limit}&search=${search}`);

        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        console.log('response?.data?.status', error);
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const Addbucket = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.post(`${PROXY}add-bucket`, data);

        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const GetBucket = () => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/get-bucket`);
        console.log(response);
        if (response.data.success === true) {
            dispatch(slice.actions.geBucketSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const updateRequestStatus = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.post(`${PROXY}/update-request-status`, data);

        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const GetRequestCount = () => async (dispatch, getState) => {
    try {
        const auth = selectClientToken(getState());

        console.log('selectClientToken', auth);
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${PROXY}/get-request-count`);
        console.log(response);

        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
