import React, {
    Suspense, useEffect, useState,
} from 'react';
import { Container } from 'react-bootstrap';
import { selectleftSideBarType } from '../layoutSelectors';
import { changeBodyAttribute } from 'utils/layout';
import { useRedux } from 'hooks';

const Topbar = React.lazy(() => import('../topBar'));
const LeftSidebar = React.lazy(() => import('./leftSidemenu'));
const Footer = React.lazy(() => import('../Footer'));

const loading = () => <div className="" />;

interface VerticalLayoutProps {
  children?: any;
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
    const { appSelector } = useRedux();

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
    const leftSideBarType = appSelector(selectleftSideBarType);

    useEffect(() => {
        changeBodyAttribute('data-sidebar-size', leftSideBarType);
    }, [leftSideBarType]);

    const isCondensed:any = true;

    return (
        <div id="wrapper">
            <Suspense fallback={loading()}>
                <Topbar openLeftMenuCallBack={openMenu} hideLogo={false} />
            </Suspense>
            <Suspense fallback={loading()}>
                <LeftSidebar isCondensed={isCondensed} />
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
