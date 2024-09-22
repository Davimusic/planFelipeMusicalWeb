import React from 'react';

const Audio = ({ src, id }) => {
    return (
        <audio controls>
            <source id={id} src={src} type="audio/mpeg" />
            Tu navegador no admite el elemento de audio.
        </audio>
        );
};

export default Audio;