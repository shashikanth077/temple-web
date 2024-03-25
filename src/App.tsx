import { Buffer } from 'buffer';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import { PersistGate } from 'redux-persist/integration/react';
import { IntlProvider } from 'react-intl';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { persistor, store } from './storeConfig/store';
import './assets/scss/_main.scss';
import { ThemeProvider } from 'context/useThemeContext';
import Routes from 'routes/Routes';
import ErrorBoundary from 'sharedComponents/Error/ErrorBoundary';
import { config } from 'config/Env';

global.Buffer = Buffer;
const stripePromise = loadStripe(config.STRIPE_PUBLIC_API_KEY || 'null');

function App() {
    return (
        <IntlProvider locale="en">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div className="App">
                        <ErrorBoundary>
                            <PrimeReactProvider>
                                <Elements stripe={stripePromise}>
                                    <ThemeProvider>
                                        <Routes />
                                    </ThemeProvider>
                                </Elements>
                            </PrimeReactProvider>
                        </ErrorBoundary>
                    </div>
                </PersistGate>
            </Provider>
        </IntlProvider>
    );
}

export default React.memo(App);
