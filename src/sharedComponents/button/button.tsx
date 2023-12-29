import React from 'react';

interface Props {
    classnames: string;
    btntype?:boolean;
    children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
    classnames,
    children,
    btntype,
}) => (
    <button
        type={btntype ? 'submit' : 'button'}
        className={`generic-button ${classnames}`}
    >
        {children}
    </button>
);

Button.defaultProps = {
    children: '',
    btntype: false,
};

export default Button;
