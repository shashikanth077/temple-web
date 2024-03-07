import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectPublicMenu } from 'features/content/contactSelectors';
import useRedux from 'hooks/useRedux';

interface DrawerProps {
    drawer:boolean;
    action: (event:any) => void;
}

/* eslint-disable jsx-a11y/anchor-is-valid */
function Drawer(Props : DrawerProps) {
    const [menuExpandflag, setMenuFlag] = useState(false);

    const { drawer, action } = Props;

    const menuExpandToggle = (e: any, value: boolean) => {
        e.preventDefault();
        setMenuFlag(_value => !value);
    };

    const { dispatch, appSelector } = useRedux();

    const menuList:any = appSelector(selectPublicMenu);

    return (
        menuList && menuList.length > 0 && (
            <>
                <div
                    aria-label="over-lay"
                    tabIndex={0}
                    onClick={e => action(e)}
                    onKeyDown={e => action(e)}
                    role="button"
                    className={`off_canvars_overlay ${drawer ? 'active' : ''}`}
                />
                <div className="offcanvas_menu">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div
                                    className={`offcanvas_menu_wrapper ${drawer ? 'active' : ''}`}
                                >
                                    <div className="canvas_close">
                                        <a aria-label="close-icon" href="#" onClick={e => action(e)}>
                                            <i className="fa fa-times" />
                                        </a>
                                    </div>
                                    <div className="offcanvas-brand text-center mb-40">
                                        <img width="60px" src="assets/images/logo/logo.jpg" alt="" />
                                    </div>
                                    <div id="menu" className="text-left menu-toggle">
                                        <ul className="offcanvas_main_menu">
                                            {menuList?.map((data:any) => (data?.isDropdown === true ? (
                                                <li key={data.menuId}>
                                                    <div
                                                        className="menu-item-has-children active"
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={e => menuExpandToggle(e, false)}
                                                        onKeyDown={e => menuExpandToggle(e, false)}
                                                    >
                                                        <span className="menu-expand">
                                                            <i className="fa fa-angle-down" />
                                                        </span>
                                                        <a href="#">{data.title}</a>
                                                    </div>

                                                    <ul
                                                        id="home"
                                                        className={`sub-menu sidebar-sub-menu ${
                                                            menuExpandflag ? 'expend_menu_item' : ''
                                                        }`}
                                                    >
                                                        {data.dropdownItem.map((item:any) => (
                                                            <li key={item.title}>
                                                                <Link to={item.link}>{item.title}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li key={data.menuId}>
                                                    <Link to={`${data.link}`}> {data.title}</Link>
                                                </li>
                                            )))}
                                        </ul>
                                    </div>
                                    <div className="offcanvas-social">
                                        <ul className="text-center">
                                            <li>
                                                <a aria-label="over-lay" href="$">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="over-lay" href="$">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="over-lay" href="$">
                                                    <i className="fab fa-instagram" />
                                                </a>
                                            </li>
                                            <li>
                                                <a aria-label="over-lay" href="$">
                                                    <i className="fab fa-dribbble" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-widget-info">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="fal fa-envelope" /> support@temple.com
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fal fa-phone" /> +(642) 342 762 44
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fal fa-map-marker-alt" /> 442 Belle
                                                    Terre St Floor 7, San Francisco, AV 4206
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default React.memo(Drawer);
