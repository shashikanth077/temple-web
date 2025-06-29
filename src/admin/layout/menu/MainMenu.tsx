import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { config } from 'config/Env';

// helpers
import { MenuItemTypes } from 'constants/adminMenu';
import { findAllParent, findMenuItem } from 'helpers/adminmenu';

// constants
/* eslint-disable */
interface SubMenus {
    item: MenuItemTypes
    linkClassName?: string
    subMenuClassNames?: string
    activeMenuItems?: Array<string>
    toggleMenu?: (item: any, status: boolean) => void
    className?: string
}

const MenuItemWithChildren = ({
    item,
    linkClassName,
    subMenuClassNames,
    activeMenuItems,
    toggleMenu,
}: SubMenus) => {
    const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = () => {
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={`side-nav-item ${open ? 'menuitem-active' : ''}`}>
            <Link
                to="#"
                className={`side-nav-link ${linkClassName} ${
					activeMenuItems!.includes(item.key) ? 'open' : ''
                }`}
                aria-expanded={open}
                data-menu-key={item.key}
                onClick={toggleMenuItem}
            >
                {item.icon && <i className={item.icon} />}
                {!item.badge ? (
                    <span className="menu-arrow" />
                ) : (
                    <span className={`badge bg-${item.badge.variant} float-end`}>
                        {item.badge.text}
                    </span>
                )}
                <span> {item.label}</span>
            </Link>
            <Collapse in={open}>
                <div>
                    <ul className={`side-nav-second-level ${subMenuClassNames}`}>
                        {(item.children || []).map((child, idx) => (
                            <React.Fragment key={idx}>
                                {child.children ? (
                                    <MenuItemWithChildren
                                        item={child}
                                        linkClassName={
												activeMenuItems!.includes(child.key) ? 'active' : ''
                                        }
                                        activeMenuItems={activeMenuItems}
                                        subMenuClassNames="sub-menu"
                                        toggleMenu={toggleMenu}
                                    />
                                ) : (
                                    <MenuItem
                                        item={child}
                                        className={
												activeMenuItems!.includes(child.key)
												    ? 'menuitem-active'
												    : ''
                                        }
                                        linkClassName={
												activeMenuItems!.includes(child.key) ? 'active' : ''
                                        }
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </Collapse>
        </li>
    );
};

const handleMenuItemClick = (key: any) => {
    const menuItems = document.querySelectorAll('#main-side-menu li');
     menuItems.forEach(item => {
        const menuItemKey = item.getAttribute('data-key');
        if (menuItemKey === key) {
            item.classList.add('menuitem-active'); 
        } else {
            item.classList.remove('menuitem-active'); 
        }
    });
}

const MenuItem = ({ item, className, linkClassName }: SubMenus) =>
	 (
        <li data-key={item?.key} onClick={() => handleMenuItemClick(item?.key)}  className={`side-nav-item ${className}`}>
        <MenuItemLink item={item} className={linkClassName} />
    </li>
    );

const MenuItemLink = ({ item, className }: SubMenus) => (
    <Link
        to={item.url!}
        target={item.target}
        className={`side-nav-link-ref ${className}`}
        data-menu-key={item.key}
    >
        {item.icon && <i className={item.icon} />}
        {item.badge && (
            <span className={`badge bg-${item.badge.variant} float-end`}>
                {item.badge.text}
            </span>
        )}
        <span> {item.label}</span>
    </Link>
);

/**
 * Renders the application menu
 */
interface AppMenuProps {
	menuItems: MenuItemTypes[]
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
    const location = useLocation();

    const menuRef = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    /**
	 * toggle the menus
	 */
    const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {

        if (show) {
            setActiveMenuItems([
                menuItem.key,
                ...findAllParent(menuItems, menuItem),
            ]);
        }
    };

    /**
	 * activate the menuitems
	 */
    const activeMenu = useCallback(() => {
        const div = document.getElementById('main-side-menu');
        let matchingMenuItem: HTMLElement | null = null;

        if (div) {
            const items: any = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                let trimmedURL = location?.pathname?.replaceAll(
                    config.PUBLIC_URL ?? '',
                    '',
                );
                const url = items[i].pathname;
                if (trimmedURL === `${config.PUBLIC_URL}`) {
                    trimmedURL += '';
                }
                if (trimmedURL === url?.replaceAll(config.PUBLIC_URL, '')) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid as any);
                if (activeMt) {
                    setActiveMenuItems([
                        activeMt.key,
                        ...findAllParent(menuItems, activeMt),
                    ]);
                }

                setTimeout(() => {
                    const activatedItem = matchingMenuItem!;
                    if (activatedItem != null) {
                        const simplebarContent = document.querySelector(
                            '#leftside-menu-container .simplebar-content-wrapper',
                        );
                        const offset = activatedItem!.offsetTop - 300;
                        if (simplebarContent && offset > 100) {
                            scrollTo(simplebarContent, offset, 600);
                        }
                    }
                }, 200);

                // scrollTo (Left Side Bar Active Menu)
                function easeInOutQuad(t: any, b: any, c: any, d: any) {
                    t /= d / 2;
                    if (t < 1) return (c / 2) * t * t + b;
                    t--;
                    return (-c / 2) * (t * (t - 2) - 1) + b;
                }
                function scrollTo(element: any, to: any, duration: any) {
                    const start = element.scrollTop;
                    const change = to - start;
                    let currentTime = 0;
                    const increment = 20;
                    const animateScroll = function () {
                        currentTime += increment;
                        const val = easeInOutQuad(currentTime, start, change, duration);
                        element.scrollTop = val;
                        if (currentTime < duration) {
                            setTimeout(animateScroll, increment);
                        }
                    };
                    animateScroll();
                }
            }
        }
    }, [location, menuItems]);

    useEffect(() => {
        activeMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className="side-nav" ref={menuRef} id="main-side-menu">
            {(menuItems || []).map((item, idx) => (
                <React.Fragment key={idx}>
                    {item.isTitle ? (
                        <li className="side-nav-title">{item.label}</li>
                    ) : (
                        <>
                            {item.children ? (
                                <MenuItemWithChildren
                                    item={item}
                                    toggleMenu={toggleMenu}
                                    subMenuClassNames=""
                                    activeMenuItems={activeMenuItems}
                                    linkClassName="side-nav-link"
                                />
                            ) : (
                                <MenuItem
                                    item={item}
                                    linkClassName="side-nav-link"
                                    className={
												activeMenuItems!.includes(item.key)
												    ? 'menuitem-active'
												    : ''
                                    }
                                />
                            )}
                        </>
                    )}
                </React.Fragment>
            ))}
        </ul>

    );
};

export default AppMenu;
