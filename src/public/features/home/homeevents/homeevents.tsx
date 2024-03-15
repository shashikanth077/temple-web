import React from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SlickSlider from 'sharedComponents/carosel/carosel';
import Heading from 'sharedComponents/heading/heading';

interface EventProps {
    type:string;
    arrowsStatus:boolean;
    autoplayStatus:boolean;
    slidesToShowStatus:number;
    classes:string;
    data:any[];
    heading:string;
}

export default function HomeEvents(props:EventProps) {
    const {
        type, data, arrowsStatus, autoplayStatus, slidesToShowStatus, classes, heading,
    } = props;

    return (
        data.length > 0 ? (
            <section className={`${classes} home-events area-padding`}>
                <Container>
                    <div className="justify-content-right row">
                        <Heading title={heading} />
                    </div>
                    <Row className="justify-content-between d-flex gy-4">
                        <div className="slider-area">
                            <SlickSlider
                                arrowClassPrev={`${classes}-home-prev-pr`}
                                arrowClassNext={`${classes}-home-next-pr`}
                                NumOfSlide={1}
                                autoPly={false}
                            >
                                {data}
                            </SlickSlider>
                        </div>
                    </Row>
                </Container>
            </section>
        ) : null
    );
}
