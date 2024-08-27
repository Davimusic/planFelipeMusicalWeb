import React, { useState } from 'react';

const Input = ({ inputType, id, style, required, onValueChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        //console.log(`Input ${id} value:`, event.target.value);
        if (onValueChange) {
            onValueChange(event.target.value);
        }
    };

    return (
        <input
            type={inputType}
            id={id}
            style={style}
            required={required}
            value={value}
            onChange={handleChange}
        />
    );
};

export default Input;

