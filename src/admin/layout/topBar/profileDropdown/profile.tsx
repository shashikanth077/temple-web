import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useToggleAdmin } from 'hooks';

export type ProfileMenu = {
    label: string;
    icon: string;
    redirectTo: string;
};

type ProfileDropdownProps = {
    userImage: string;
    username: string;
    menuItems: ProfileMenu[];
};

/* eslint-disable */
const ProfileDropdown = ({ userImage, username, menuItems }: ProfileDropdownProps) => {
    const [isOpen, show, hide] = useToggleAdmin();

    /*
     * toggle apps-dropdown
     */
    const toggleDropdown = () => (isOpen ? hide() : show());

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                as="a"
                variant=""
                className="nav-link nav-user me-0 waves-effect waves-light"
                id="page-header-user-dropdown"
                onClick={toggleDropdown}
            >
                <img src={userImage} alt="user" className="rounded-circle" />
                <span className="pro-user-name ms-1">
                    {username} <i className="mdi mdi-chevron-down" />
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="profile-dropdown">
                <div role="button" tabIndex={0} onKeyDown={toggleDropdown} onClick={toggleDropdown}>
                    <Dropdown.Header className="noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </Dropdown.Header>

                    {(menuItems || []).map((menu, i) => (
                        <React.Fragment key={`${i}-menu`}>
                            {i === menuItems.length - 1 && <Dropdown.Divider as="div" />}
                            <Link
                                to={menu.redirectTo}
                                className="dropdown-item notify-item"
                                key={`${i}-profile-menu`}
                            >
                                <i className={classNames(menu.icon, 'me-1')} />
                                <span>{menu.label}</span>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
