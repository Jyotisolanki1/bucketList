import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';

import Logo from 'ui-component/Logo';

// assets
import AuthBlueCard from 'assets/images/auth/auth-blue-card.svg';
import AuthPurpleCard from 'assets/images/auth/auth-purple-card.svg';
import LoginAuth from '../auth-forms/LoginAuth';
import { useSelector } from 'react-redux';

// styles
const PurpleWrapper = styled('span')({
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '32%',
        left: '40%',
        width: 313,
        backgroundSize: 380,
        height: 280,
        backgroundImage: `url(${AuthPurpleCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '23%',
        left: '37%',
        width: 243,
        height: 210,
        backgroundSize: 380,
        backgroundImage: `url(${AuthBlueCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        animationDelay: '1s'
    }
});

// carousel items
const items = [
    {
        title: 'Lead Management System',
        description: 'Making your management easy by saving time'
    },
    {
        title: 'Manage Your Leads Here',
        description: 'Organize your lead capture, lead management, sales management & analytics in one platform'
    },
    {
        title: 'Track Your Performance',
        description: 'progress in terms of their personal growth and development'
    }
];

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { isClientLoggedIn, loading } = useSelector((state) => state.admin);
    // if (isAuthenticated === true && loading === false) {
    //     return <Navigate replace to={DASHBOARD_PATH} />;
    // }
    // if (isAuthenticated === false && loading === false) {
    //     return <Navigate replace to="/" />;
    // }
    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item sx={{ mb: 3 }}>
                                <Link to="#" aria-label="theme-logo">
                                    <Logo />
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography color="#141782" gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Hi, Welcome
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                                Enter your credentials to continue
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <LoginAuth />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
