import React from 'react';

const Text = ({id, text, style, className, onClick}) => {
    return (
        <p id={id} onClick={onClick}  style={style} className={className}>{text}</p>
    );
};
export default Text;