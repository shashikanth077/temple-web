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
        menuList && menuList.length > 0 && (
            <ul>
                {menuList.map((data:any) => (
                    <li key={data.menuId}>
                        {data.isDropdown === true ? (
                            <Link className="nav-link scroll" to={`${data.link}`}>
                                {data.title}
                                <i className="fal fa-angle-down" />
                            </Link>
                        ) : (
                            <PageLink to={`${data.link}`}>{data.title}</PageLink>
                        )}
                        {data.isDropdown === true && data.dropdownItem && data.dropdownItem.length > 0 && (
                            <ul className="sub-menu">
                                {data.dropdownItem.map((item:any) => (
                                    <li key={item.link}>
                                        <PageLink to={item.link}>{item.title}</PageLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        )
    );
};
export default React.memo(Navigation);
