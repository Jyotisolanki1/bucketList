import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Tooltip, DialogContent, fabClasses } from '@mui/material';
import { GetCms } from 'store/slices/cms';
import { useDispatch, useSelector } from 'store';
import EditCms from '../editCMS';
import Skeleton from '@mui/material/Skeleton';

export default function AboutUs() {
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [status, setStatus] = React.useState(true);
    const [aboutData, setAbout] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const change = (flag) => {
        setOpen(false);
        if (flag === true) {
            setStatus(!status);
        }
    };

    const fetchCms = async () => {
        const res = await dispatch(GetCms());
        if (res.success === true) {
            const about = res?.data?.find((item) => item.type === 'About Us');
            if (about) {
                setAbout(about);
            }
            setLoading(false);
        }
    };
    React.useEffect(() => {
        fetchCms();
    }, [status]);
    return (
        <Card fullWidth style={{ marginTop: '2%' }}>
            {!loading ? (
                <>
                    <CardHeader
                        action={
                            <Tooltip title={`Update ${aboutData.type}`} key="1" style={{ marginRight: '5px' }}>
                                <IconButton color="secondary" className="custom-icon-button">
                                    <EditTwoToneIcon
                                        onClick={() => {
                                            handleClickOpen();
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        }
                        title={aboutData.type}
                    />

                    <DialogContent dangerouslySetInnerHTML={{ __html: aboutData.content }} />
                </>
            ) : (
                <>
                    <DialogContent>
                        <Skeleton />
                    </DialogContent>

                    <DialogContent>
                        <Skeleton />
                    </DialogContent>
                </>
            )}

            {open && <EditCms open={open} item={aboutData} close={(flag) => change(flag)} />}
        </Card>
    );
}
