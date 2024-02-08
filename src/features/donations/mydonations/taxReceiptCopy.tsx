import React from 'react';
import { Col } from 'react-bootstrap';
import TempleHeader from '../templeHeader';
import { selectStaticTaxReceipt } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';

const TaxReceiptCopy = () => {
    const { appSelector } = useRedux();

    const taxReceipt = appSelector(selectStaticTaxReceipt);

    return (
        <div className="card">
            <div className="card-header">
                <TempleHeader />
            </div>
            <div className="card-body temple-receipt-body">
                <div className="row">
                    <p className="temple-body-heading pt-2">{taxReceipt?.heading} in 2023</p>
                    <p className="tax-recp-copy">{taxReceipt?.originalCopy}</p>
                    <div className="tax-receipt-content">
                        <Col md={9}>
                            <div className="left-reciept-content">
                                <div className="devote-number">
                                    <p><b>Devote No:345</b></p>
                                </div>
                                <p>{taxReceipt?.ReceivedStatement} : <b>$1500.00 </b></p>
                                <div className="donor-addres">
                                    From:
                                    <p><b>Shashikanth</b><br />
                                        Central park
                                        Oakvile ON L6HOE4
                                    </p>

                                </div>
                                <p><b>{taxReceipt?.AsDonation} Siva Sathya Narayana Swamy temple,Canada 2023</b></p>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="right-reciept-content">
                                <div className="receipt-date">Date: 12-04-2023</div>
                                <div className="receipt-no">Receipt No: 2023/12945</div>
                            </div>
                            <div className="treasure-signature">
                                <img width={50} height={50} src={`${window.location.origin}/${taxReceipt?.TresurerSig}`} alt="signature" />
                                <p><b>Tresurer</b></p>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaxReceiptCopy;
