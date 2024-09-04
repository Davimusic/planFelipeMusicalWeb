import React from 'react';
import HandleMultipleFunctions from '@/funciones/generales/handleMultipleFunctions';

const Text = ({ text, style, className, onClick}) => {
    return (
        <p onClick={HandleMultipleFunctions(...onClick)} style={style} className={className}>{text}</p>
    );
};

export default Text;