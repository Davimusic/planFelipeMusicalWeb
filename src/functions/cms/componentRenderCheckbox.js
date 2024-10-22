import React, { useState } from 'react';
import ModernCheckbox from './ModernCheckbox';

const ComponentRenderCheckbox = (condition, id, labelTrue, labelFalse, handleChange, isChecked) => {
    const [state, setState] = useState(false);

    function localHandleChange() {
        setState(!state);
        handleChange();
    }

    return (
        <>
            {condition ? labelTrue : labelFalse}
            <ModernCheckbox
                id={id}
                actionFunction={localHandleChange}
                isCheckedInitially={isChecked}
            />
        </>
    );
};

export default ComponentRenderCheckbox;


