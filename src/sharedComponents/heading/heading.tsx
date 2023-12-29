import React from 'react';
import {
    Col,
} from 'react-bootstrap';

interface HeadingProps {
    title:string;
}

export default function Heading(props:HeadingProps) {
    const { title } = props;
    return (
        <Col lg={7}>
            <div className="text-right mb-2">
                <h2 className="">{title}</h2>
            </div>
        </Col>
    );
}
