import React, { useEffect } from 'react';

/* eslint-disable jsx-a11y/anchor-is-valid */
export function TopToBottom(value:any) {
    const result = document.querySelector(value);
    if (result != null) {
        document.addEventListener('scroll', () => {
            if (
                document.body.scrollTop > window.innerHeight
                || document.documentElement.scrollTop > window.innerHeight
            ) {
                result.style.display = 'block';
            } else {
                result.style.display = 'none';
            }
        });
    }
}

interface backProps{
    className:string;
}
function BackToTop(props:backProps) {
    const { className } = props;
    useEffect(() => {
        TopToBottom('.back-to-top');
    });
    return (
        <div className={`back-to-top ${className}`}>
            <a aria-label="backtotop" href="#">
                <i className="fal fa-arrow-up" />
            </a>
        </div>
    );
}

export default BackToTop;
