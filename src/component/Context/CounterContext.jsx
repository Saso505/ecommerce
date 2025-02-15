/* eslint-disable */
import React, { createContext, useState } from 'react';

// Create context
export let CounterContext = createContext(0);


// Context Provider component
export function CounterContextProvider(props) {
    const [counter, setCounter] = useState(0);
    const [user, setUser] = useState('');

    return (
        <CounterContext.Provider value={{ counter, setCounter, user, setUser }}>
            {props.children}
        </CounterContext.Provider>
    );
}
