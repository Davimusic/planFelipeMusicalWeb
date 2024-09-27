import React from 'react';
import '../../estilos/general/general.css'

const Video = ({id, src, onClick, style , className}) => {
    return (
        <video id={id} onClick={onClick} controls style={style} className={className}>
            <source src={src} type="video/mp4" />
            Tu navegador no admite el elemento de video.
        </video>
    );
};

export default Video;
