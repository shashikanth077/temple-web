import React, { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';

interface ButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    label:string;
    imageSrc?:string;
    btnClassName:string;
    imgClassName?:string;
    imgAlt?:string;
    disabled?:boolean;
    btnType?: 'button' | 'submit' | 'reset' | undefined;
  }

const ButtonV1 = (props:ButtonProps) => {
    const {
        onClick, imgAlt, label, imageSrc, btnClassName, imgClassName, disabled = false, btnType = 'button',
    } = props;

    return (
        <Button disabled={disabled} type={btnType} onClick={onClick} className={`${btnClassName}`}>
            {label}
            {imageSrc && <img className={`${imgClassName}`} src={imageSrc} alt={imgAlt} />}
        </Button>
    );
};

export default ButtonV1;
