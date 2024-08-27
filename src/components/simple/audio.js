import React from 'react';

const Audio = ({ src }) => {
    return (
        <audio controls>
            <source src={src} type="audio/mpeg" />
            Tu navegador no admite el elemento de audio.
        </audio>
        );
};

export default Audio;