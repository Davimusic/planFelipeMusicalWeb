import React from 'react';
import RenderElement from '@/funciones/renderElement';

const Button = ({ onClick, children, style }) => {
    return (
        <button onClick={onClick} style={style}>
            {Array.isArray(children) ? children.map((child, index) => {
                console.log('Rendering child:', child);
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

