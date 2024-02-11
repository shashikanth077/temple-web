import React, { Suspense, useState } from 'react';
import { Container } from 'react-bootstrap';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primeicons/primeicons.css';
import { RingLoader } from 'react-spinners';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import { PublicImageURL } from 'constants/PublicUrl';
import AutoLogout from 'features/autoLogout';

const Footer = React.lazy(() => import('./Footer'));
const Topbar = React.lazy(() => import('./topBar'));
const LeftSidebar = React.lazy(() => import('./menu'));

const CustomLoader = () => {
    console.log('CustomLoader rendered');
    return (
        <div className="custom-loader">
            <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="Temple Logo" className="Temple-logo" />
            <RingLoader color="#007bff" loading size={50} />
        </div>
    );
};

interface AuthLayoutProps {
  children?: any;
}

const VerticalLayout = (props: AuthLayoutProps) => {
    const { children } = props;
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

    /**
   * Open the menu when having a mobile screen
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

    const isCondensed: any = true;

    return (
        <div id="wrapper">
            <Suspense fallback={<CustomLoader />}>
                <Topbar openLeftMenuCallBack={openMenu} />
            </Suspense>
            <Suspense fallback={<CustomLoader />}>
                <LeftSidebar />
            </Suspense>
            <div className="content-page">
                <div className="content">
                    <AutoLogout>
                        <Container fluid>
                            <Suspense fallback={<CustomLoader />}>{children}</Suspense>
                        </Container>
                    </AutoLogout>
                </div>

                <Suspense fallback={<CustomLoader />}>
                    {/* <Footer /> */}
                </Suspense>
            </div>
        </div>
    );
};

export default React.memo(VerticalLayout);
