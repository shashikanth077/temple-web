import React, { useState, useRef, useEffect } from 'react';
import IconImg from './calendar_907222.png';

interface topProps {
    getFilterSortParams: any;
    SelectedDate: any;
}
/* eslint-disable */
function EventTopBar(props: topProps) {
    const { getFilterSortParams, SelectedDate } = props;
    const inputRef: any = useRef(null);
    const [showIcon, setShowIcon] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Change 768 to your desired mobile width breakpoint
            setShowIcon(window.innerWidth > 768); // Show icon by default on laptops
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const ListToggle = () => {
        if (isMobile) { 
            setShowIcon(!showIcon);
        }
    }

    return (
        <div className="container">
            <div className="events d-flex align-items-center">
                <div className="top-bar-search">
                    <div className="events-left-search-bar">
                        <div className="events-search-input-control-keyword">
                            <label className="events-search-input-control-label" htmlFor="events-bar-keyword">
                                Enter Keyword. Search for Events by Keyword.
                            </label>
                            <input ref={inputRef} type="text" className="search-top-input-box" name="search-top-input-box" placeholder="Search on event names" />
                        </div>
                    </div>
                    <button onClick={(e) => getFilterSortParams('topsearch', inputRef, e)} className="events-btn-top-bar-search" type="submit" name="submit-bar">
                        Find Events
                    </button>
                    {isMobile && <span className='filter-icon' onClick={ListToggle}><img src={IconImg} style={{ height: '35px' }} alt="Filter Icon" /></span>}
                </div>
                {showIcon && <div className="top-bar-right-search">
                    <ul className="events-selector-list">
                        <li className="events-selector-list-items events-selector-list-items-active">
                            <a onClick={(e) => getFilterSortParams('listAll', inputRef, e)} className="events-selector-list-items-link">
                                <span className="events-selector-list-item-text">
                                    List
                                </span>
                            </a>
                        </li>
                        <li className="events-selector-list-items">
                            <a onClick={(e) => getFilterSortParams('monthsearch', inputRef, e)} className="events-selector-list-items-link">
                                <span className="events-selector-list-item-text">
                                    MONTH
                                </span>
                            </a>
                        </li>
                        <li className="events-selector-list-items">
                            <a onClick={(e) => getFilterSortParams('daysearch', inputRef, e)} className="events-selector-list-items-link">
                                <span className="events-selector-list-item-text">
                                    DAY
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    );
}

export default EventTopBar;
