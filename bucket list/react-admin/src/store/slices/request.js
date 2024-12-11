// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/admin`;

const initialState = {
    error: null,
    requests: [],
    loading: false,
    userList1: [],
    company: []
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
            console.log(action?.payload);
            state.loading = false;
            state.requests = action?.payload?.data.List;
            state.totalPages = action?.payload?.data?.totalPages;
        },
        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        companyName(state, action) {
            console.log('action?.payload?.data', action?.payload?.data);
            state.company = action?.payload?.data;
            state.loading = false;
            state.error = null;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetRequest = (page, limit, search, status, company) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(
            `${PROXY}/get-request?page=${page}&record=${limit}&search=${search}&status=${status}&company=${company}`
        );
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
export const statusChange = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}/update-request-status`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getCompanyName = () => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${PROXY}/get-request-company`);
        dispatch(slice.actions.companyName(response.data));
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
