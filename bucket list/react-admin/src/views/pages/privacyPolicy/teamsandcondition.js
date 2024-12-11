import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'utils/axios';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
// import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import Logo from 'ui-component/Logo';
import { Grid, DialogContent } from '@mui/material';

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const [content, setcontent] = React.useState(true);
    const apiCall = async () => {
        const response = await axios.get(`user/get-docs`);
        const data = response?.data?.ResponseData?.find((item) => item.flag === 'Terms And Conditions'); // Replace with your actual condition
        console.log(data);
        if (data) {
            setcontent(data.file);
        }
    };
    React.useEffect(() => {
        apiCall();
    }, []);

    return (
        <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }} p={3}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                        <Link to="#" aria-label="theme-logo">
                            <Logo />
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContent dangerouslySetInnerHTML={{ __html: content }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
