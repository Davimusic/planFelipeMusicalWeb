"use client"

import { Root } from './root';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterReducer from "@/funciones/redux/counterReducer";
const store = createStore(counterReducer);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Root></Root>
    </Provider>
  );
}
