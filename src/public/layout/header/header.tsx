import React, { useEffect } from 'react';
import Navigation from '../menu/menu';
import { selectStaticHeader } from 'contents/content/contactSelectors';
import StickyMenu from 'sharedComponents/stickymenu/stickyMenu';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/PublicUrl';

type HeaderProps = {
  action: any;
}

function Header(props: HeaderProps) {
    const { action } = props;
    const { appSelector } = useRedux();

    useEffect(() => {
        StickyMenu();
    });

    const headerContent = appSelector(selectStaticHeader);

    return (
        <header className="temple-header-area temple-sticky">
            <div className="container">
                <div className="header-nav-box justify-content-between  d-flex header-nav-4-box">
                    <a aria-label="logo" href="/">
                        <img src={`${window.location.origin}/${PublicImageURL}/logo/${headerContent?.HeaderLogo}`} width="50px" className="img-fluid" alt="Temple-logo" />
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

export default React.memo(Header);
