import React, { useRef, useEffect } from 'react';
import {
    OverlayScrollbars,
} from 'overlayscrollbars';
import 'overlayscrollbars/styles/overlayscrollbars.css';

interface OverlayScrollbarReactProps {
  options?: any;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const OverlayScrollbarReact: React.FC<OverlayScrollbarReactProps> = ({ options, style, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const containerElement:any = containerRef.current;

        if (containerElement) {
            OverlayScrollbars(containerElement, options);
        }

        return () => {
            // Cleanup when the component is unmounted
            const osInstance = OverlayScrollbars(containerElement);
            osInstance?.destroy();
        };
    }, [options]);

    return (
        <div ref={containerRef} style={{ ...style, maxHeight: '300px', overflow: 'auto' }}>
            {children}
        </div>
    );
};

export default OverlayScrollbarReact;
