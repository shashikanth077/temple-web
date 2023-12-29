import React, { useEffect } from 'react';
import StickyMenu from '../../sharedComponents/stickymenu/stickyMenu';
import Navigation from '../menu/menu';

type HeaderProps = {
  action: any;
}

function Header(props: HeaderProps) {
    const { action } = props;

    useEffect(() => {
        StickyMenu();
    });

    return (
        <header className="temple-header-area temple-sticky">
            <div className="container">
                <div className="header-nav-box justify-content-between  d-flex header-nav-4-box">
                    <a aria-label="logo" href="/">
                        <img src="assets/images/logo/logo.jpg" width="50px" className="img-fluid" alt="" />
                    </a>
                    <div className="temple-btn-box">
                        <div aria-label="mobile-bar" className="toggle-btn ml-30 canvas_open d-lg-none d-block" tabIndex={0} onClick={e => action(e)} onKeyDown={e => action(e)} role="button">
                            <i className="fa fa-bars" />
                        </div>
                    </div>
                    <div className="temple-header-main-menu">
                        <Navigation />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
