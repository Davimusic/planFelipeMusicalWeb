import React from 'react';
import RenderElement from '@/funciones/renderElement';
import { Alert } from '@/funciones/generales/alert';
import HandleMultipleFunctions from '@/funciones/generales/handleMultipleFunctions';

const Button = ({ onClick, children, style }) => {
    console.log(onClick);
    
    return (
        <button onClick={HandleMultipleFunctions(...onClick)}  style={style}>
            {Array.isArray(children) ? children.map((child, index) => {
                //console.log('Rendering child:', child);
                return (
                    <React.Fragment key={index}>
                        {RenderElement(child)}
                    </React.Fragment>
                );
            }) : null}
        </button>
    );
};

export default Button;

