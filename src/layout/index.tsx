import React, { useEffect, Suspense } from 'react';
import Header from './header/header';
import Main from './main/index';
import Drawer from './menu/mobileMenu/drawer';
import Footer from './footer/footer';
import BackToTop from 'sharedComponents/BacktoTop/backtotop';
import { useToggle } from 'hooks/useToggle';
import Topbar from 'features/home/topbar/topbar';
import { admincontentActions } from 'features/content/contentSlice';
import { useRedux } from 'hooks';

interface DefaultLayoutProps {
     children?: any;
  }

const loading = () => <div className="" />;
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
                <Suspense fallback={loading()}>{children}</Suspense>
            </main>
            <Footer />
            <BackToTop className="bdd" />
        </>
    );
};

export default Layout;
