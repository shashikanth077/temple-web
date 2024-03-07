import React from 'react';
import { Link } from 'react-router-dom';

// images
import SimpleBar from 'simplebar-react';
import AppMenu from './MainMenu';
import { selectAdminMenu } from 'features/content/contactSelectors';
import { useRedux, useUser } from 'hooks';

/* Sidebar content */
/* eslint-disable */
const SideBarContent = () => {
    const { appSelector } = useRedux();
    const loggedInUser: any = useUser();

    const Menus = appSelector(selectAdminMenu);

    let updateItems:any;
    if (Menus) {
        //separate admin and user
        updateItems = Menus?.filter((item: any) => {
            for (let i = 0; i < item.roles?.length; i++) {
                return loggedInUser[0].roles?.includes(item.roles[i]);
            }
        });
    }

    return (
        <>
            <AppMenu menuItems={updateItems} />
            <div className="clearfix" />
        </>
    );
};

const LeftSidebar = () => (
    <div className="leftside-menu">
        <Link to="/" className="logo logo-light">
            <span className="logo-lg">
                <img height="40px" width="200px" src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="logo" />
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
