import React, { useState } from 'react';
import ShopOrders from './shopOrders';
import ServiceBookings from './services';
import SevaBookings from './seva';
import { Types } from 'constants/services';

const Orders: React.FC = () => {
    const [type, setType] = useState<string>('shopOrders');

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    return (
        <>
            <h2 className="mb-4">My Bookings</h2>

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
        </>
    );
};

export default Orders;
