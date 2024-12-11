/* eslint-disable consistent-return */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { setAuthSession } from 'config';
import axiosApiHelper from 'utils/axiosHelper';
import { logoutClient } from './clientStatus';

// ----------------------------------------------------------------------
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const PROXY = `${process.env.REACT_APP_API_URL}`;
const initialState = {
    clientToken: localStorage.getItem('clientToken'),
    name: localStorage.getItem('clientName'),
    isClientLoggedIn: localStorage.getItem('isClientLoggedIn'),
    profile: localStorage.getItem('clientProfile'),
    adminDetails: {},
    loading: true,
    error: null,
    // eslint-disable-next-line no-unneeded-ternary
    isAuthenticated: localStorage.getItem('clientToken') ? true : false
};

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        Login_Success(state, action) {
            // console.log(action.payload?.data?.client?.profile_pic);
            state.clientToken = action.payload?.data?.accessToken;
            state.name = `${action.payload?.data?.client?.name}`;
            state.isClientLoggedIn = true;
            state.adminDetails = action.payload?.data;
            state.isAuthenticated = true;
            state.profile = action.payload?.data?.client?.profile_pic;
            state.loading = true;
        },

        GetCode_Success(state, action) {
            state.clientToken = action.payload?.ResponseData.token;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },

        GetCode_Failed(state, action) {
            state.clientToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.error = action.payload;
        },

        // Admin Login Failed
        Login_Failed(state) {
            state.clientToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
        },
        // Admin secret key verification

        // Admin details
        Admin_Details(state, action) {
            state.adminDetails = action.payload?.data?.client;
            state.loading = false;
        },
        Admin_Details_Refill(state, action) {
            console.log('action.payload refill', action.payload);
            state.name = action.payload?.data?.name;
            state.profile = action.payload?.data?.profile_pic;
            state.loading = false;
        },

        // details failed
        Admin_Details_Failed(state, action) {
            state.clientToken = null;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        GetServices(state, action) {
            console.log(action.payload);
            state.services = action.payload?.data;
            state.loading = false;
        },
        GetServices_Failed(state, action) {
            state.services = action.payload?.data;
            state.loading = false;
        },
        GetPerson(state, action) {
            state.salesperson = action.payload?.data;
            state.loading = false;
        },
        GetPerson_Failed(state, action) {
            state.salesperson = action.payload?.data;
            state.loading = false;
        },

        // // logout
        SessionLogout(state) {
            state.clientToken = null;
            state.name = null;
            state.profile = null;
            state.isClientLoggedIn = false;
            state.loading = false;
            state.isAuthenticated = false;
        },
        getProfileSuccess(state, action) {
            state.profile = action.payload;
        },
        // All  Erros
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
export const { SessionLogout } = slice.actions;

// ----------------------------------------------------------------------

export const AdminLoginApi = (newData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}/clientapi/login`, newData);
        console.log(response);
        if (response?.data?.success === true) {
            console.log(response);
            dispatch(slice.actions.Login_Success(response?.data));
        }
        return response?.data;
    } catch (error) {
        dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const VerificationSecretApi = (data, newToken) => async () => {
    const newAuth = {
        headers: {
            authorization: `bearer ${newToken}`
        }
    };
    try {
        const response = await axios.post(`${PROXY}/clientapi/verify-secret-key`, data, newAuth);
        // if (response.data.succeeded === true) {
        //     // dispatch(slice.actions.Login_Verification_Success(response.data));
        //     setAuthSession(response.data.ResponseData?.token);
        // }
        return response.data;
    } catch (error) {
        // dispatch(slice.actions.Login_Verification_Failed(error));
        return error;
    }
};

export const AdminDetailApi = () => async () => {
    const token = localStorage.getItem('clientToken');
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`
        }
    };
    // const data = { role_type: role };
    try {
        const response = await axios.get(`${PROXY}/clientapi/getprofile`, newAuth);
        if (response.data.success === true) {
            dispatch(slice.actions.Admin_Details(response.data));
        } else {
            dispatch(slice.actions.Admin_Details_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        dispatch(slice.actions.Admin_Details_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};

export const updateProfileApi = (formData) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}/clientapi/update-profile`, formData, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(slice.actions.Admin_Details_Refill(response?.data));
        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        return error;
    }
};
export const UpdateProfileApi = (formData) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}/clientapi/updateprofile`, formData, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        if (error.responseCode === 401) {
            logoutClient(dispatch, error.message);
        }
        return error;
    }
};

export const ChangePasswordApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('clientToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}/clientapi/change-password`, data, {
            headers: {
                Authorization: `bearer ${auth}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ProfileApi = () => async () => {
    const token = localStorage.getItem('clientToken');
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`
        }
    };
    // const data = { role_type: role };
    try {
        const response = await axios.get(`${PROXY}/clientapi/get-profile`, newAuth);
        if (response.data.success === true) {
            dispatch(slice.actions.Admin_Details(response.data));
        } else {
            dispatch(slice.actions.Admin_Details_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Admin_Details_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};

export const BusinessCategory = () => async () => {
    try {
        const response = await axios.get(`${PROXY}/user/get-service-cat`);
        if (response.data.success === true) {
            dispatch(slice.actions.GetServices(response.data));
        } else {
            dispatch(slice.actions.GetServices_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetServices_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};

export const SalesPersons = () => async () => {
    try {
        const response = await axios.get(`${PROXY}/user/get-person`);
        if (response.data.success === true) {
            dispatch(slice.actions.GetPerson(response.data));
        } else {
            dispatch(slice.actions.GetPerson_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetServices_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};
export const ForgetPasswordApi = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${PROXY}/clientapi/forget-password`, data);
        if (response) {
            localStorage.setItem('clientTempToken', response?.data?.data?.accessToken);
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetCode_Failed(error));
        return error;
    }
};

export const VerifyOtpApi = async (data, dispatch) => {
    console.log('start');
    try {
        const auth = localStorage.getItem('clientTempToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        // dispatch(slice.actions.requestStart());

        const response = await axios.post(`${PROXY}/clientapi/verify-otp`, data);
        console.log(response);
        if (response.data.success === true) {
            localStorage.setItem('clientTempToken', response?.data?.data?.accessToken);
        }
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        // dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const ResendOtpApi = async (data) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}resend-otp`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
export const ResetPasswordApi = async (data, dispatch) => {
    console.log('start');
    try {
        const auth = localStorage.getItem('clientTempToken');

        axios.defaults.headers.common.Authorization = `bearer ${auth}`;

        // dispatch(slice.actions.requestStart());

        const response = await axios.post(`${PROXY}/clientapi/reset-password`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        // dispatch(slice.actions.requestFailure(error.message));
        return error;
    }
};

export const logoutfunction = () => async (dispatch) => {
    console.log('cide by sachan sir');
    dispatch(slice.actions.LogoutSession());
};

export const selectClientToken = (state) => state.admin.clientToken;
