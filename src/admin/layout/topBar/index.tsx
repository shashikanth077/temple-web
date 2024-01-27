import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

// components
import { selectleftSideBarType } from '../layoutSelectors';
import { adminlayoutActions } from '../layoutSlice';
import ProfileDropdown from './profileDropdown/profile';
import { useRedux } from 'hooks';

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
}

// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Account',
        icon: 'user',
        redirectTo: '/myprofile/profileview',
    },
    {
        label: 'Logout',
        icon: 'log-out',
        redirectTo: '/auth/logout',
    },
];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
}

const Topbar = ({
    hideLogo,
    navCssClasses,
    openLeftMenuCallBack,
    topbarDark,
}: TopbarProps) => {
    const [isopen, setIsopen] = useState<boolean>(false);
    const { dispatch, appSelector } = useRedux();

    const navbarCssClasses: string = navCssClasses || '';
    const containerCssClasses: string = !hideLogo ? 'container-fluid' : '';

    /**
   * Toggle the leftmenu when having mobile screen
   */
    const handleLeftMenuCallBack = () => {
        setIsopen(!isopen);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    const leftSideBarType = appSelector(selectleftSideBarType);
    console.log('leftSideBarType', leftSideBarType);

    /**
   * Toggles the left sidebar width
   */
    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === 'default') {
            dispatch(adminlayoutActions.changeSideBarType({ leftSideBarType: 'condensed' }));
        } else if (leftSideBarType === 'condensed') {
            dispatch(adminlayoutActions.changeSideBarType({ leftSideBarType: 'default' }));
        } else {
            dispatch(adminlayoutActions.changeSideBarType({ leftSideBarType: 'default' }));
        }
    };

    return (
        <div className={`navbar-custom ${navbarCssClasses}`}>
            <div className={containerCssClasses}>
                {!hideLogo && (
                    <div className="logo-box">
                        <Link to="/" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="" height="24" />
                            </span>
                            <span className="logo-lg">
                                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="" height="70" />
                            </span>
                        </Link>
                        <Link to="/" className="logo logo-conde-light logo-light">
                            <span className="logo-sm">
                                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="Logo" />
                            </span>
                            <span className="logo-lg">
                                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} alt="" height="70" />
                            </span>
                        </Link>
                    </div>
                )}

                <ul className="list-unstyled topnav-menu float-end mb-0">

                    <li className="dropdown notification-list topbar-dropdown">
                        <ProfileDropdown
                            userImage={`${window.location.origin}/assets/images/logo/logo.jpg`}
                            menuItems={ProfileMenus}
                            username="Shashi"
                        />
                    </li>

                </ul>

                <ul className="list-unstyled topnav-menu topnav-menu-left m-0">

                    <li>
                        <button
                            type="button"
                            aria-label="MobileToogle"
                            className="button-menu-mobile d-none d-lg-block"
                            onClick={toggleLeftSidebarWidth}
                        >
                            <i className="fas fa-bars" />
                            <i className="fas fa-bars" />
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            aria-label="MobileToogle"
                            className="button-menu-mobile d-lg-none d-bolck"
                            onClick={handleLeftMenuCallBack}
                        >
                            <i className="fas fa-bars" />
                        </button>
                    </li>

                    {/* Mobile menu toggle (Horizontal Layout) */}
                    <li>
                        <Link
                            to="##"
                            className={classNames('navbar-toggle nav-link', {
                                open: isopen,
                            })}
                            onClick={handleLeftMenuCallBack}
                        >
                            <div className="lines">
                                <span />
                                <span />
                                <span />
                            </div>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default React.memo(Topbar);
