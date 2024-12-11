// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

const COMMON = `${process.env.REACT_APP_API_URL}`;
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    loading: false,
    cms: []
};

const slice = createSlice({
    name: 'cms',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USER QUERY
        getCmsSuccess(state, action) {
            state.cms = action.payload.ResponseBody;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetCms = () => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.get(`${COMMON}/clientapi/cms`);
        if (response.data.success === true) {
            dispatch(slice.actions.getCmsSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateCms = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${COMMON}/user/cms`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
