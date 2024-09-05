import React from 'react';
import HandleMultipleFunctions from '@/funciones/generales/handleMultipleFunctions';

const Text = ({ text, style, className, onClick}) => {
    return (
        <p  style={style} className={className}>{text}</p>
    );
};
//onClick={HandleMultipleFunctions(...onClick)}
export default Text;