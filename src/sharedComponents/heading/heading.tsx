import React from 'react';
import { getStaticContent } from 'utils/contentUtil';

interface HeadingProps {
    title:string;
    classes?:string;
    align?:string;
    headingWrapClass?:string;
}

const Heading: React.FC<HeadingProps> = ({
    title, classes = 'default-classes', align = 'text-left', headingWrapClass,
}) => (
    <div className={`row ${headingWrapClass}`}>
        <div className={`section-title ${align} mb-4`}>
            <h2 className={`${classes}`}>{getStaticContent(title)}</h2>
            <div className="box first" />
        </div>
    </div>
);

export default Heading;
