import React from 'react';
import { Link } from 'react-router-dom';
import { uid } from 'uid';

type InvoiceDonation = {
    donationId:string;
    donationData:any;
}
/* eslint no-underscore-dangle: 0 */
function ProductInvoice() {
    // const { donationId, donationData } = props;

    // const invoiceDetails = donationData.find((donation:any) => donationId === donation._id);

    return (

        <div id="invoice">

            <div className="toolbar hidden-print">
                <div className="text-right">
                    <button type="button" id="printInvoice" className="btn btn-info"><i className="fa fa-print" /> Print</button>
                    <button type="button" className="btn btn-info"><i className="fa fa-file-pdf-o" /> Export as PDF</button>
                </div>
                <hr />
            </div>
            <div className="invoice overflow-auto">
                <div className="invoice-wrapper">
                    <header>
                        <div className="row">
                            <div className="col">
                                <a aria-label="logo" target="_blank" href="https://lobianijs.com" rel="noreferrer">
                                    <img alt="logo" src="http://lobianijs.com/lobiadmin/version/1.0/ajax/img/logo/lobiadmin-logo-text-64.png" data-holder-rendered="true" />
                                </a>
                            </div>
                            <div className="col company-details">
                                <h2 className="name">
                                    <a target="_blank" href="https://lobianijs.com" rel="noreferrer">
                                        Arboshiki
                                    </a>
                                </h2>
                                <div>455 Foggy Heights, AZ 85004, US</div>
                                <div>(123) 456-789</div>
                                <div>company@example.com</div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div className="row contacts">
                            <div className="col invoice-to">
                                <div className="text-gray-light">INVOICE TO:</div>
                                <h2 className="to">John Doe</h2>
                                <div className="address">796 Silver Harbour, TX 79273, US</div>
                                <div className="email"><a href="mailto:john@example.com">john@example.com</a></div>
                            </div>
                            <div className="col invoice-details">
                                <h1 className="invoice-id">INVOICE 3-2-1</h1>
                                <div className="date">Date of Invoice: 01/10/2018</div>
                            </div>
                        </div>
                        <table border={0} cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="text-left">Product name</th>
                                    <th className="text-left">UNIT PRICE</th>
                                    <th className="text-right">QUANTITY</th>
                                    <th className="text-right">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="no">1</td>
                                    <td className="product">H</td>
                                    <td className="unit">$0.00</td>
                                    <td className="qty">1</td>
                                    <td className="total">$0.00</td>
                                </tr>
                            </tbody>
                            <tfoot className="sub-total-donaton">
                                <tr>
                                    <td aria-label="subtotal" colSpan={2} />
                                    <td colSpan={2}>SUBTOTAL</td>
                                    <td>$5,200.00</td>
                                </tr>
                                <tr>
                                    <td aria-label="tax" colSpan={2} />
                                    <td colSpan={2}>TAX 25%</td>
                                    <td>$1,300.00</td>
                                </tr>
                                <tr>
                                    <td aria-label="total" colSpan={2} />
                                    <td colSpan={2}>GRAND TOTAL</td>
                                    <td>$6,500.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        {/* <div className="thanks">Thank you!</div> */}
                        <div className="notices">
                            <div>NOTICE:</div>
                            <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
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

export default React.memo(ProductInvoice);
