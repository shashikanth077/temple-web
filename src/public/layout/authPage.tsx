import React, { useEffect, Suspense } from 'react';
import { RingLoader } from 'react-spinners';
import { admincontentActions } from 'contents/content/contentSlice';
import { useToggle } from 'hooks/useToggle';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/publicUrl';

interface AuthLayoutProps {
     children?: any;
  }
const CustomLoader = () => (
    <div className="custom-loader">
        <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="Temple Logo" className="Temple-logo" />
        {/* <RingLoader color="#007bff" loading size={50} /> */}
    </div>
);
const AuthLayoutPage = (props: AuthLayoutProps) => {
    const { children } = props;

    const [drawer, toggle] = useToggle(false);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(admincontentActions.getStaticContent());
    }, [dispatch]);

    return (
        <main className="main">
            <Suspense fallback={<CustomLoader />}>{children}</Suspense>
        </main>
    );
};

export default React.memo(AuthLayoutPage);
