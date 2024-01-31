import React from 'react';
import { Card } from 'react-bootstrap';
import Button from '../button/button';
import ViewMore from 'sharedComponents/viewmorebtn/viewmorebtn';

interface CardProps {
    cardClass: string;
    title: string;
    imageStatus:boolean;
    CardImage?:string;
    buttontitle?:string;
    buttonClass?:string;
    description?:string;
    buttonStatus:boolean;
}

const CardBox: React.FC<CardProps> = ({
    cardClass,
    title,
    buttontitle,
    buttonClass,
    description,
    CardImage,
    imageStatus,
    buttonStatus,
}) => (
    <Card className={`${cardClass}`} style={{ backgroundImage: `url(${CardImage})` }}>
        <Card.Body>
            <Card.Title className="mt-0 card-title">
                {title}
            </Card.Title>
            {imageStatus ? (
                <Card.Text>
                    <img src={`${CardImage}`} alt="demo" />
                </Card.Text>
            ) : (
                <Card.Text>
                    {description}
                </Card.Text>
            )}
        </Card.Body>
        {buttonStatus ? (
            <Button classnames={`${buttonClass}`}>
                <span>{buttontitle}</span>
                <i className="fas fa-arrow-right" />
            </Button>
        ) : (
            <ViewMore classnames="card-btn" title="View More" />
        )}
    </Card>
);

CardBox.defaultProps = {
    CardImage: '',
    buttonClass: '',
    buttontitle: '',
};
export default CardBox;
