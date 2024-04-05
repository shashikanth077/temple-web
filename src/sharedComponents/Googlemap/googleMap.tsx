import React, { useMemo, useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import './_gmap.scss';

/* eslint-disable */
const GMap = (props:any) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC04rZv1chRUziEDZ2V02Fdhcy5VOkpNNA' || '',
    });
    const [lat, setLat] = useState("43.651070");
    const [lng, setLng] = useState("-79.347015");

    const center:any = useMemo(() => ({ lat: lat || 43.651070, lng: lng || -79.347015 }), [lat, lng]);
    const mapContainerRef = useRef(null);
    const cityName = props.location || "toranto";
   
    useEffect(() => {
        const fetchLocation = async () => {
            const apiKey = process.env.REACT_APP_GOOGLE_KEY;
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const location = data.results[0].geometry.location;
                setLat(location.lat);
                setLng(location.lng);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLocation();
    }, []); 

    useEffect(() => {
        if (isLoaded && mapContainerRef.current) {
            const map = new window.google.maps.Map(mapContainerRef.current, {
                center: center,
                zoom: 10,
            });

            const marker = new window.google.maps.Marker({
                position: center,
                map: map,
                title: cityName? cityName : '1325 Matheson Blvd East Mississauga -ON L4W 1R1',
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