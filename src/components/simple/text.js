import React from 'react';

const Text = ({ text, estilo }) => {
    return (
        <p style={estilo}>{text}</p>
    );
};

export default Text;