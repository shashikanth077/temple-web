import React, { useMemo } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './_gmap.scss';

const GMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'ChIJKxjxuaNqkFQR3CK6O1HNNqY' || '',
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    return (
        <div className="google-map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                />
            )}
        </div>
    );
};

export default GMap;
