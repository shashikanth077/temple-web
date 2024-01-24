import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { selectStaffs } from 'features/content/contactSelectors';
import useRedux from 'hooks/useRedux';
import Button from 'sharedComponents/button/button';
import Heading from 'sharedComponents/heading/heading';
import { PublicImageURL } from 'constants/PublicUrl';

export default function Staffs() {
    const { appSelector } = useRedux();

    const StaffStaticContent = appSelector(selectStaffs);

    return (
        <section className="staffs area-padding">
            <Container>
                <div className="justify-content-right row">
                    <Heading title={StaffStaticContent?.heading} />
                </div>
                <Row>
                    {StaffStaticContent?.StaffList?.map((staff:any) => (
                        <Col key={staff.id} lg={3} md={6}>
                            <div className="staff-box mb-4">
                                <div className="overflow-hidden rounded">
                                    <img className="img-fluid d-block mx-auto shadow" src={`${PublicImageURL}/staff/${staff.image}`} alt={staff.name} />;
                                    <div className="staff-content">
                                        <h3>
                                            <span>{staff.name}</span>
                                        </h3>
                                        <span>{staff.designation}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className="staff-connect d-flex justify-content-end">
                    <Button classnames="staff-connect-btn read-more">{StaffStaticContent?.btnName}</Button>
                </div>
            </Container>
        </section>
    );
}
