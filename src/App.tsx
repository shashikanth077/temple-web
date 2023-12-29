import { Buffer } from 'buffer';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './storeConfig/store';
import './assets/scss/_main.scss';
import Routes from 'routes/Routes';
import ErrorBoundary from 'sharedComponents/Error/ErrorBoundary';

global.Buffer = Buffer;

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <ErrorBoundary>
                        <PrimeReactProvider>
                            <Routes />
                        </PrimeReactProvider>
                    </ErrorBoundary>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
