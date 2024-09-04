import React from 'react';
import '../../estilos/general/general.css'

const Container = ({ children, className, style }) => {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
};

export default Container;
