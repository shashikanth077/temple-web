import React from 'react';

interface Props {
    classnames: string;
    btntype?:boolean;
    disabled?:boolean
    children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
    classnames,
    children,
    btntype,
    disabled,
}) => (
    <button
        type={btntype ? 'submit' : 'button'}
        disabled={disabled}
        className={`generic-button ${classnames}`}
    >
        {children}
    </button>
);

Button.defaultProps = {
    children: '',
    btntype: false,
    disabled: false,
};

export default Button;
