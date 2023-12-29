import React, { Suspense, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';

const Footer = React.lazy(() => import('./Footer'));
const Topbar = React.lazy(() => import('./topBar'));
const LeftSidebar = React.lazy(() => import('./menu'));

const loading = () => <div className="" />;

interface AuthLayoutProps {
    children?: any;
 }

const VerticalLayout = (props: AuthLayoutProps) => {
    const { children } = props;
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened(prevState => !prevState);

        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.remove('sidebar-enable');
            } else {
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    const isCondensed:any = true;

    return (
        <div id="wrapper">
            <Suspense fallback={loading()}>
                <Topbar openLeftMenuCallBack={openMenu} />
            </Suspense>
            <Suspense fallback={loading()}>
                <LeftSidebar />
            </Suspense>
            <div className="content-page">
                <div className="content">
                    <Container fluid>
                        <Suspense fallback={loading()}>{children}</Suspense>
                    </Container>
                </div>

                <Suspense fallback={loading()}>
                    {/* <Footer /> */}
                </Suspense>
            </div>
        </div>
    );
};

export default VerticalLayout;
