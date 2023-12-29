import React from 'react';
import './_viewmorebtn.scss';

interface Props {
    classnames: string;
    title:string;
    children?: React.ReactNode;
}

const ViewMore: React.FC<Props> = ({
    classnames,
    title,
    children,
}) => (
    <a href="##" className={`${classnames} ar_btn button-with-icon`}><span className="ar_btn_icon"><i className="fal fa-arrow-right" /></span><span className="ar_button_text"><span className="ar_button_title">{title}</span></span></a>
);

ViewMore.defaultProps = {
    children: '',
};

export default ViewMore;
