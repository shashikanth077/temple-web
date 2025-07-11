import React, { Suspense, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { RingLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { changeHTMLAttribute } from 'utils/layout';
import { ThemeSettings, useThemeContext } from 'context/useThemeContext';
import useViewport from 'hooks/useViewPort';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import { PublicImageURL } from 'constants/publicUrl';
import { LogoutTime } from 'constants/general';
import AutoLogout from 'sharedComponents/autoLogout';

const Topbar = React.lazy(() => import('./topBar/index'));
const LeftSidebar = React.lazy(() => import('./menu/leftSidemenu'));
const RightSidebar = React.lazy(() => import('./rightBar'));
const Footer = React.lazy(() => import('./Footer'));

const CustomLoader = () => (
    <div className="custom-loader">
        <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="Temple Logo" className="Temple-logo" />
        <RingLoader color="#007bff" loading size={50} />
    </div>
);

interface VerticalLayoutProps {
    children?: any
}
const VerticalLayout = ({ children }: VerticalLayoutProps) => {
    const { settings, updateSidebar } = useThemeContext();
    const [profileUpdated, setProfileUpdated] = useState(false);
    const { width } = useViewport();
    const navigate = useNavigate();

    useEffect(() => {
        changeHTMLAttribute('data-bs-theme', settings?.theme);
    }, [settings?.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-mode', settings.layout.mode);
    }, [settings?.layout.mode]);

    useEffect(() => {
        changeHTMLAttribute('data-topbar-color', settings?.topbar.theme);
    }, [settings?.topbar.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-menu-color', settings?.sidebar.theme);
    }, [settings?.sidebar.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-sidenav-size', settings.sidebar.size);
    }, [settings?.sidebar.size]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-position', settings?.layout.menuPosition);
    }, [settings?.layout.menuPosition]);

    useEffect(() => {
        if (width < 768) {
            updateSidebar({ size: ThemeSettings.sidebar.size.full });
        } else if (width < 1140) {
            updateSidebar({ size: ThemeSettings.sidebar.size.condensed });
        } else if (width >= 1140) {
            updateSidebar({ size: ThemeSettings.sidebar.size.default });
        }
    }, [width, updateSidebar]);

    useEffect(() => {
        const isNotificationShown = sessionStorage.getItem('profileUpdateNotificationShown');
        if (!isNotificationShown) {
            const ProfileStatus = localStorage.getItem('profileStatus');
            if (!ProfileStatus) {
                Swal.fire({
                    title: 'Profile update required',
                    text: 'Your profile needs to be updated. Click OK to proceed.',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true,
                }).then(result => {
                    if (result.isConfirmed) {
                        setProfileUpdated(true);
                        sessionStorage.setItem('profileUpdateNotificationShown', 'true');
                        navigate('/myprofile/edit-profile');
                    }
                });
            }
        }
    }, []);

    return (
        <Suspense fallback={<div />}>
            <div className="wrapper">
                <Suspense fallback={<div />}>
                    <Topbar />
                </Suspense>

                <Suspense fallback={<div />}>
                    <LeftSidebar />
                </Suspense>

                <div className="content-page">
                    <div className="content">
                        <Suspense fallback={<div />}>
                            <AutoLogout logoutTime={LogoutTime}>
                                <Container fluid>
                                    <Suspense fallback={<CustomLoader />}>{children}</Suspense>
                                </Container>
                            </AutoLogout>
                        </Suspense>
                    </div>
                    <Suspense fallback={<div />}>
                        <Footer />
                    </Suspense>
                </div>

                <Suspense fallback={<div />}>
                    <RightSidebar />
                </Suspense>
            </div>
        </Suspense>
    );
};
export default VerticalLayout;
