import React from 'react';
import { getStaticContent } from 'utils/contentUtil';

interface HeadingProps {
    title:string;
    classes?:string;
}

export default function Heading(props:HeadingProps) {
    const { title, classes } = props;
    return (
        <div className="row">
            <div className="col-sm-8">
                <div className="section-title text-left mb-4">
                    <h2 className={`${classes}`}>{getStaticContent(title)}</h2>
                    <div className="bar" />
                </div>
            </div>
        </div>
    );
}
