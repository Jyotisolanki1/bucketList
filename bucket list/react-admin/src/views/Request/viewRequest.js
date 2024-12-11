import PropTypes from 'prop-types';

// material-ui
import {
    Box,
    Grid,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    TableHead,
    Paper
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import { useEffect, useState } from 'react';
import moment from 'moment';

// progress component
function LinearProgressWithLabel({ value, ...other }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress value={value} {...other} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| PROFILE - PROFILE ||============================== //

const Profile = () => {
    const [item, setItem] = useState();
    const loading = false;

    useEffect(() => {
        // Retrieve the request data from localStorage
        const res = localStorage.getItem('viewRequestData');
        if (res) {
            setItem(JSON.parse(res));
        }
    }, []);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing} style={{ marginTop: '0%' }}>
                    <Grid item sm={12}>
                        <Typography variant="h3" sx={{ textAlign: 'center' }}>
                            Request Details
                        </Typography>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item lg={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {/* Request Information Section */}
                                <Grid item xs={12} style={{ marginLeft: '3%', marginRight: '3%' }}>
                                    <Typography variant="h4" sx={{ marginLeft: 2, marginBottom: 2 }}>
                                        Request Information
                                    </Typography>
                                    <Paper sx={{ padding: 2, boxShadow: 1 }}>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell variant="head">Company employee</TableCell>
                                                        <TableCell variant="head">Cost code</TableCell>
                                                        <TableCell variant="head">Job title</TableCell>
                                                        <TableCell variant="head">Phone</TableCell>
                                                        <TableCell variant="head">Work scope</TableCell>
                                                        <TableCell variant="head">Requested date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{item?.company_employee || 'N/A'}</TableCell>
                                                        <TableCell>{item?.cost_code || 'N/A'}</TableCell>
                                                        <TableCell>{item?.job_title || 'N/A'}</TableCell>
                                                        <TableCell>{item?.phone || 'N/A'}</TableCell>
                                                        <TableCell>{item?.work_scope || 'N/A'}</TableCell>
                                                        <TableCell>
                                                            {item?.requested_date
                                                                ? moment(item?.requested_date).format('YYYY-MM-DD')
                                                                : 'N/A'}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>

                                {/* Bucket Information Section */}
                                <Grid item xs={12} style={{ marginLeft: '3%', marginRight: '3%' }}>
                                    <Typography variant="h4" sx={{ marginTop: 5, marginLeft: 2, marginBottom: 2 }}>
                                        Bucket Information
                                    </Typography>
                                    <Paper sx={{ padding: 2, boxShadow: 1 }}>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell variant="head">Name</TableCell>
                                                        <TableCell variant="head">Price</TableCell>
                                                        <TableCell variant="head">Description</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{item?.bucketInfo.name || 'N/A'}</TableCell>
                                                        <TableCell>{item?.bucketInfo?.price || 'N/A'}</TableCell>
                                                        <TableCell>{item?.bucketInfo?.description || 'N/A'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>

                                {/* Client Information Section */}
                                <Grid item xs={12} style={{ marginLeft: '3%', marginRight: '3%' }}>
                                    <Typography variant="h4" sx={{ marginTop: 5, marginLeft: 2, marginBottom: 2 }}>
                                        Client Information
                                    </Typography>
                                    <Paper sx={{ padding: 2, boxShadow: 1 }}>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell variant="head">Name</TableCell>
                                                        <TableCell variant="head">Company Name</TableCell>
                                                        <TableCell variant="head">Email</TableCell>
                                                        <TableCell variant="head">Phone</TableCell>
                                                        <TableCell variant="head">Job title</TableCell>
                                                        <TableCell variant="head">Address</TableCell>
                                                        <TableCell variant="head">Status</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{item?.client.name}</TableCell>
                                                        <TableCell>{item?.client.company_name}</TableCell>
                                                        <TableCell>{item?.client.email}</TableCell>
                                                        <TableCell>{item?.client.phone}</TableCell>
                                                        <TableCell>{item?.client?.job_title}</TableCell>
                                                        <TableCell>{item?.client?.address}</TableCell>
                                                        <TableCell>{item?.client?.isStatus}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>

                                {/* User Information Section */}
                                <Grid item xs={12} style={{ marginLeft: '3%', marginBottom: '10px', marginRight: '3%' }}>
                                    <Typography variant="h4" sx={{ marginTop: 5, marginLeft: 2, marginBottom: 2 }}>
                                        User Information
                                    </Typography>
                                    <Paper sx={{ padding: 2, boxShadow: 1 }}>
                                        <TableContainer>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell variant="head">Name</TableCell>
                                                        <TableCell variant="head">Email</TableCell>
                                                        <TableCell variant="head">Phone</TableCell>
                                                        <TableCell variant="head">Company Name</TableCell>
                                                        <TableCell variant="head">Position</TableCell>
                                                        <TableCell variant="head">Status</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{item?.userInfo?.name || 'N/A'}</TableCell>
                                                        <TableCell>{item?.userInfo?.email || 'N/A'}</TableCell>
                                                        <TableCell>{item?.userInfo?.phone || 'N/A'}</TableCell>
                                                        <TableCell>{item?.userInfo?.company_name || 'N/A'}</TableCell>
                                                        <TableCell>{item?.userInfo?.position || 'N/A'}</TableCell>
                                                        <TableCell>{item?.userInfo?.isStatus || 'N/A'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Profile;
