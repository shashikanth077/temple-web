import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Link as PageLink } from 'react-router-dom';
import useRedux from 'hooks/useRedux';
import { selectPublicMenu } from 'features/content/contactSelectors';

const Navigation = () => {
    const [isActive, setActive] = useState(false);
    const [fix, setFix] = useState(false);

    const { appSelector } = useRedux();

    const menuList:any = appSelector(selectPublicMenu);

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
            {menuList?.map((data:any) => (data?.isDropdown === true ? (
                <li key={data.menuId}>
                    <Link
                        className="nav-link scroll"
                        to={`${data.link}`}
                    >
                        {data.title}
                        <i className="fal fa-angle-down" />
                    </Link>
                    <ul className="sub-menu">
                        {data.dropdownItem.map((item:any) => (
                            <li key={item.link}>
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

export default React.memo(Navigation);
