/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import {
    Grid,
    Typography,
    OutlinedInput,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Pagination,
    Button,
    TableHead,
    TableRow
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import AddClient from './addClient';

import { useDispatch, useSelector } from 'store';
import { getRequest } from 'store/slices/request';
import EditStatus from './EditStatus';
import Skeleten from 'utils/Skeleton';
import moment from 'moment';

const Index = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [idRequest, setId] = React.useState();
    const [status, setStatus] = React.useState(true);
    const [requestStatus, setRequestStatus] = React.useState();
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [search, setSearch] = React.useState('');

    const handleChangeStatus = (row) => {
        setId(row._id);
        setRequestStatus(row?.isStatus);
        setOpenEdit(true);
    };
    const changeAdd = (flag) => {
        setOpenEdit(false);
        if (flag === true) {
            setStatus(!status);
        }
    };
    const { requests, loading, totalPages } = useSelector((state) => state.request);

    React.useEffect(() => {
        dispatch(getRequest(search, page, limit));
    }, [search, page, limit, dispatch, status, openEdit, open]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const searchData = (e) => {
        setSearch(e.target.value);
    };
    return (
        <>
            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing} style={{ marginTop: '0%' }}>
                        <Grid item>
                            <Typography variant="h3">Requests List</Typography>
                        </Grid>
                        <Grid item>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search By Request Id"
                                startAdornment={<InputAdornment position="start" />}
                                size="large"
                                onChange={searchData}
                            />
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>S.no.</TableCell>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Bucket Name</TableCell>
                                <TableCell>Bucket Category</TableCell>
                                <TableCell>Requested Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <Skeleten count={6} />}
                            {!loading &&
                                requests?.length > 0 &&
                                requests.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>

                                        <TableCell>{row?.request_id}</TableCell>
                                        <TableCell>{row?.bucketInfo?.name}</TableCell>
                                        <TableCell>{row?.bucketInfo?.category?.name}</TableCell>
                                        <TableCell>
                                            {row?.requested_date ? moment(row?.requested_date).format('MM-DD-YYYY') : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {row?.isStatus === 'Completed' ? (
                                                // Display plain text if status is "Completed"
                                                <Typography
                                                    style={{
                                                        color: 'green',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {row?.isStatus}
                                                </Typography>
                                            ) : (
                                                // Display button for other statuses
                                                <Button
                                                    variant="contained"
                                                    color={
                                                        row?.isStatus === 'Approved'
                                                            ? 'primary'
                                                            : row?.isStatus === 'In Process'
                                                            ? 'error'
                                                            : 'default'
                                                    }
                                                    onClick={() => handleChangeStatus(row)}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        textTransform: 'capitalize',
                                                        padding: '4px 12px',
                                                        borderRadius: '8px'
                                                    }}
                                                >
                                                    {row?.isStatus}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!loading && !(requests?.length > 0) && (
                                <TableRow>
                                    <TableCell colSpan={6}>Request Not Found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination count={totalPages} page={page} color="primary" onChange={handleChangePage} />
                        </Grid>
                    </Grid>
                </Grid>
                {openEdit && <EditStatus open={openEdit} close={(flag) => changeAdd(flag)} data={{ idRequest, requestStatus }} />}
            </MainCard>
        </>
    );
};

export default Index;
