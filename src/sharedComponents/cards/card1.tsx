import React from 'react';
import { Card, CardText, CardTitle } from 'react-bootstrap';

interface CardProps {
    cardClass: string;
    title: string;
    imageStatus:boolean;
    CardImage?:any;
    imageType?:string;
    description:string;
    buttonStatus:boolean;
}

const CardBoxNew: React.FC<CardProps> = ({
    cardClass,
    title,
    description,
    CardImage,
    imageType,
    imageStatus,
    buttonStatus,
}) => (
    <Card className={`${cardClass}`}>

        {(imageStatus && imageType === 'icon') && <i className={CardImage} /> }
        {(imageStatus && imageType === 'image') && <Card.Img variant="top" src={CardImage} alt={title} />}
        <Card.Body>
            <CardTitle>
                {title}
            </CardTitle>
            <CardText>
                {description}
            </CardText>
            {buttonStatus ? (
                <h1>dd</h1>
            ) : (
                ''
            )}
        </Card.Body>
    </Card>
);

CardBoxNew.defaultProps = {
    CardImage: '',
    imageType: '',
};
export default CardBoxNew;
