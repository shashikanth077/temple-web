import React from 'react';
import {
    Col,
} from 'react-bootstrap';
import { getStaticContent } from 'utils/contentUtil';

interface HeadingProps {
    title:string;
    classes?:string;
}

export default function Heading(props:HeadingProps) {
    const { title, classes } = props;
    return (
        <Col lg={12}>
            <div className="text-left mb-2">
                <h2 className={`${classes}`}>{getStaticContent(title)}</h2>
            </div>
        </Col>
    );
}
