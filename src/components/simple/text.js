import React from 'react';

const Text = ({ text, style, className, onClick}) => {
    return (
        <p onClick={onClick}  style={style} className={className}>{text}</p>
    );
};
export default Text;