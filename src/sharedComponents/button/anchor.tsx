import React from 'react';

interface Props {
    classnames: string;
    title:string;
    link?:string;
    children?: React.ReactNode;
}

const Anchor: React.FC<Props> = ({
    classnames,
    title,
    children,
    link,
}) => (
    <a className={`${classnames} button-arrow`} href={link}><i className="fas fa-chevron-right" /><span>{title}</span></a>
);

Anchor.defaultProps = {
    children: '',
    link: '##',
};

export default Anchor;
