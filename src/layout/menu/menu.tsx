import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as PageLink } from 'react-router-dom';
import { menuActions } from './menuSlice';
import { selectMenuList } from './menuSelectors';
import useRedux from 'hooks/useRedux';

const Navigation = () => {
    const [isActive, setActive] = useState(false);
    const [fix, setFix] = useState(false);

    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(menuActions.fetchMenuList());
    }, [dispatch]);

    const menuList = appSelector(selectMenuList);

    function setFixed() {
        if (window.scrollY >= 100) {
            setFix(true);
        } else {
            setFix(false);
        }
    }

    window.addEventListener('scroll', setFixed);

    return (
        <ul>
            {menuList?.map((data, i) => (data?.isDropdown === true ? (
                <li key={data.menuId}>
                    <Link
                        className="nav-link scroll"
                        to={`${data.link}`}
                    >
                        {data.title}
                        <i className="fal fa-angle-down" />
                    </Link>
                    <ul className="sub-menu">
                        {data.dropdownItem.map(item => (
                            <li>
                                <PageLink to={item.link}>{item.title}</PageLink>
                            </li>
                        ))}
                    </ul>
                </li>
            ) : (
                <li key={data.menuId}>
                    <PageLink to={`${data.link}`}>{data.title}</PageLink>
                </li>
            )))}
        </ul>
    );
};

export default Navigation;
