import React, { createContext, useReducer, useContext, useEffect, useState, } from 'react';

export class Enum {
    constructor(listOfKeys, startingIndex = 0) {
        this.keys = [...listOfKeys];

        listOfKeys.forEach(e => {
            this[e] = startingIndex;
            this[startingIndex] = e;
            startingIndex++;
        });

        Object.freeze(this);
    }

    getKey(value) {
        const key = this[value];
        if (key === undefined) {
            throw new Error(`Invalid enum value: ${value}`);
        }
        return key;
    }
}

const initialState = {
    version: '1.0.0'
}

export const GlobalContext = createContext(initialState);

const StateProvider = ({ children, localKey = 'global', initialValues = initialState, reducer = Reducer, clearState = false }) => {
    if (clearState) clearAllPersistedState();

    const [persistedState, setPersistedState] = UsePersistedState(localKey, initialValues);
    const [state, dispatch] = useReducer(reducer, persistedState);

    useEffect(() => {
        setPersistedState(state);
    }, [setPersistedState, state]);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

const ActionType = new Enum([
    'HELLO_WORLD',
]);

export function ReadKwestJournal() {
    const { state, dispatch } = useContext(GlobalContext);

    const [functions] = useState({
        helloWorld: () => {
            dispatch({ type: ActionType.HELLO_WORLD, payload: 'Hello World!' });
        },
    });

    return {
        ...functions,
        state,
    };
}

const Reducer = (state = initialState, action) => {
    let newState = structuredClone(state);
    switch (action.type) {
        case ActionType.HELLO_WORLD:
            alert(action.payload)
            break;

        default:
            console.error(`Unknown action type: ${action.type}`);
            throw new Error();
    }
    return newState;
};

const UsePersistedState = (key, initialState) => {
    const storageKey = `Kwest-Journal.${key}`;
    const hydrateState = () => {
        try {
            const persisted = window.localStorage.getItem(storageKey);
            const parsedRes = JSON.parse(persisted);

            if (parsedRes.version !== initialState.version) {
                console.warn('State version mismatch, returning initial state...')
                return initialState;
            }
            return parsedRes || initialState;
        } catch {
            console.warn('Failed to read current state version, returning initial state...')
            return initialState;
        }
    };

    const [state, setState] = useState(hydrateState);

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey]);

    return [state, setState];
}

export const clearAllPersistedState = () => {
    console.log('Clearing State')
    Object.keys(window.localStorage).forEach(key => {
        if (key.startsWith('Kwest-Journal.')) {
            window.localStorage.removeItem(key);
        }
    });
}

export const clearCache = () => {
    caches
        .keys()
        .then((names) => names.forEach(e => caches.delete(e)));
}

export default StateProvider;
