import React, { useState } from 'react';
import '../estilos/IsShow.css'

const IsShow = ({informacion, contenido, width, height}) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div style={{width: width, height: height}} onMouseOver={() => setShowInfo(!showInfo)} className="container">
            {showInfo && 
                <div className="tooltip">
                    {informacion}
                </div>
            }
            {contenido}
        </div>
    );
};

export default IsShow;

