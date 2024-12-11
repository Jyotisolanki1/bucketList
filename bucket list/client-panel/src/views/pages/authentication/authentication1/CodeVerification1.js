import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthCodeVerification from '../auth-forms/AuthCodeVerification';
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1';
import AuthSlider from 'ui-component/cards/AuthSlider';

// assets
import AuthBlueCard from 'assets/images/auth/auth-signup-blue-card.svg';
import AuthWhiteCard from 'assets/images/auth/auth-signup-white-card.svg';
import { useEffect, useState } from 'react';
import { LOGIN_PATH } from 'config';

// styles
const BlueWrapper = styled('span')(({ theme }) => ({
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '45%',
        left: '35%',
        width: 260,
        backgroundSize: 380,
        height: 290,
        backgroundImage: `url(${AuthWhiteCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        [theme.breakpoints.down('xl')]: {
            left: '25%',
            top: '50%'
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '12%',
        left: '25%',
        width: 360,
        height: 350,
        backgroundSize: 460,
        backgroundImage: `url(${AuthBlueCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        animationDelay: '1s',
        [theme.breakpoints.down('xl')]: {
            top: '10%',
            left: '15%'
        }
    }
}));

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

// ===========================|| AUTH1 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const initialTimer = 1 * 60; // 2 minutes in seconds
    const [timer, setTimer] = useState(initialTimer);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(LOGIN_PATH, { replace: true }); // Replace '/other-page' with the actual path to the other page
            localStorage.removeItem('clientToken');
            // console.log('🚀khatam tata bye');
        }, 1 * 60 * 1000); // 2 minutes in milliseconds

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        // console.log('🚀 adminRole:', timer);
        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);
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
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Verify Code
                                            </Typography>
                                            <Typography variant="h6" fontSize="14px">
                                                Please enter OTP provided to you
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <AuthCodeVerification />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default CodeVerification;
