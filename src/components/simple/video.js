import React from 'react';

const Video = ({ src, estilo }) => {
    return (
        <video controls style={estilo}>
        <source src={src} type="video/mp4" />
        Tu navegador no admite el elemento de video.
        </video>
    );
};

export default Video;
