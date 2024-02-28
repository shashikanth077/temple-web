import React, { useEffect, Suspense } from 'react';
import { RingLoader } from 'react-spinners';
import Header from './header/header';
import Drawer from './menu/mobileMenu/drawer';
import Footer from './footer/footer';
import BackToTop from 'sharedComponents/BacktoTop/backtotop';
import { useToggle } from 'hooks/useToggle';
import Topbar from 'features/home/topbar/topbar';
import { admincontentActions } from 'features/content/contentSlice';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';

interface DefaultLayoutProps {
     children?: any;
  }
const CustomLoader = () => (
    <div className="custom-loader">
        <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="Temple Logo" className="Temple-logo" />
        {/* <RingLoader color="#007bff" loading size={50} /> */}
    </div>
);
const Layout = (props: DefaultLayoutProps) => {
    const { children } = props;

    const [drawer, toggle] = useToggle(false);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(admincontentActions.getStaticContent());
    }, [dispatch]);

    return (
        <>
            <Drawer drawer={drawer} action={toggle} />
            <Topbar />
            <Header action={toggle} />
            <main className="main">
                <Suspense fallback={<CustomLoader />}>{children}</Suspense>
            </main>
            <Footer />
            <BackToTop className="bdd" />
        </>
    );
};

export default React.memo(Layout);
