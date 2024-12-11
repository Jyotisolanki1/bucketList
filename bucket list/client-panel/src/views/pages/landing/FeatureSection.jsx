/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material-UI imports
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from 'utils/Skeleton';

// Project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'ui-component/cards/SubCard';

// Redux slice
import { GetClientApi } from 'store/slices/client';

// Reusable OfferCard Component
const OfferCard = ({ title, description }) => {
    const theme = useTheme();
    return (
        <SubCard
            sx={{
                borderColor: 'divider',
                '&:hover': { boxShadow: 'none' },
                height: '100%',
                backgroundColor: 'white'
            }}
        >
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <Typography variant="h3" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        {description}
                    </Typography>
                </Stack>
            </Stack>
        </SubCard>
    );
};

OfferCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeatureSection = () => {
    const dispatch = useDispatch();
    const { loading, buckets, error } = useSelector((state) => state.client);

    // Fetch client data once at parent level
    useEffect(() => {
        dispatch(GetClientApi());
    }, [dispatch]);

    return (
        <Container>
            <Grid container spacing={7.5} justifyContent="center">
                {/* Header Section */}
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Our Services
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                                Thank you for being a vital part of our story—we&apos;re committed to serving you with excellence.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Offers Section */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {loading ? (
                            // Loading Skeletons
                            Array.from({ length: 6 }).map((_, index) => (
                                <Grid key={index} item md={4} sm={6}>
                                    <Skeleton variant="rectangular" width="100%" height={200} />
                                </Grid>
                            ))
                        ) : error ? (
                            // Error Message
                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 4 }}>
                                <Typography variant="h6" color="error">
                                    Failed to load services. Please try again later.
                                </Typography>
                            </Grid>
                        ) : buckets.length > 0 ? (
                            // Render OfferCards
                            buckets.slice(0, 9).map((offer, index) => (
                                <Grid key={index} item md={4} sm={6}>
                                    <FadeInWhenVisible>
                                        <OfferCard title={offer.name} description={offer.description} />
                                    </FadeInWhenVisible>
                                </Grid>
                            ))
                        ) : (
                            // No Buckets Found
                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 4 }}>
                                <Typography variant="h6" color="textSecondary">
                                    Buckets Not Found
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FeatureSection;
