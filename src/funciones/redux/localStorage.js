// src/redux/localStorage.js
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        console.log("Estado guardado:", state);
    } catch (err) {
        console.error("No se pudo guardar el estado", err);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        console.log("Estado cargado:", state);
        return state;
    } catch (err) {
        console.error("No se pudo cargar el estado", err);
        return undefined;
    }
};

