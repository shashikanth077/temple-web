import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { uid } from 'uid';

type InvoiceDonation = {
    donationId:string;
    donationData:any;
}
/* eslint no-underscore-dangle: 0 */
const InvoiceDonation = (props:InvoiceDonation) => {
    const { donationId, donationData } = props;

    const invoiceDetails = donationData.find((donation:any) => donationId === donation._id);

    return (
        <Row>
            <Col md={12}>
                <Card>
                    <Card.Body>
                        <div className="panel-body">
                            <div className="clearfix">
                                <div className="float-start">
                                    <h3><b>Sri sathya narayana temple</b></h3>
                                    <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} width="80" alt="logo" />
                                </div>
                                <div className="float-end">
                                    <h4>
                                        Invoice # <br />
                                        <strong>{invoiceDetails._id}</strong>
                                    </h4>
                                </div>
                            </div>
                            <hr />
                            <Row>
                                <Col md={12}>
                                    <div className="float-start mt-3">
                                        <address>
                                            <strong>{invoiceDetails.address.name}</strong>
                                            <br />
                                            {invoiceDetails.address.address1}
                                            <br />
                                            {invoiceDetails.address.city}, {invoiceDetails.address.state}{' '}
                                            {invoiceDetails.address.zip}
                                            <br />
                                            <abbr title="Phone">P:</abbr> {invoiceDetails.address.phone}
                                        </address>
                                    </div>
                                    <div className="float-end mt-3">
                                        <p>
                                            <strong>Donated Date: </strong> {invoiceDetails.date}
                                        </p>
                                        <p className="m-t-10">
                                            <strong>Donation Status: </strong>{' '}
                                            <span className="label label-pink">{invoiceDetails.status}</span>
                                        </p>
                                        <p className="m-t-10">
                                            <strong>Donation ID: </strong> {invoiceDetails._id}
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <div className="table-responsive">
                                        <table className="table mt-4">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Cost</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(invoiceDetails.donatedItems || []).map((item:any, idx:number) => (
                                                    <tr key={uid()}>
                                                        <td>{idx + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.cost}</td>
                                                        <td>{item.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <p className="text-end">
                                    <b>Sub-total:</b> {invoiceDetails.sub_total}
                                </p>
                                <p className="text-end">VAT: {invoiceDetails.tax}%</p>
                                <hr />
                                <h3 className="text-end">CAD {invoiceDetails.totalAmount}</h3>

                            </Row>
                            <hr />
                            <div className="d-print-none">
                                <div className="float-end">
                                    <button
                                        type="button"
                                        aria-label="Print"
                                        className="btn btn-dark waves-effect waves-light me-1"
                                        onClick={e => {
                                            window.print();
                                        }}
                                    >
                                        <i className="fa fa-print" />
                                    </button>
                                </div>
                                <div className="clearfix" />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default InvoiceDonation;
