// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;
const NEWPROXY = `${process.env.REACT_APP_API_URL}api/bd/`;

const initialState = {
    branchList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    branchLoading: true,
    clusterList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    clusterLoading: true,
    countryLeadList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    countryLeadLoading: true,
    countryLeadDetails: {},
    countryLeadDetailsLoading: true,
    adminList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    adminLoading: true,
    branchTargetList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    branchTargetLoading: true,
    getFilterTargetDetails: [],
    getFilterTargetDetailsLoading: true,
    getBranchDropdownSelectedList: [],
    getBranchDropdownSelectedLoading: true,
    getClDropdownSelectedList: [],
    getClDropdownTargetSelectedLoading: true,
    getBdeDropdownSelectedList: [],
    getBdeDropdownSelectedLoading: true,
    activeBranchList: [],
    clusterDetails: {},
    getLeadsList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getLeadsLoading: true,
    getLeadActivityData: [],
    getLeadActivityLoading: true,
    getCallsList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getCallsLoading: true,
    getCallActivityData: [],
    getCallActivityLoading: true,
    getRfpList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getRfpLoading: true,
    getRfpActivityData: [],
    getRfpActivityLoading: true,
    getProposalList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getProposalLoading: true,
    getDSRList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getDSRLoading: true,
    getClusterDSRList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getClsuterDSRLoading: true,
    getBranchHeadDSRList: {
        docs: [],
        totalDocs: 0,
        limit: 0,
        page: 0,
        totalPages: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    getBranchHeadDSRLoading: true
};

const slice = createSlice({
    name: 'Admin-Action',
    initialState,
    reducers: {
        // Admin Login successfull
        Admin_Get_List_Success(state, action) {
            state.adminList = action.payload?.ResponseData;
            state.adminLoading = false;
        },

        Branch_Get_Success(state, action) {
            state.branchList = action.payload?.ResponseData;
            state.branchLoading = false;
        },

        Branch_Target_Get_Success(state, action) {
            state.branchTargetList = action.payload?.ResponseData;
            state.branchTargetLoading = false;
        },

        Cluster_Get_Success(state, action) {
            state.clusterList = action.payload?.ResponseData;
            state.clusterLoading = false;
        },

        Country_lead_Get_Success(state, action) {
            state.countryLeadList = action.payload?.ResponseData;
            state.countryLeadLoading = false;
        },

        Country_lead_Details_Get_Success(state, action) {
            state.countryLeadDetails = action.payload?.ResponseData;
            state.countryLeadDetailsLoading = false;
        },

        Active_Branch_List_Success(state, action) {
            state.activeBranchList = action.payload?.ResponseData;
        },

        Admin_Leads_Get_List_Success(state, action) {
            state.getLeadsList = action.payload?.ResponseData;
            state.getLeadsLoading = false;
        },

        ClearAdminLeadsData(state) {
            state.getLeadsList = {
                docs: [],
                totalDocs: 0,
                limit: 0,
                page: 0,
                totalPages: 0,
                pagingCounter: 0,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null
            };
            state.getLeadsLoading = true;
        },

        Leads_Details_Activity_Success(state, action) {
            state.getLeadActivityData = action.payload?.ResponseData;
            state.getLeadActivityLoading = false;
        },

        ClearLeadActivityData(state) {
            state.getLeadActivityData = [];
            state.getLeadActivityLoading = true;
        },

        ClearLeadCallDetailsData(state) {
            state.getLeadCallDetailsData = {};
            state.getLeadCallDetailsLoading = true;
        },

        ClearLeadDetailsData(state) {
            state.getLeadDetailsData = {};
            state.getLeadDetailsLoading = true;
        },

        ClearLeadRfpDetailsData(state) {
            state.getRfpDetailsData = {};
            state.getRfpDetailsLoading = true;
        },

        ClearFollowUpCallData(state) {
            state.getFollowUpsCallsDetails = {};
            state.getFollowUpsCallsDetailsLoading = true;
        },

        Get_Filter_Target_Success(state, action) {
            state.getFilterTargetDetails = action.payload?.ResponseData;
            state.getFilterTargetDetailsLoading = false;
        },

        Get_Branch_Dropdown_list_Data_Success(state, action) {
            state.getBranchDropdownSelectedList = action.payload?.ResponseData;
            state.getBranchDropdownSelectedLoading = false;
        },

        Get_CL_Dropdown_target_list_Data_Success(state, action) {
            state.getClDropdownSelectedList = action.payload?.ResponseData;
            state.getClDropdownTargetSelectedLoading = false;
        },

        Get_Selected_Bde_Dropdown_Target_list_Data_Success(state, action) {
            state.getBdeDropdownSelectedList = action.payload?.ResponseData;
            state.getBdeDropdownSelectedLoading = false;
        },

        Get_Calls_List_Success(state, action) {
            state.getCallsList = action.payload?.ResponseData;
            state.getCallsLoading = false;
        },

        Call_Details_Activity_Success(state, action) {
            state.getCallActivityData = action.payload?.ResponseData;
            state.getCallActivityLoading = false;
        },

        Get_RFP_List_Success(state, action) {
            state.getRfpList = action.payload?.ResponseData;
            state.getRfpLoading = false;
        },

        RFP_Details_Activity_Success(state, action) {
            state.getRfpActivityData = action.payload?.ResponseData;
            state.getRfpActivityLoading = false;
        },

        Get_Proposal_List_Success(state, action) {
            state.getProposalList = action.payload?.ResponseData;
            state.getProposalLoading = false;
        },

        Get_DSR_Success(state, action) {
            state.getDSRList = action.payload?.ResponseData;
            state.getDSRLoading = false;
        },

        Get_Cl_DSR_Success(state, action) {
            state.getClusterDSRList = action.payload?.ResponseData;
            state.getClsuterDSRLoading = false;
        },
        Get_Bh_DSR_Success(state, action) {
            state.getBranchHeadDSRList = action.payload?.ResponseData;
            state.getBranchHeadDSRLoading = false;
        }
    }
});

export const {
    ClearLeadActivityData,
    ClearLeadCallDetailsData,
    ClearLeadDetailsData,
    ClearLeadRfpDetailsData,
    ClearFollowUpCallData,
    ClearDsrDetails,
    ClearCallActivityData,
    ClearRFPActivityData,
    ClearAdminLeadsData
} = slice.actions;
// Reducer
export default slice.reducer;
