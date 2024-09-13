import React from 'react';
import RenderElement from '@/funciones/renderElement';
import extractArrayContentToStrings from '@/funciones/generales/extractArrayContentToStrings';

const Button = ({ onClick, children, style, className, id }) => {
    return (
        <button id={id} className={extractArrayContentToStrings(className)} onClick={onClick} style={style}>
            {Array.isArray(children) ? children.map((child, index) => (
                <React.Fragment key={index}>
                    {RenderElement(child)}
                </React.Fragment>
            )) : null}
        </button>
    );
};

export default Button;

