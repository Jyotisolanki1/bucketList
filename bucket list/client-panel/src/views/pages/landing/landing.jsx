// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import Customization from 'layout/Customization';
import AppBar from 'ui-component/extended/AppBar';
import HeaderSection from './HeaderSection';
import CardSection from './CardSection';
import FeatureSection from './FeatureSection';
import PeopleSection from './PeopleSection';
import FrameworkSection from './FrameworkSection';
import FooterSection from './FooterSection';
import CustomizeSection from './CustomizeSection';
import PreBuildDashBoard from './PreBuildDashBoard';
import StartupProjectSection from './StartupProjectSection';
import { ThemeMode } from 'config';
// import IncludeSection from './IncludeSection';
// import RtlInfoSection from './RtlInfoSection';

// =============================|| LANDING MAIN ||============================= //

const Home = () => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100' }}>
                <HeaderSection />
            </Box>

            {/* 3. about section */}
            <Box sx={{ py: 12.5, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'background.default' }}>
                <FeatureSection />
            </Box>

            {/* framework section */}
            <Box sx={{ py: 12.5, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100' }}>
                <FrameworkSection />
            </Box>
        </>
    );
};

export default Home;
