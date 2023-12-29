import React, { Component, ErrorInfo, ReactNode } from 'react';

/* eslint-disable */
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ hasError: true });
        logErrorToMyService(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}


export default ErrorBoundary;

// Function to log errors (replace with your actual error logging implementation)
const logErrorToMyService = (error: Error, errorInfo: ErrorInfo): void => {
    // Your error logging logic here
    console.error(error, errorInfo);
};
