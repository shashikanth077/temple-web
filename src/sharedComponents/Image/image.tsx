import React from 'react';

interface ImageProps {
    imageUrl:string;
    altText:string;
    classname:string;
    style?:any;
    width?:string;
    height?:string;
}
const ImageComponent = (props:ImageProps) => {
    const {
        imageUrl, altText, classname, style, width, height,
    } = props;
    const defaultImageUrl = 'http://localhost:3000/assets/images/default/default.jpg';
    return (
        <img
            style={style}
            width={width}
            height={height}
            className={classname}
            src={imageUrl}
            alt={altText}
            onError={(e:any) => {
                e.target.src = defaultImageUrl; // Set default image if the original image fails to load
            }}
        />
    );
};

export default ImageComponent;
