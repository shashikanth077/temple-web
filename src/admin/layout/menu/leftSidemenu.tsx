import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'assets/css/simple.bar.css';

// components
/* eslint-disable */
import AppMenu from './MainMenu';
import { selectAdminMenu } from 'features/content/contactSelectors';
import { useRedux, useUser } from 'hooks';

// images
/* eslint-disable */
/* user box */
const UserBox = () => {

    const {dispatch}  = useRedux();

        // get the profilemenu
    const ProfileMenus = [
        {
            label: 'My Account',
            icon: 'user',
            redirectTo: '/pages/profile',
        },
        {
            label: 'Logout',
            icon: 'log-out',
            redirectTo: '/auth/logout',
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    /*
   * toggle dropdown
   */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="user-box text-center">
            <img
                src="assets/images/logo.jpg"
                alt=""
                title="Mat Helme"
                className="rounded-circle avatar-md"
            />
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle
                    id="dropdown-notification"
                    as="a"
                    onClick={toggleDropdown}
                    className="cursor-pointer text-dark h5 mt-2 mb-1 d-block"
                >
                    Shashi
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-pro-dropdown m-0">
                    {/* <div onClick={toggleDropdown}> */}
                    {(ProfileMenus || []).map((item, index) => (
                        <React.Fragment key={`${index}-profile-menu`}>
                            {index === ProfileMenus.length - 1 && (
                                <div className="dropdown-divider" />
                            )}
                            <Link
                                to={item.redirectTo}
                                className="dropdown-item notify-item"
                            >
                                <i
                                    className={item.icon}
                                 />
                                <span>{item.label}</span>
                            </Link>
                        </React.Fragment>
                    ))}
                    {/* </div> */}
                </Dropdown.Menu>
            </Dropdown>
            <p className="text-muted">Admin Head</p>
        </div>
    );
};


/* sidebar content */
const SideBarContent = () => {
    const {appSelector}  = useRedux();
    const menuItems = appSelector(selectAdminMenu);
    const [loggedInUser] = useUser();

    const updateItems:any = menuItems?.filter((item:any) => {
        for(var i = 0; i < item.roles?.length; i++){
            return loggedInUser.roles?.includes(item.roles[i]) 
         }
    });
  
    return (
        <>
            <UserBox />
            
            <SimpleBar style={{ maxHeight: '700px' }}>
                <div id="sidebar-menu">
                    <AppMenu menuItems={updateItems} />
                </div>
            </SimpleBar>
            <div className="clearfix" />
        </>
    )
}

interface LeftSidebarProps {
  isCondensed: boolean;
}

const LeftSidebar = ({ isCondensed }: LeftSidebarProps) => {
    const menuNodeRef: any = useRef(null);

    /**
   * Handle the click anywhere in doc
   */
    const handleOtherClick = (e: any) => {
        if (
            menuNodeRef
            && menuNodeRef.current
            && menuNodeRef.current.contains(e.target)
        ) { return; }
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);
        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <div className="left-side-menu" ref={menuNodeRef}>
            {!isCondensed && (
                <SideBarContent />
            )}
            {isCondensed && <SideBarContent />}
        </div>
    );
};

LeftSidebar.defaultProps = {
    isCondensed: false,
};

export default LeftSidebar;
