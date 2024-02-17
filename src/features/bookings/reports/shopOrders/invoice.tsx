import React from 'react';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useIntl } from 'react-intl';
import { useRedux } from 'hooks';
import { selectContactDetails } from 'features/content/contactSelectors';
import { formatCurrency } from 'helpers/currency';

type InvoiceDonation = {
    orderid:string;
    orderData:any;
}
/* eslint-disable */
/* eslint no-underscore-dangle: 0 */
function InvoiceDonationComp(props:InvoiceDonation) {
    const { orderid, orderData } = props;
    const { appSelector } = useRedux();

    const intl = useIntl();

    const invoiceDetails = orderData.find((order:any) => orderid === order._id);

    const TempleStaticData = appSelector(selectContactDetails);


    const handlePrint = () => {
        const input:any = document.getElementById('invoice-wrapper-print');
    
        // Set A4 sheet dimensions (210mm x 297mm)
        const pdfWidth = 210;
        const pdfHeight = 297;
    
        html2canvas(input, { scale: 2 }) // Use scale to increase the resolution
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    unit: 'mm',
                    format: 'a4',
                });
               
                const aspectRatio = canvas.width / canvas.height;
                const pdfHeightNew = pdfWidth / aspectRatio;
                const pdfWidthNew = pdfHeightNew <= pdfHeight ? pdfWidth : pdfWidth * (pdfHeight / pdfHeightNew);
                const xPos = (pdfWidth - pdfWidthNew) / 2;
                pdf.addImage(imgData, 'JPEG', xPos, 0, pdfWidthNew, pdfHeightNew);
    
                // Save the PDF
                pdf.save('invoice.pdf');
            });
    };
    

    return (

        <div id="invoice">
            <div className="toolbar hidden-print">
                <div className="text-right">
                    <button type="button" onClick={handlePrint} className="btn btn-info"><i className="fa fa-file-pdf-o" />Download as PDF</button>
                </div>
                <hr />
            </div>
            <div id="invoice-wrapper-print" className="invoice overflow-auto">
                <div className="invoice-wrapper">
                    <header>
                        <div className="row">
                            <div className="col">
                                <div className="logo-container">
                                    <img alt="logo" src={`${window.location.origin}/assets/images/logo/${TempleStaticData?.TempleLogo}`} width={60} height={60} />
                                </div>
                                <h4 className="logo-heading">{TempleStaticData?.TempleName}</h4>
                            </div>
                            <div className="col company-details">
                                <div>{TempleStaticData?.Address}</div>
                                <div>{TempleStaticData?.Phonenumber}</div>
                                <div>{TempleStaticData?.Emailaddress}</div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="row contacts">
                            <div className="col invoice-to">
                                <div className="text-gray-light">INVOICE TO:</div>
                                <h2 className="to">{invoiceDetails?.devoteeName}</h2>
                                <div>{invoiceDetails?.billingAddress?.billingAddress},<br />
                                    {invoiceDetails?.billingAddress?.billingCity},
                                    {invoiceDetails?.billingAddress?.state}-
                                    {invoiceDetails?.billingAddress?.billingZipcode}<br />
                                </div>
                                <div className="email">Email:<a href="mailto:john@example.com">{invoiceDetails?.devoteeEmail}</a></div>
                            </div>
                            <div className="col invoice-details">
                                <h3 className="invoice-id">INVOICE # {invoiceDetails?.OrderId}</h3>
                                <div className="date">Date of Invoice: {moment(invoiceDetails?.OrderDate).format('YYYY-MM-DD')}</div>
                            </div>
                        </div>
                        <table border={0} cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="text-center">Product</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceDetails?.Items?.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td className="no">{index + 1}</td>
                                        <td className="text-center donationType">{item?.name}</td>
                                        <td className="text-center qty">{item?.quantity}</td>
                                        <td className="text-center price">{formatCurrency(intl, item?.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="sub-total-donaton">
                                <tr>
                                    <td aria-label="subtotal" colSpan={1} />
                                    <td colSpan={2}>SUBTOTAL</td>
                                    <td className="text-right">{formatCurrency(intl, invoiceDetails?.amount)}</td> {/* Add 'text-right' class for right alignment */}
                                </tr>
                                {/* ... (previous code) */}
                                <tr>
                                    <td aria-label="total" colSpan={1} />
                                    <td colSpan={2}>GRAND TOTAL</td>
                                    <td className="text-right">{formatCurrency(intl, invoiceDetails?.amount)}</td> {/* Add 'text-right' class for right alignment */}
                                </tr>
                            </tfoot>
                        </table>
                        {/* <div className="thanks">Thank you!</div> */}
                        <div className="notices">
                            <div>NOTICE:</div>
                            <div className="notice">General notice if required.</div>
                        </div>
                    </main>
                    <footer>
                        Invoice was created on a computer and is valid without the signature and seal.
                    </footer>
                </div>

                <div />
            </div>
        </div>
    );
}

export default InvoiceDonationComp;
