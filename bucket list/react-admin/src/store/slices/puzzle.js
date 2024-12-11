// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}admin/`;

const initialState = {
    error: null,
    puzzleData: [],
    columnsOrder: []
};

const slice = createSlice({
    name: 'puzzle',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // ADD PUZZLE
        addPuzzleSuccess(state, action) {
            state.puzzleData.push(action.payload);
        },

        // EDIT PUZZLE
        editPuzzleSuccess(state, action) {
            const index = state.puzzleData.findIndex((puzzle) => puzzle._id === action.payload._id);
            if (index !== -1) {
                state.puzzleData[index] = action.payload;
            }
        },

        // DELETE PUZZLE
        deletePuzzleSuccess(state, action) {
            state.puzzleData = state.puzzleData.filter((puzzle) => puzzle._id !== action.payload._id);
        },

        // GET PUZZLE
        getPuzzleSuccess(state, action) {
            state.puzzleData = action.payload.ResponseData;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

// const token = localStorage.getItem('serviceToken');
// const auth = {
//     headers: {
//         authorization: `bearer ${token}`
//     }
// };
export const GetPuzzlesAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get_puzzles`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getPuzzleSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const AddPuzzlesAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add_puzzle`, formData);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.addPuzzleSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdatePuzzlesAPI = (puzzle) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-puzzle`, puzzle);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.editPuzzleSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const DeletePuzzlesAPI = (puzzle) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}delete-puzzle`, puzzle);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.deletePuzzleSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
