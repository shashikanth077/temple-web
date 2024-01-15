import React from 'react';

interface HeadingProps {
    classes:string;
}
const HeadingVersionOne = ({ classes }:HeadingProps) => (
    <div className={`heading-divider ${classes}`}><h1>Types of Donations</h1>
        <img src={`${window.location.origin}/assets/images/general/headDividerSvg.svg`} alt="Heading Divider" />
    </div>
);

export default HeadingVersionOne;
