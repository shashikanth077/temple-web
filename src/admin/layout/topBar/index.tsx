import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './profileDropdown/profile';
import { useThemeCustomizer } from 'themeCustomizer';
import { selectCurrentCartData } from 'member/features/shop/cart/cartSelectors'; // need to change the str
import { ThemeSettings, useThemeContext } from 'context/useThemeContext';
import useViewport from 'hooks/useViewPort';
import { PublicImageURL } from 'constants/publicUrl';
import { useRedux, useUser } from 'hooks';
import { APICore } from 'helpers/api';

/* eslint-disable */

export interface ProfileOption {
    label: string
    icon: string
    redirectTo: string
}

const profileMenus: ProfileOption[] = [
    {
        label: 'My Account',
        icon: 'ri-account-circle-line',
        redirectTo: '/myprofile/profileview',
    },
    {
        label: 'Change password',
        icon: 'ri-account-circle-line',
        redirectTo: '/change-password',
    },
    {
        label: 'Logout',
        icon: 'ri-logout-box-line',
        redirectTo: '/auth/logout',
    },
];

type TopbarProps = {
topbarDark?: boolean
toggleMenu?: () => void
navOpen?: boolean
}
const Topbar = ({ toggleMenu, navOpen }: TopbarProps) => {
    const { sideBarType } = useThemeCustomizer();
    const { width } = useViewport();
    const [loggedInUser] = useUser();
    const { appSelector } = useRedux();

    const cartItems:any = appSelector(selectCurrentCartData);
    
    /**
	 * Toggle the leftmenu when having mobile screen
	 */

    const handleLeftMenuCallBack = () => {
        if (width < 768) {
            if (sideBarType === 'full') {
                showLeftSideBarBackdrop();
                document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
            } else {
                updateSidebar({ size: ThemeSettings?.sidebar.size.full });
            }
        } else if (sideBarType === 'condensed') {
            updateSidebar({ size: ThemeSettings?.sidebar.size.default });
        } else if (sideBarType === 'full') {
            showLeftSideBarBackdrop();
            document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
        } else if (sideBarType === 'fullscreen') {
            updateSidebar({ size: ThemeSettings?.sidebar.size.default });
            document.getElementsByTagName('html')[0].classList.add('sidebar-enable');
        } else {
            updateSidebar({ size: ThemeSettings?.sidebar.size.condensed });
        }
    };

    /**
	 * creates backdrop for leftsidebar
	 */
    function showLeftSideBarBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.id = 'custom-backdrop';
        backdrop.className = 'offcanvas-backdrop fade show';
        document.body.appendChild(backdrop);

        backdrop.addEventListener('click', () => {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('sidebar-enable');
            hideLeftSideBarBackdrop();
        });
    }

    function hideLeftSideBarBackdrop() {
        const backdrop = document.getElementById('custom-backdrop');
        if (backdrop) {
            document.body.removeChild(backdrop);
            document.body.style.removeProperty('overflow');
        }
    }
    const { settings, updateSettings, updateSidebar } = useThemeContext();

    /**
	 * Toggle Dark Mode
	 */
    const toggleDarkMode = () => {
        if (settings.theme === 'dark') {
            updateSettings({ theme: ThemeSettings?.theme.light });
        } else {
            updateSettings({ theme: ThemeSettings.theme.dark });
        }
    };

    const handleRightSideBar = () => {
        updateSettings({ rightSidebar: ThemeSettings?.rightSidebar.show });
    };
    return (
        <div className="navbar-custom">
            <div className="admintopbar container-fluid">
                <div className="d-flex align-items-center gap-1">
                    <button
                        className="button-toggle-menu"
                        onClick={handleLeftMenuCallBack}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <ul className="topbar-menu d-flex align-items-center gap-3">
                   
                    <li className="d-none d-sm-inline-block">
                        <button className="nav-link" onClick={handleRightSideBar}>
                            <i className="ri-settings-3-line fs-22" />
                        </button>
                    </li>
                    <li className="d-none d-sm-inline-block">
                        <div
                            className="nav-link"
                            id="light-dark-mode"
                            onClick={toggleDarkMode}
                        >
                            <i className="ri-moon-line fs-22" />
                        </div>
                    </li>
                    <li className='cart-wrap'>
                    {APICore.isUserAuthenticated()
                        ? (
                            cartItems.list.totalQuantity !== undefined ? (
                            <Link className="icon-cart store-cart-icon" to={`/cart/view-cart`}>
                                <button type="button" className="icon-cart">
                                    <i className="fas fa-shopping-cart" />
                                    <span className="count-style">
                                        {cartItems?.list?.totalQuantity !== undefined ? cartItems.list.totalQuantity : 0}
                                    </span>
                                </button>
                            </Link>
                            ):''
                        ) : '' }
                    </li>
                    <li className="dropdown">
                        <ProfileDropdown
                            menuItems={profileMenus}
                            userImage={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`}
                            username={loggedInUser?.firstName}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
