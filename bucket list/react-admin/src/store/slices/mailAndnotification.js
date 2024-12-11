/* eslint-disable consistent-return */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { setAuthSession } from 'config';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const PROXY = `${process.env.REACT_APP_API_URL}/admin/`;
// ----------------------------------------------------------------------

// Define the initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
    viewuser: {},
    userData: {},
    viewLoading: false
};

// Create a slice of the Redux store
const contactSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
            state.viewLoading = true;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.data = action?.payload?.data?.userList;
            state.totalPages = action?.payload?.data?.totalPages;
        },
        requestViewSuccess(state, action) {
            state.viewLoading = false;
            state.viewuser = action?.payload;
        },
        requestSuccessAll(state, action) {
            state.loading = false;
            state.data = action.payload.ResponseBody;
            // state.totalPages = action.payload.ResponseBody.totalPages;
        },
        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the actions
export const { requestStart, requestSuccess, requestSuccessAll, requestFailure, requestViewSuccess } = contactSlice.actions;

export const getAllUser = (search) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(requestStart());
        const response = await axios.get(`${PROXY}get-all-users?search=${search}`, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch(requestSuccess(response.data));
    } catch (error) {
        dispatch(requestFailure(error.message));
    }
};

export const sendBulkMailApi = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(requestStart());
        const response = await axios.post(`${PROXY}send-broadcast-mail`, data, {
            headers: {
                Authorization: `bearer ${auth}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
};

// Export the reducer for use in the Redux store
export default contactSlice.reducer;
