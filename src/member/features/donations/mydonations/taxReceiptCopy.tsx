import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import TempleHeader from '../templeHeader';
import { formatDate } from 'utils/DateUtil';
import { selectStaticTaxReceipt } from 'contents/content/contactSelectors';
import { useRedux } from 'hooks';
import { formatCurrency } from 'helpers/currency';

/* eslint-disable */
/* eslint no-underscore-dangle: 0 */
type InvoiceDonation = {
    rowData: any;
}

const TaxReceipt = (props:InvoiceDonation) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const { rowData } = props;
    const intl = useIntl();
    const { appSelector } = useRedux();
    const ReceiptContent = appSelector(selectStaticTaxReceipt);

    return (
        <div className="tax-receipt-main">
            <div className="card">
                <div className="card-header">
                    <TempleHeader />
                </div>
                <div className="card-body temple-receipt-body">
                    <Row>
                        <Col md={12} className="text-center">
                            <p className="temple-body-heading">{ReceiptContent?.heading} - {currentYear}</p>
                            <p className="tax-recp-copy">{ReceiptContent?.DuplicateCopy}</p>
                        </Col>
                    </Row>
                    <Row className="tax-receipt-content">
                        <Col md={9}>
                            <div className="left-receipt-content">
                                <div className="devote-number">
                                    <p><b>Devote No:{rowData?.devoteeId}</b></p>
                                </div>
                                <p>{ReceiptContent?.ReceivedStatement} <b>{formatCurrency(intl, rowData?.amount)}</b></p>
                                <div className="donor-address">
                                    <p><b>{rowData?.devoteeName}</b></p>
                                    <p>{rowData?.billingAddress.address1}<br />
                                        {rowData?.billingAddress.city}, {rowData?.billingAddress.province}<br />
                                        {rowData?.billingAddress.postalCode}
                                    </p>
                                </div>
                                <p><b>as Donations to the {ReceiptContent?.TempleName} {currentYear}</b></p>
                            </div>
                        </Col>
                        <Col md={3} className="d-flex flex-column align-items-end">
                            <div className="right-receipt-content">
                                <div className="receipt-date"><strong>Date:</strong> {formatDate(rowData?.donationDate)}</div>
                                <div className="receipt-no"><strong>Receipt #:</strong> {rowData?.taxReceiptNo}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="treasurer-signature-row">
                        <Col md={11} className="text-right">
                            <div className="treasurer-signature">
                                <img className="mb-1" width={70} height={70} src={`${window.location.origin}/${ReceiptContent.TresurerSig}`} alt="signature" />
                                <p><b>Treasurer</b></p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default TaxReceipt;
