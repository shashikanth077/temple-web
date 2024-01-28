import React from 'react';

interface HeadingProps {
    classes:string;
    title:string;
}
const HeadingVersionOne = ({ classes, title }:HeadingProps) => (
    <div className={`heading-divider ${classes}`}><h1>{title}</h1>
        <img src={`${window.location.origin}/assets/images/general/headDividerSvg.svg`} alt="Heading Divider" />
    </div>
);

export default HeadingVersionOne;
