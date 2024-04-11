import React, {
    useMemo, useState, useEffect, useRef,
} from 'react';
import { useLoadScript } from '@react-google-maps/api';
import './_gmap.scss';

/* eslint-disable */
const GMap = (props:any) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || '',
    });
    const [lat, setLat] = useState("43.651070");
    const [lng, setLng] = useState("-79.347015");
    const [address, setAddress] = useState("");
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
                const formattedAddress = data.results[0].formatted_address;
                setLat(location.lat);
                setLng(location.lng);
                setAddress(formattedAddress);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLocation();
    }, []); 

    useEffect(() => {
        if (isLoaded && mapContainerRef.current) {
            const map = new window.google.maps.Map(mapContainerRef.current, {
                center: { lat: parseFloat(lat), lng: parseFloat(lng) }, // Convert lat and lng to numbers
                zoom: 14,
            });
    
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(lat), lng: parseFloat(lng) }, // Convert lat and lng to numbers
                map: map,
                title: address ? address : '1325 Matheson Blvd East Mississauga -ON L4W 1R1',
            });
            const infowindow = new google.maps.InfoWindow({
                content: `<div>${address}</div>`, // Use cityName or any other address
            });
    
            infowindow.open(map, marker); // Open the infowindow
    
            // Close the infowindow when the marker is clicked
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
        }
    }, [isLoaded, lat, lng, cityName]);

    return (
        <div className="google-map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <div ref={mapContainerRef} style={{ height: '60vh', width: '100%', borderRadius:'5px' }}></div>
            )}
        </div>
    );
};

export default GMap;