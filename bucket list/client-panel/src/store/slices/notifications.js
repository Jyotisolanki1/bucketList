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
    allNotifications: []
};

const slice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // ADD NOTIFICATION
        addNotificationSuccess(state, action) {
            state.allNotifications = action.payload.ResponseData;
        },

        // EDIT NOTIFICATION
        editNotificationSuccess(state, action) {
            const index = state.allNotifications.findIndex((notification) => notification.id === action.payload.id);
            if (index !== -1) {
                state.allNotifications[index] = action.payload;
            }
        },

        // DELETE NOTIFICATION
        deleteNotificationSuccess(state, action) {
            state.allNotifications = state.allNotifications.filter((notification) => notification.id !== action.payload.id);
        },

        // GET NOTIFICATION
        getNotificationSuccess(state, action) {
            state.allNotifications = action.payload.ResponseData;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetNotificationsAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get_notification`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getNotificationSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const AddNotificationsAPI = (notification) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add_notification`, notification);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.addNotificationSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
export const UpdateNotificationsAPI = (notification) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-notification`, notification);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.editNotificationSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const DeleteNotificationsAPI = (notificationid) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}delete-notification`, notificationid);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.deleteNotificationSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
