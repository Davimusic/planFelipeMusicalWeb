import React from 'react';
import '../../estilos/general/general.css';

const Image = ({ src, alt, className, style,  width, height }) => {
    return (
        <img src={src} alt={alt} className={className} style={style}  width={width} height={height}/>
    );
};

export default Image;
