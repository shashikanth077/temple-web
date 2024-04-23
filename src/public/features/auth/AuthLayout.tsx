import React, { useEffect } from 'react';
import {
    Container,
} from 'react-bootstrap';

type AccountLayoutProps = {
    hasLogo?: boolean;
    children?: React.ReactNode;
};

const AuthLayout = ({ hasLogo, children }: AccountLayoutProps) => {
    useEffect(() => {
        if (document.body) {
            document.body.classList.add('authentication-bg');
        }
        return () => {
            if (document.body) {
                document.body.classList.remove('authentication-bg');
            }
        };
    }, []);

    return (
        <div className="account-pages my-5">
            <Container>
                {children}
            </Container>
        </div>
    );
};

AuthLayout.defaultProps = {
    hasLogo: false,
};

export default AuthLayout;
