import { Link as RouterLink } from 'react-router-dom';
import { useMemo, useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddClient from '../../Client/addClient';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { DASHBOARD_PATH } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import TechLight from 'assets/images/landing/tech-light.svg';
import TechDark from 'assets/images/landing/tech-dark.svg';
import dashboard from 'assets/images/landing/hero-dashboard.png';
import widget1 from 'assets/images/landing/hero-widget-1.png';
import widget2 from 'assets/images/landing/hero-widget-2.png';
import BgDark from 'assets/images/landing/bg-hero-block-dark.png';
import BgLight from 'assets/images/landing/bg-hero-block-light.png';

// styles
const HeaderImage = styled('img')(({ theme }) => ({
    maxWidth: '77%',
    borderRadius: 20,
    transform: 'scale(1.7)',
    transformOrigin: theme.direction === 'rtl' ? '100% 50%' : '0 50%',
    [theme.breakpoints.down('xl')]: {
        transform: 'scale(1.5)'
    },
    [theme.breakpoints.down('lg')]: {
        transform: 'scale(1.2)'
    }
}));

const HeaderAnimationImage = styled('img')({
    maxWidth: '100%',
    filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderSection = () => {
    const { mode, themeDirection } = useConfig();
    const [openAdd, setOpenAdd] = useState(false);
    const [status, setStatus] = useState(true);

    const headerSX = { fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem', lg: '3.5rem' } };

    const HeaderAnimationImagememo = useMemo(
        () => (
            <HeaderAnimationImage
                alt="Berry"
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    filter: 'none',
                    bottom: { md: 0 },
                    right: 0,
                    width: '50%',
                    transformOrigin: '50% 50%'
                }}
            />
        ),
        [themeDirection, mode]
    );
    const changeAdd = (flag) => {
        setOpenAdd(false);
        if (flag === true) {
            setStatus(!status);
        }
    };
    return (
        <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: { xs: 10, sm: 6 }, mb: { xs: 2.5, md: 10 } }}>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                            >
                                <Stack spacing={1}>
                                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" sx={headerSX}>
                                        Bucket List
                                    </Typography>

                                    <Typography textAlign={{ xs: 'center', md: 'left' }} variant="h1" color="primary" sx={headerSX}>
                                        Business Need
                                    </Typography>
                                </Stack>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: -2.5, textAlign: { xs: 'center', md: 'left' } }}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.2 }}
                            >
                                <Typography
                                    textAlign={{ xs: 'center', md: 'left' }}
                                    color="text.primary"
                                    variant="body1"
                                    sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
                                >
                                    We are developing The Bucket List platform, a comprehensive system that allows oil and gas companies to
                                    access a vetted pool of service providers, consultants, and suppliers
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: 'spring', stiffness: 150, damping: 30, delay: 0.4 }}
                            >
                                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<PlayArrowIcon />}
                                                onClick={() => {
                                                    setOpenAdd(true);
                                                }}
                                            >
                                                Become A Client
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{ position: 'relative', mt: 8.75, zIndex: 9 }}>
                        <HeaderImage src={dashboard} alt="Berry" />
                    </Box>
                </Grid>
            </Grid>
            {openAdd && <AddClient open={openAdd} close={(flag) => changeAdd(flag)} />}
        </Container>
    );
};

export default HeaderSection;
