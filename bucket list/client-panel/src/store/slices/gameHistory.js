// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}admin/`;

const initialState = {
    error: null,
    list: {},
    loading: false
};

const slice = createSlice({
    name: 'gameHistory',
    initialState,
    reducers: {
        requestStart(state) {
            state.loading = true;
            state.error = null;
        },
        requestSuccess(state, action) {
            state.loading = false;
            state.list = action.payload.ResponseData;
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

export const GetGameHistoryAPI =
    (page = 0, record = 10, search = '') =>
    async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('clientToken'));

            axios.defaults.headers.common.Authorization = `bearer ${auth}`;

            dispatch(slice.actions.requestStart());

            const response = await axios.get(`admin/get-all-game-history?page=${page}&record=${record}&search=${search}`);

            if (response.data.succeeded === true) {
                dispatch(slice.actions.requestSuccess(response.data));
            }
            return response.data;
        } catch (error) {
            dispatch(slice.actions.requestFailure(error.message));
            return error;
        }
    };
