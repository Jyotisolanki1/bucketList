/* eslint-disable dot-notation */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/admin`;
// Define the initial state
const initialState = {
    faqsData: [],
    loading: false,
    error: null
};

// Create a slice of the Redux store
const faqsSlice = createSlice({
    name: 'faqs',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.faqsData = action.payload.data;
        },
        requestFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Export the actions
export const { requestStart, requestSuccess, requestFailure } = faqsSlice.actions;

export const getFaqs = () => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(requestStart());
        const response = await axios.get(`${PROXY}/faq`);
        console.log();
        if (response) {
            dispatch(requestSuccess(response.data));
        }
    } catch (error) {
        dispatch(requestFailure(error.message));
    }
};

// eslint-disable-next-line consistent-return
export const updateFaqs = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(requestStart());
        const response = await axios.post(`${PROXY}/update-faq`, data);

        return response.data;
    } catch (error) {
        dispatch(requestFailure(error.message));
    }
};

// eslint-disable-next-line consistent-return
export const addFaqs = (data) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        dispatch(requestStart());
        const response = await axios.post(`${PROXY}/faq`, data);

        return response.data;
    } catch (error) {
        dispatch(requestFailure(error.message));
    }
};

// eslint-disable-next-line consistent-return
export const deleteFaq = (id) => async (dispatch) => {
    try {
        const auth = localStorage.getItem('adminToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        dispatch(requestStart());
        const response = await axios.delete(`${PROXY}/delete-faq/${id}`);
        // Send id as an object { id: id }
        return response.data;
    } catch (error) {
        dispatch(requestFailure(error.message));
    }
};
// Export the reducer for use in the Redux store
export default faqsSlice.reducer;
