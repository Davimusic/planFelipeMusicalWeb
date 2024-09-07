import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterReducer from '@/funciones/redux/counterReducer';
import '../app/globals.css';

const store = createStore(counterReducer);

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
