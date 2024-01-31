import React from 'react';

interface ArrowProps {
    classes:string;
    onEvent: any;
}

/* eslint-disable */
const Prevarrow = ({ classes, onEvent }: ArrowProps) => (
    <div
        className={classes}
        onClick={onEvent}
        style={{
            position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 1,
        }}
    >
        {/* Your arrow icon or content */}
        <i className="pi pi-chevron-left" style={{ fontSize: '2rem' }} />
    </div>
);

// Nextarrow component
const Nextarrow = ({ classes, onEvent }: ArrowProps) => (
    <div
        className={classes}
        onClick={onEvent}
        style={{
            position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: 1,
        }}
    >
        {/* Your arrow icon or content */}
        <i className="pi pi-chevron-right" style={{ fontSize: '2rem' }} />
    </div>
);

export {Prevarrow,Nextarrow} ;