import React from 'react';

const Text = ({ text, style, className}) => {
    return (
        <p style={style} className={className}>{text}</p>
    );
};

export default Text;