// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/api/admin/`;

const initialState = {
    error: null,
    userList1: {},
    loading: false,
    usersList1: []
};

const slice = createSlice({
    name: 'user1',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.totalPages = action?.payload?.ResponseData?.totalPages;
            state.loading = false;
            state.usersList1 = action?.payload?.ResponseData?.List;
        },
        requestAllUserSuccess(state, action) {
            state.loading = false;
            state.usersList = action.payload.ResponseData.list;
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

export const GetUsersAPI = (search, page, limit) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/get-user-list?page=${page}&record=${limit}&search=${search}`);

        if (response.data.succeeded === true) {
            dispatch(slice.actions.requestSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const TotalUsersAPI = () => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`${PROXY}/get-users-count`);

        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const GetUsersAlAPI =
    (search = '') =>
    async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('clientToken'));

            axios.defaults.headers.common.Authorization = `bearer ${auth}`;

            dispatch(slice.actions.requestStart());

            const response = await axios.get(`admin/get-users?search=${search}`);

            if (response.data.succeeded === true) {
                dispatch(slice.actions.requestAllUserSuccess(response.data));
            }
            return response.data;
        } catch (error) {
            dispatch(slice.actions.requestFailure(error.message));
            return error;
        }
    };

export const SendNotificationAPI = (data) => async () => {
    try {
        const auth = JSON.parse(localStorage.getItem('clientToken'));

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.post(`admin/bulk-notifications`, data);
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const AddUserAPI = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        const response = await axios.post(`api/admin/adduser`, data, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const EditUserAPI = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        const response = await axios.post(`api/admin/updateuser`, data, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const DeleteUserAPI = (data) => async () => {
    try {
        const auth = JSON.parse(localStorage.getItem('clientToken'));

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.post(`admin/delete-user`, data);
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
export const statusChange = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(slice.actions.requestStart());

        const response = await axios.get(`api/admin/changestatus?id=${data.id}&status=${data.status}`);
        return response.data;
    } catch (error) {
        dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};
