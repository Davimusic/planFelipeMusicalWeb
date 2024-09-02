import React, { useState, useEffect, useRef } from 'react';
//redux
import { useSelector } from 'react-redux';

const Input = ({ inputType, id, style, required, onValueChange, value, name }) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef(null);
    const objectInEdition = useSelector(state => state.objectInEdition);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    useEffect(() => {
        if (objectInEdition && objectInEdition.name === name) {
            inputRef.current.focus();
        }
    }, [objectInEdition, name]);

    return (
        <input
            ref={inputRef}
            type={inputType}
            id={id}
            style={style}
            required={required}
            value={inputValue}
            name={name}
            onChange={handleChange}
        />
    );
};

export default Input;





