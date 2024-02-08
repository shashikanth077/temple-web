import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

/* eslint-disable */
interface ShippingAddressProps {
  setShipping: (values: ShippingValues) => void;
}

interface ShippingValues {
  email: string;
  name: string;
  address: string;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ setShipping }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingValues>();

    const onSubmit: SubmitHandler<ShippingValues> = data => {
        console.log('data', data);
        setShipping(data);
    };

    return (
        <div>
            <h4>Shipping Address</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        {...register('name', { required: 'Required' })}
                        placeholder="Name"
                        className={`nomad-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && (
                        <div className="error-message">{errors.name.message}</div>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        {...register('email', { required: 'Required' })}
                        placeholder="Email"
                        className={`nomad-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && (
                        <div className="error-message">{errors.email.message}</div>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        {...register('address', { required: 'Required' })}
                        placeholder="Address"
                        className={`nomad-input ${errors.address ? 'error' : ''}`}
                    />
                    {errors.address && (
                        <div className="error-message">{errors.address.message}</div>
                    )}
                </div>
                <div className="submit-btn">
                    <button type="submit" className="button is-black nomad-btn submit">
                        CONTINUE
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingAddress;
