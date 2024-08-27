import React from 'react';

const Container = ({ children, className, style }) => {
    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
};

export default Container;
