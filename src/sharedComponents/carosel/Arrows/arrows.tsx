import React from 'react';

interface ArrowProps {
    classes:string;
    onEvent: any;
}

export function Nextarrow(props:ArrowProps) {
    const { classes, onEvent } = props;
    return (
        <span
            aria-label="Prev-Arrow"
            className={`next slick-arrow ${classes}`}
            style={{ display: 'block' }}
            onClick={onEvent}
            onKeyDown={onEvent}
            role="button"
            tabIndex={0}
        >
            <i className="fas fa-chevron-right" />
        </span>
    );
}

export function Prevarrow(props:ArrowProps) {
    const { classes, onEvent } = props;
    return (
        <span
            aria-label="Next-Arrow"
            className={`prev slick-arrow ${classes}`}
            style={{ display: 'block' }}
            onClick={onEvent}
            onKeyDown={onEvent}
            role="button"
            tabIndex={0}
        >
            <i className="fas fa-chevron-left" />
        </span>
    );
}
