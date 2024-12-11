// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/admin`;

const initialState = {
    error: null,
    services: [],
    loading: false
};

const slice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.services = action?.payload?.data.List;
            state.totalPages = action?.payload?.data?.totalPages;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetServiceApi = (page, limit, search, status, company) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/get-category?page=${page}&record=${limit}`);
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
export const AddServiceAPI = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}/add-category`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateServiceApi = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}/update-category`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteSubCatApi = (id) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.delete(`${PROXY}/delete-sub-category?id=${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const statusChangeRequest = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}/change-service-status`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
