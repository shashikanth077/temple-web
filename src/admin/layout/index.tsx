import React, { Suspense, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { changeHTMLAttribute } from 'utils/layout';
import { ThemeSettings, useThemeContext } from 'context/useThemeContext';
import useViewport from 'hooks/useViewPort';
import Preloader from 'sharedComponents/loader/loader';

const Topbar = React.lazy(() => import('./topBar/index'));
const LeftSidebar = React.lazy(() => import('./menu/leftSidemenu'));
const RightSidebar = React.lazy(() => import('./rightBar'));
const Footer = React.lazy(() => import('./Footer'));

interface VerticalLayoutProps {
children?: any
}
const VerticalLayout = ({ children }: VerticalLayoutProps) => {
    const { settings, updateSidebar } = useThemeContext();
    const { width } = useViewport();

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
    }, [width]);

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
                            <Container fluid>
                                <Suspense fallback={<Preloader />}>{children}</Suspense>
                            </Container>
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
