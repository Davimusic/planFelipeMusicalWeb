import React from 'react';

const Video = ({ src, style }) => {
    return (
        <video controls style={style}>
        <source src={src} type="video/mp4" />
        Tu navegador no admite el elemento de video.
        </video>
    );
};

export default Video;
