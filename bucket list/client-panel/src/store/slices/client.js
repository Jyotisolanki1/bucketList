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

const PROXY = `${process.env.REACT_APP_API_URL}/user/`;
const COMMON = `${process.env.REACT_APP_API_URL}`;
const initialState = {
    buckets: null,
    loading: true,
    error: null,
    data: [],
    salesperson: [],
    services: []
};

const slice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.buckets = action?.payload;
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
        SalesPersonSuccess(state, action) {
            state.salesperson = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetClientApi = () => async () => {
    try {
        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${COMMON}/clientapi/get-buckets`);
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
        const response = await axios.post(`${PROXY}change-status`, data);
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

export const updateProfileApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${PROXY}update-client`, data);
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
        const response = await axios.get(`${COMMON}/user/get-service-cat`, data);
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
            dispatch(slice.actions.SalesPersonSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const addClientApi = (data) => async () => {
    try {
        dispatch(slice.actions.requestStart());
        const response = await axios.post(`${COMMON}/user/create-client`, data);
        if (response?.data?.success === true) {
            dispatch(slice.actions.SalesPersonSuccess(response?.data?.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

// export const AddUserAPI = (data) => async () => {
//     try {

//         const response = await axios.post(`api/admin/adduser`, data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// };
