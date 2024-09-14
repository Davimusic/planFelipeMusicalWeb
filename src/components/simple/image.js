import React from 'react';
import '../../estilos/general/general.css';
import handleMultipleFunctions from '@/functions/general/handleMultipleFunctions';

const Image = ({ src, alt, className, style, width, height, onClick }) => {
    return (
        <img onClick={handleMultipleFunctions(...onClick)} src={src} alt={alt} className={className} style={style} width={width} height={height} />
    );
};

export default Image;

