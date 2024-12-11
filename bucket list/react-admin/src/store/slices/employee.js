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
const COMMON = `${process.env.REACT_APP_API_URL}`;
const initialState = {
    employee: null,
    loading: true,
    error: null
};

const slice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.totalPages = action?.payload?.totalPages;
            state.loading = false;
            state.employee = action?.payload?.List;
        },
        requestAllUserSuccess(state, action) {
            state.loading = false;
            state.clients = action.payload.data.list;
        },
        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        BusinessCategorySuccess(state, action) {
            state.services = action.payload;
        },
        AddEmployeeSuccess(state, action) {
            state.salesperson = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetEmployeeApi = (search, page, limit) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${PROXY}get-employee?page=${page}&record=${limit}&search=${search}`);
        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const statusChangeRequest = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}update-employee-status`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const approveClient = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}approve-client`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const ProfileApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}approve-client`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const updateEmployeeProfileApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}update-employee`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.requestSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const BusinessCategory = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${COMMON}/user/get-business-category`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.BusinessCategorySuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const SalesPersons = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');

        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${COMMON}/user/get-person`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.AddEmployeeSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const addEmployeeApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}register-employee`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.AddEmployeeSuccess(response?.data?.data));
        } else {
            dispatch(slice.actions.requestFailure(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
