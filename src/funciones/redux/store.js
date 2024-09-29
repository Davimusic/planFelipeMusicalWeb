// src/redux/store.js
import { createStore } from 'redux';
import counterReducer from './counterReducer';
import { saveState, loadState } from './localStorage';

const persistedState = loadState();
const store = createStore(counterReducer, persistedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;



/*import { createStore } from 'redux';
import counterReducer from '../redux/counterReducer';

const store = createStore(counterReducer);

export default store;*/