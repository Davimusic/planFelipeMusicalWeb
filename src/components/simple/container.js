import React from 'react';
import '../../estilos/general/general.css'
import extractArrayContentToStrings from '@/functions/general/extractArrayContentToStrings';

const Container = ({ children, className, style }) => {
    return (
        <div className={extractArrayContentToStrings(className)} style={style}>
            {children}
        </div>
    );
};

export default Container;
