import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useThemeCustomizer from '../../../ThemeCustomizer/useThemeCustomizer';
import ProfileDropdown from './profileDropdown/profile';
import { ThemeSettings, useThemeContext } from 'context/useThemeContext';
import useViewport from 'hooks/useViewPort';
import { PublicImageURL } from 'constants/PublicUrl';

/* eslint-disable */
/**
 * for subtraction minutes
 */
function subtractHours(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() - minutes);
    return date;
}

export interface ProfileOption {
    label: string
    icon: string
    redirectTo: string
}

const profileMenus: ProfileOption[] = [
    {
        label: 'My Account',
        icon: 'ri-account-circle-line',
        redirectTo: '/pages/profile',
    },
    {
        label: 'Settings',
        icon: 'ri-settings-4-line',
        redirectTo: '/pages/profile',
    },
    {
        label: 'Support',
        icon: 'ri-customer-service-2-line',
        redirectTo: '/pages/faq',
    },
    {
        label: 'Lock Screen',
        icon: 'ri-lock-password-line',
        redirectTo: '/auth/lock-screen',
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
            <div className="topbar container-fluid">
                <div className="d-flex align-items-center gap-1">
                    {/* Topbar Brand Logo */}
                    <div className="logo-topbar">
                        {/* Logo light */}
                        <Link to="/" className="logo-light">
                            <span className="logo-lg">
                                <Image src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="logo" />
                            </span>
                            <span className="logo-sm">
                                <Image src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="small logo" />
                            </span>
                        </Link>
                        {/* Logo Dark */}
                        <Link to="/" className="logo-dark">
                            <span className="logo-lg">
                                <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="dark logo" />
                            </span>
                            <span className="logo-sm">
                                <img src={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`} alt="small logo" />
                            </span>
                        </Link>
                    </div>
                    {/* Sidebar Menu Toggle Button */}
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
                    <li className="dropdown">
                        <ProfileDropdown
                            menuItems={profileMenus}
                            userImage={`${window.location.origin}/${PublicImageURL}/logo/logo.jpg`}
                            username="User"
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topbar;
