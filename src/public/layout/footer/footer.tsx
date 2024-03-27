import React from 'react';
import { Link } from 'react-router-dom';
import { getStaticContent } from 'utils/contentUtil';
import { selectStaticFooter, selectContactDetails } from 'contents/content/contactSelectors';
import { useRedux } from 'hooks';
import { PublicImageURL } from 'constants/publicUrl';

/* eslint-disable jsx-a11y/anchor-is-valid */
function Footer() {
    const { appSelector } = useRedux();

    const footerContent = appSelector(selectStaticFooter);
    const contactDetails = appSelector(selectContactDetails);

    return (
        <section className="temple-footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="footer-about-widget">
                            <div className="logo">
                                <a aria-label="Footer-logo" href="##">
                                    <img src={`${window.location.origin}/${PublicImageURL}/logo/${footerContent?.LogoPath}`} alt="temple logo" />
                                </a>
                            </div>
                            <p>
                                {getStaticContent(footerContent?.LogoCaption)}
                            </p>
                            <a href={`${footerContent?.ReadMoreUrl}`}>
                                {footerContent?.ReadMore} <i className={`${footerContent?.RightArrowIcon}`} />
                            </a>
                            <div className="social mt-30">
                                <ul>
                                    {contactDetails?.Sociallinks?.map((item:any) => (
                                        <li key={item.iconName}>
                                            <a aria-label={`${item?.label}`} href={`${item?.link}`}>
                                                <i className={`${item?.iconName}`} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="footer-navigation">
                            <h4 className="title">Temple</h4>
                            <ul>
                                {footerContent?.QuickLinks?.map((item:any) => (
                                    <li key={item.name}>
                                        <Link to={`${item.url}`}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-navigation">
                            <h4 className="title">Other Useful links</h4>
                            <ul>
                                {footerContent?.OtherUsefullLinks?.map((item:any) => (
                                    <li key={item.name}>
                                        <Link to={`${item.url}`}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget-info">
                            <h4 className="title">{footerContent?.GetInTouchTitle}</h4>
                            <ul>
                                <li>
                                    <a>
                                        <i className={`${contactDetails?.PhoneIcon}`} /> {contactDetails?.Phonenumber}
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className={`${contactDetails?.EmailIcon}`} /> {contactDetails?.Emailaddress}
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className={`${contactDetails?.AddressIcon}`} /> {contactDetails?.Address}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-copyright d-flex align-items-center justify-content-between pt-10">
                            <div className="copyright-text">
                                <p>{footerContent?.CopyRights}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default React.memo(Footer);
