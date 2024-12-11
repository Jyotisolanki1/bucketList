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
const initialState = {
    isAuthenticated: !!localStorage.getItem('adminToken'),
    adminToken: localStorage.getItem('adminToken'),
    name: localStorage.getItem('name'),
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    profile: localStorage.getItem('profile'),
    adminDetails: {},
    loading: true,
    error: null,
    data: []
};

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        Login_Success(state, action) {
            console.log(action?.payload?.data?.profile_pic);
            state.adminToken = action.payload?.token?.accessToken;
            state.name = `${action.payload?.data?.username} `;
            state.isLoggedIn = true;
            state.profile = action?.payload?.data?.profile_pic;
            state.loading = true;
        },

        GetCode_Success(state, action) {
            state.adminToken = action.payload?.ResponseData.token;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },

        GetCode_Failed(state, action) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.error = action.payload;
        },

        // Admin Login Failed
        Login_Failed(state) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
        },
        // Admin secret key verification

        // Admin details
        Admin_Details(state, action) {
            state.adminDetails = action.payload?.ResponseData;
            state.isAuthenticated = true;
            state.loading = false;
        },
        Admin_Details_Refill(state, action) {
            state.name = `${action.payload?.ResponseBody?.first_name} ${action.payload?.ResponseBody?.last_name}`;
            state.profile = action.payload?.ResponseBody?.profile;
            state.loading = false;
        },

        // details failed
        Admin_Details_Failed(state, action) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        // // logout
        SessionLogout(state) {
            state.adminToken = null;
            state.name = null;
            state.profile = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.isAuthenticated = false;
        },
        getProfileSuccess(state, action) {
            state.profile = action.payload;
        },
        // All  Erros
        hasError(state, action) {
            state.error = action.payload;
        },
        updateProfile(state, action) {
            console.log(action);
            state.profile = action.payload?.data?.profile_pic;
            state.name = action.payload?.data?.username;
        }
    }
});

// Reducer
export default slice.reducer;
export const { SessionLogout } = slice.actions;

// ----------------------------------------------------------------------

export const AdminLoginApi = (newData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}login`, newData);

        if (response?.data?.success === true) {
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
        const response = await axios.post(`${PROXY}verify-secret-key`, data, newAuth);
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
    const token = localStorage.getItem('adminToken');
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`
        }
    };
    // const data = { role_type: role };
    try {
        const response = await axios.get(`${PROXY}getprofile`, newAuth);
        if (response.data.succeeded === true) {
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

export const updateProfileApi = (formData) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}update-profile`, formData, {
            headers: {
                Authorization: `bearer ${auth}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(slice.actions.updateProfile(response?.data));
        return response.data;
    } catch (error) {
        return error;
    }
};
export const UpdateProfileApi = (formData) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}updateprofile`, formData, {
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

export const ChangePasswordApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}change-password`, data, {
            headers: {
                Authorization: `bearer ${auth}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ChangeEmployeePasswordApi = (data) => async () => {
    try {
        const auth = localStorage.getItem('adminToken');
        axios.defaults.headers.common.Authorization = `bearer ${auth}`;
        const response = await axios.post(`${PROXY}change-employee-password`, data, {
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
    const token = localStorage.getItem('adminToken');
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${token}`
        }
    };
    // const data = { role_type: role };
    try {
        const response = await axios.get(`${PROXY}get-profile`, newAuth);

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

export const ForgetPasswordApi = (data) => async (dispatch) => {
    try {
        // const response = await axios.post(`${PROXY}login`, data);
        const response = await axios.post(`${PROXY}forget-password`, data);
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetCode_Failed(error));
        return error;
    }
};

export const VerifyOtpApi = async (data) => {
    // const token = localStorage.getItem('adminToken');
    // const newAuth = {
    //     headers: {
    //         'content-type': 'application/json',
    //         Authorization: `bearer ${token}`
    //     }
    // };
    try {
        const response = await axiosApiHelper('post', `${PROXY}verify-otp`, data);
        // console.log(response);
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetCode_Failed(error));
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

// eslint-disable-next-line consistent-return
export const getAllUser = async (data) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}resend-otp`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const sendBulkMailApi = async (data) => {
    try {
        console.log(data);
        const response = await axiosApiHelper('post', `${PROXY}resend-otp`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};
export const ResetPasswordApi = async (formData) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}reset-password`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const logoutfunction = () => async (dispatch) => {
    console.log('cide by sachan sir');
    dispatch(slice.actions.LogoutSession());
};
