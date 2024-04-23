import React, { useEffect, Suspense } from 'react';
import Header from './header/header';
import Drawer from './menu/mobileMenu/drawer';
import Footer from './footer/footer';
import { admincontentActions } from 'contents/content/contentSlice';
import BackToTop from 'sharedComponents/BacktoTop/backtotop';
import { useToggle } from 'hooks/useToggle';
import Topbar from 'public/features/home/topbar/topbar';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/publicUrl';

interface DefaultLayoutProps {
     children?: any;
  }
const CustomLoader = () => (
    <div className="custom-loader">
        <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="Temple Logo" className="Temple-logo" />
    </div>
);
const Layout = (props: DefaultLayoutProps) => {
    const { children } = props;

    const [drawer, toggle] = useToggle(false);
    const { dispatch } = useRedux();

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
