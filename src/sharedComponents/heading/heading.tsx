import React from 'react';
import {
    Col,
} from 'react-bootstrap';
import { getStaticContent } from 'utils/contentUtil';

interface HeadingProps {
    title:any;
}

export default function Heading(props:HeadingProps) {
    const { title } = props;
    return (
        <Col lg={12}>
            <div className="text-left mb-2">
                <h2 className="">{getStaticContent(title)}</h2>
            </div>
        </Col>
    );
}
