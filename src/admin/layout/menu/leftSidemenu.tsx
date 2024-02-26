import React from 'react';
import { Link } from 'react-router-dom';

// images
import SimpleBar from 'simplebar-react';
import AppMenu from './MainMenu';
import { selectAdminMenu } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';

/* Sidebar content */
const SideBarContent = () => {
    const { appSelector } = useRedux();

    const Menus = appSelector(selectAdminMenu);

    return (
        <>
            <AppMenu menuItems={Menus} />
            <div className="clearfix" />
        </>
    );
};

const LeftSidebar = () => (
    <div className="leftside-menu">
        <Link to="/" className="logo logo-light">
            <span className="logo-lg">
                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="logo" />
            </span>
            <span className="logo-sm">
                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="small logo" />
            </span>
        </Link>
        <a href="/" className="logo logo-dark">
            <span className="logo-lg">
                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="dark logo" />
            </span>
            <span className="logo-sm">
                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="small logo" />
            </span>
        </a>
        {/* Sidebar -left */}
        <SimpleBar
            className="h-100"
            id="leftside-menu-container"
            data-simplebar=""
        >
            {/* - Sidemenu */}
            <SideBarContent />
            {/* - End Sidemenu */}
            <div className="clearfix" />
        </SimpleBar>
    </div>
);

export default LeftSidebar;
