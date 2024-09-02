import React from 'react';

const Text = ({ text, style }) => {
    return (
        <p style={style}>{text}</p>
    );
};

export default Text;