/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Container, DialogContent } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from 'store/slices/snackbar';
import Skeleton from '@mui/material/Skeleton';
import { GetCms } from 'store/slices/cms';
import { ThemeMode } from 'config';

const AboutUs = ({ item, open, close }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [loadingpage, setLoading] = useState(false);
    const [aboutData, setAbout] = React.useState(true);
    const [imageError, setImageError] = React.useState('');
    const [status, setStatus] = React.useState(true);
    const PROXY = process.env.REACT_APP_API_URL;
    const [salesPersonsVal, setSalesPersonsVal] = useState([]);
    // const { services, salesperson } = useSelector((state) => state.client);

    const fetchCms = async () => {
        const res = await dispatch(GetCms());
        const urlParams = new URL(window.location.href).searchParams;
        const cms = decodeURIComponent(urlParams.get('cms'));

        if (res.success === true) {
            if (cms === 'aboutus') {
                const about = res?.data?.find((item) => item.type === 'About Us'); // Replace with your actual condition
                setTitle('About Us');
                if (about) {
                    setAbout(about);
                }
                setLoading(false);
            } else if (cms === 'privacypolicy') {
                const about = res?.data?.find((item) => item.type === 'Privacy Policy'); // Replace with your actual condition\
                setTitle('Privacy Policy');
                if (about) {
                    setAbout(about);
                }
                setLoading(false);
            } else {
                const about = res?.data?.find((item) => item.type === 'Terms and Conditions'); // Replace with your actual condition
                setTitle('Terms and Conditions');
                if (about) {
                    setAbout(about);
                }
                setLoading(false);
            }
        }
        // setStatus(!status);
    };
    React.useEffect(() => {
        fetchCms();
    }, [status]);

    // useEffect(() => {
    //     if (Array.isArray(salesperson)) {
    //         setSalesPersonsVal(salesperson);
    //     } else {
    //         setSalesPersonsVal([]);
    //     }
    // }, [salesperson]);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid
                    sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'background.default',
                        margin: 'auto',
                        marginTop: '100px',
                        width: '100%'
                    }}
                    className="boxShadaw"
                >
                    {title ? (
                        <Grid alignItems="center" sx={{ marginBottom: '55px' }}>
                            <Grid item xs={12} textAlign="center" className="headingshadow" sx={{ marginBottom: '15px' }}>
                                <Typography variant="h1" className="cms">
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid alignItems="center" sx={{ marginBottom: '55px' }}>
                            <Grid item xs={12} textAlign="center" className="headingshadow" sx={{ marginBottom: '15px' }}>
                                <Typography variant="h1" className="cms">
                                    <Skeleton />
                                </Typography>
                            </Grid>
                        </Grid>
                    )}

                    {aboutData.content ? (
                        <Grid container spacing={2} direction="column" sx={{ marginLeft: '5px', marginRight: '5px' }}>
                            <DialogContent dangerouslySetInnerHTML={{ __html: aboutData.content }} />
                        </Grid>
                    ) : (
                        <Grid container spacing={2} direction="column" sx={{ marginLeft: '5px', marginRight: '5px' }}>
                            <Skeleton />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUs;
