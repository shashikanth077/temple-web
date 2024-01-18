import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { staffActions } from './staffSlice';
import { selectStaffList } from './staffSelectors';
import useRedux from 'hooks/useRedux';
import Button from 'sharedComponents/button/button';
import Heading from 'sharedComponents/heading/heading';

export default function Staffs() {
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(staffActions.fetchStaffList());
    }, [dispatch]);

    const staffList = appSelector(selectStaffList);

    return (
        <section className="staffs area-padding">
            <Container>
                <div className="justify-content-right row">
                    <Heading title="Staff" />
                </div>
                <Row>
                    {staffList.map((staff, index) => (
                        <Col lg={3} md={6}>
                            <div className="staff-box mb-4">
                                <div className="overflow-hidden rounded">
                                    <img className="img-fluid d-block mx-auto shadow" src={`assets/images/staff/${staff.staff_image}`} alt={staff.staff_name} />;
                                    <div className="staff-content">
                                        <h3>
                                            <span>{staff.staff_name}</span>
                                        </h3>
                                        <span>{staff.staff_designation}</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                <div className="staff-connect d-flex justify-content-end">
                    <Button classnames="staff-connect-btn read-more">Connect</Button>
                </div>
            </Container>
        </section>
    );
}
