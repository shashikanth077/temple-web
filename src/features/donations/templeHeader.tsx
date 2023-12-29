import React from 'react';

const TempleHeader = () => (

    <div className="container temple-receipt-header">
        <div className="col-md-12">
            <div className="text-center">
                <img src={`${window.location.origin}/assets/images/logo/logo.jpg`} width={30} alt="logo" /><p className="temple-name pt-2">Siva Sathya Narayana Swamy temple</p>
                <p>1325 Matheson Bivd,Mississuaqa, ON L4W 1R1</p>
                <div className="temple-contact-info">
                    <p><b>Tel</b>:(905)-282-0108</p>
                    <p>Charity BN/ 823015227RR0001</p>
                    <p>www.srisathyatemple.com</p>
                </div>
            </div>
        </div>
    </div>

);

export default TempleHeader;
