/* eslint-disable consistent-return */
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
    services: null,
    loading: false,
    buckets: null,
    subCat: null
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
            state.services = action?.payload?.data;
        },
        geBucketSuccess(state, action) {
            state.buckets = action?.payload?.data;
            state.totalPages = action?.payload?.totalPages;
            state.loading = false;
        },

        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.subCat = [];
        },
        getSubCatSuccess(state, action) {
            state.subCat = action.payload.data;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetService = () => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}get-service-cat`);
        if (response.data.success === true) {
            dispatch(slice.actions.requestSuccess(response.data));
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

export const GetBucket = (search, page, limit, category) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());
        const response = await axios.get(`${PROXY}/get-bucket?page=${page}&record=${limit}&search=${search}&category=${category}`);

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

export const GetBucketCount = () => async (dispatch, getState) => {
    try {
        // Get token from the state using the selector
        const auth = selectClientToken(getState());

        console.log('selectClientToken', auth);

        // Set Authorization header with the token
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        if (auth) {
            dispatch(slice.actions.requestStart());

            const response = await axios.get(`${PROXY}/get-bucket-count`);
            console.log(response);

            return response.data;
            // eslint-disable-next-line no-else-return
        } else {
            console.error('Authorization token is missing');
        }
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        console.log(error);
        return error;
    }
};

export const GetSubCat = (id) => async (dispatch, getState) => {
    try {
        const auth = selectClientToken(getState());
        console.log('selectClientToken', auth);

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        if (auth) {
            dispatch(slice.actions.requestStart());

            const response = await axios.get(`${PROXY}get-sub-catgeory?id=${id}`);
            if (response.data.success === true) {
                dispatch(slice.actions.getSubCatSuccess(response.data));
            }
            return response.data;
            // eslint-disable-next-line no-else-return
        } else {
            console.error('Authorization token is missing');
        }
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        console.log(error);
        return error;
    }
};

export const updateService = (data) => async (dispatch, getState) => {
    try {
        const auth = selectClientToken(getState());
        console.log('selectClientToken', auth);

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        if (auth) {
            dispatch(slice.actions.requestStart());

            const response = await axios.post(`${PROXY}update-bucket`, data);
            if (response.data.success === true) {
                dispatch(slice.actions.getSubCatSuccess(response.data));
            }
            return response.data;
            // eslint-disable-next-line no-else-return
        } else {
            console.error('Authorization token is missing');
        }
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        console.log(error);
        return error;
    }
};

export const deleteSubCatApi = (data) => async (dispatch, getState) => {
    try {
        const auth = selectClientToken(getState());
        console.log('checkinng data', data);

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        if (auth) {
            dispatch(slice.actions.requestStart());

            const response = await axios.post(`${PROXY}delete-sub-category`, data);
            // console.log("response",response);
            // // if (response.data.success === true) {
            // //     dispatch(slice.actions.getSubCatSuccess(response.data));
            // // }
            return response.data;
            // eslint-disable-next-line no-else-return
        } else {
            console.error('Authorization token is missing');
        }
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.requestFailure(error.message));
        console.log(error);
        return error;
    }
};
