import React, { useState, useEffect } from 'react';
import UpcomingBookings from './UpcomingBookings';
import CompletedBookings from './CompletedBookings';

const TabsComponent = () => {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [activeClass, setActiveClass] = useState<string>('upcome');

    // useEffect(() => {
    // // Fetch data from your API endpoint
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('YOUR_API_ENDPOINT');
    //             const result = await response.json();
    //             setData(result);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const handleTabClick = (index:number) => {
        setActiveTab(index);
        const tabHide = 'upcome';
        if (index === 1) {
            setActiveClass('upcome');
        }
        if (index === 2) {
            setActiveClass('complete');
        }
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        type="button"
                        className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => handleTabClick(1)}
                    >
                        Upcoming bookings
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        type="button"
                        className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => handleTabClick(2)}
                    >
                        Completed bookings
                    </button>
                </li>

            </ul>

            <div className={`${activeClass} tab-content report-content`}>
                <div
                    key={1}
                    className={`tab-pane fade ${activeClass === 'upcome' ? 'show active' : ''}`}
                >
                    <UpcomingBookings />
                </div>
                <div
                    key={2}
                    className={`tab-pane fade ${activeClass === 'complete' ? 'show active' : ''}`}
                >
                    <CompletedBookings />
                </div>

            </div>
        </div>
    );
};

export default TabsComponent;
