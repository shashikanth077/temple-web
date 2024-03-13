import React, { useState } from 'react';
import ShopOrders from './shopOrders';
import ServiceBookings from './services';
import SevaBookings from './seva';
import EventBookings from './events';
import { Types } from 'constants/services';
import Heading from 'sharedComponents/heading/heading';

const Orders: React.FC = () => {
    const [type, setType] = useState<string>('shopOrders');

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    return (
        <>
            <Heading
                headingWrapClass="heading-head-wrap"
                title="Bookings"
                classes="text-center mt-3"
                align="text-center"
            />

            <div className="mb-4">
                <label htmlFor="orderType" className="form-label">
                    Select options to see respective booking history
                </label>
                <div className="col-md-6">
                    <select
                        className="form-select"
                        id="orderType"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        {Types.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {type === 'shopOrders' && <ShopOrders />}
            {type === 'Services' && <ServiceBookings />}
            {type === 'Seva' && <SevaBookings />}
            {type === 'Events' && <EventBookings />}
        </>
    );
};

export default Orders;
