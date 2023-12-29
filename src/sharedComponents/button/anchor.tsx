import React from 'react';

interface Props {
    classnames: string;
    title:string;
    children?: React.ReactNode;
}

const Anchor: React.FC<Props> = ({
    classnames,
    title,
    children,
}) => (
    <a className={`${classnames} button-arrow`} href="##"><i className="fas fa-chevron-right" /><span>{title}</span></a>
);

Anchor.defaultProps = {
    children: '',
};

export default Anchor;
