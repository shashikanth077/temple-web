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

global.Buffer = Buffer;
const stripePromise = loadStripe('pk_test_kLXZAIgM9jW9flHREsbzTupH');

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
