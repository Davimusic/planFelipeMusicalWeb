import React from 'react';
import '../../estilos/general/general.css';
import handleMultipleFunctions from '@/functions/general/handleMultipleFunctions';

const Image = ({id, src, alt, className, style, width, height, onClick }) => {
    return (
        <img id={id} onClick={onClick} src={src} alt={alt} className={className} style={style} width={width} height={height} />
    );
};

export default Image;

