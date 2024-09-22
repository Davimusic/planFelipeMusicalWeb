import React from 'react';
import '../../estilos/general/general.css'

const Video = ({id, src, style , className}) => {
    return (
        <video id={id} controls style={style} className={className}>
            <source src={src} type="video/mp4" />
            Tu navegador no admite el elemento de video.
        </video>
    );
};

export default Video;
