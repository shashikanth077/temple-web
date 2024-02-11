import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import TempleHeader from './templeHeader';
import TaxReceiptCopy from './mydonations/taxReceiptCopy';
import { formatDate } from 'utils/DateUtil';
import { selectStaticTaxReceipt } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';
import { formatCurrency } from 'helpers/currency';

/* eslint-disable */
/* eslint no-underscore-dangle: 0 */

type InvoiceDonation = {
    donationId: string;
    donationData: any;
}

const TaxReceipt = (props: InvoiceDonation) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const { donationId, donationData } = props;
    const intl = useIntl();
    const { appSelector } = useRedux();

    const rowData = donationData.find((donation: any) => donationId === donation._id);
    const ReceiptContent = appSelector(selectStaticTaxReceipt);

    const handlePrint = () => {
        const input: any = document.getElementById('Print-Tax-Section');
    
        // Set A4 sheet dimensions (210mm x 297mm)
        const pdfWidth = 210;
        const pdfHeight = 297;
    
        // Add margins (10mm top and bottom)
        const topMargin = 10;
        const bottomMargin = 10;
    
        html2canvas(input, { scale: 2 }) // Use scale to increase the resolution
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    unit: 'mm',
                    format: 'a4',
                });
    
                const aspectRatio = canvas.width / canvas.height;
                const pdfHeightNew = pdfHeight - topMargin - bottomMargin;
                const pdfWidthNew = pdfHeightNew * aspectRatio;
                const xPos = (pdfWidth - pdfWidthNew) / 2;
    
                // Add top margin
                pdf.addImage(imgData, 'JPEG', xPos, topMargin, pdfWidthNew, pdfHeightNew);
    
                // Save the PDF
                pdf.save('simple.pdf');
            });
    };
    

    return (
        <div className="tax-receipt-main">
            <div className="toolbar hidden-print">
                <div className="text-right">
                    <button type="button" onClick={handlePrint} className="btn btn-info"><i className="fa fa-file-pdf-o" />Download as PDF</button>
                </div>
                <hr />
            </div>
            <div id="Print-Tax-Section" className='Print-Tax-Section'>
                <div className="card">
                    <div className="card-header">
                        <TempleHeader />
                    </div>
                    <div className="card-body temple-receipt-body">
                        <Row>
                            <Col md={12} className="text-center">
                                <p className="temple-body-heading">{ReceiptContent?.heading} - {currentYear}</p>
                                <p className="tax-recp-copy">{ReceiptContent?.originalCopy}</p>
                            </Col>
                        </Row>
                        <Row className="tax-receipt-content">
                            <Col md={9}>
                                <div className="left-receipt-content">
                                    <div className="devote-number">
                                        <p><b>Devote No:{rowData?.devoteeId}</b></p>
                                    </div>
                                    <p>{ReceiptContent?.ReceivedStatement} <b>{formatCurrency(intl, rowData?.donatedAmount)}</b></p>
                                    <div className="donor-address">
                                        <p><b>{rowData?.donorName}</b></p>
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
                <Row className="cut-dot">
                    <Col md={12} className="text-center">
                        <div className="scissor-line">
                            <i className="far fa-cut"></i>
                        </div>
                    </Col>
                </Row>
                <div className='Duplicate-tax-receipt'>
                    <TaxReceiptCopy rowData={rowData} />
                </div>
            </div>
        </div>
    );
};

export default TaxReceipt;
