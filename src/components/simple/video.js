import React from 'react';
import '../../estilos/general/general.css'

const Video = ({ src, style , className}) => {
    return (
        <video controls style={style} className={className}>
            <source src={src} type="video/mp4" />
            Tu navegador no admite el elemento de video.
        </video>
    );
};

export default Video;
