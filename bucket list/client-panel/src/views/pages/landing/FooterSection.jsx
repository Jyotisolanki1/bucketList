// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

// assets
import PublicIcon from '@mui/icons-material/Public';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

// Link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main
    },
    '&:active': {
        color: theme.palette.primary.main
    }
}));

// =============================|| LANDING - FOOTER SECTION ||============================= //

const FooterSection = () => {
    const theme = useTheme();
    const handleClickAddress = () => {
        const address = 'Pacific Centre Block A, Level 1, Suite 18, 223 Calam rd, Sunnybank Hills Qld 4019, Australia';

        if (address) {
            // Encode the address to ensure it's properly formatted for use in a URL
            const encodedAddress = encodeURIComponent(address);

            // Construct the Google Maps URL with the encoded address
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

            // Open the URL in a new tab or window
            window.open(googleMapsUrl, '_blank');
        }
    };

    return (
        <>
            <Container sx={{ mb: 15 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={{ xs: 5, md: 2 }}>
                                    <Grid item xs={6} sm={4}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 500, color: 'white', textTransform: 'upperCase' }}>
                                                Quick Links
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                <Link to="/aboutus?cms=aboutus" underline="none">
                                                    About Us
                                                </Link>
                                                <Link to="/termsandcondition?cms=termsandcondition" underline="none">
                                                    Privacy Policy
                                                </Link>
                                                <Link to="/privacypolicy?cms=privacypolicy" underline="none">
                                                    Terms And Conditions
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 500, color: 'white', textTransform: 'upperCase' }}>
                                                Support Center
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                                                {/* Ensure tel: works by updating the phone link */}
                                                <a href="tel:+96669897978">Mob : 96669897978</a>
                                                {/* Ensure mailto: works by updating the email link */}
                                                <a href="mailto:support@gmail.com">support@gmail.com</a>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Stack spacing={{ xs: 3, md: 5 }}>
                                            <Typography variant="h4" sx={{ fontWeight: 500, color: 'white', textTransform: 'upperCase' }}>
                                                Contact Address
                                            </Typography>
                                            <Stack spacing={{ xs: 1.5, md: 2.5 }} sx={{ color: '#2196f3' }}>
                                                {/* Ensure Google Maps opens by updating the address link */}
                                                <FooterLink onClick={handleClickAddress}>
                                                    Pacific Centre Block A, Level 1, Suite 18, 223 Calam rd, Sunnybank Hills Qld 4019,
                                                    Australia
                                                </FooterLink>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: 'dark.dark', py: { xs: 3, sm: 1.5 } }}>
                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={{ xs: 1.5, sm: 1, md: 3 }}
                    >
                        <Typography color="text.secondary">
                            © Bucket List is managed by{' '}
                            <Link href="/" target="_blank" underline="hover">
                                BucketList
                            </Link>
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={{ xs: 3, sm: 1.5, md: 2 }}>
                            <IconButton
                                size="small"
                                aria-label="Berry Blog"
                                component={Link}
                                href="https://links.codedthemes.com/HTIBc"
                                target="_blank"
                            >
                                <PublicIcon sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="codedTheme Twitter"
                                component={Link}
                                href="https://twitter.com/codedthemes"
                                target="_blank"
                            >
                                <TwitterIcon sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="codedTheme Dribble"
                                component={Link}
                                href="https://dribbble.com/codedthemes"
                                target="_blank"
                            >
                                <SportsBasketballIcon sx={{ color: 'text.secondary', '&:hover': { color: 'warning.main' } }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default FooterSection;
