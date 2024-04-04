import React, { useMemo, useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import './_gmap.scss';

/* eslint-disable */
const GMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || '',
    });
    const center = useMemo(() => ({ lat: 43.651070, lng: -79.347015 }), []);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (isLoaded && mapContainerRef.current) {
            const map = new window.google.maps.Map(mapContainerRef.current, {
                center: center,
                zoom: 10,
            });

            const marker = new window.google.maps.Marker({
                position: center,
                map: map,
                title: '1325 Matheson Blvd East Mississauga -ON L4W 1R1',
            });
        }
    }, [isLoaded, center]);

    return (
        <div className="google-map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }}></div>
            )}
        </div>
    );
};

export default GMap;
