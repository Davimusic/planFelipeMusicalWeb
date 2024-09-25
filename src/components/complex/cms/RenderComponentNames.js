//en consideracion borrar

const RenderComponentNames = ({component, setId, setBody}) => {
    console.log(component);
    
    const { type, id, children } = component;
    let depth = 0
    
    return (
        <div style={{ marginLeft: depth * 2, paddingLeft: '5px', marginTop: '10px'}} onClick={(e) => {
            e.stopPropagation();
            {addFrameClass(component, id, setId, setBody)}
        }}>
            {type}
            {children && children.map((child, index) => (
                <div key={index}>
                    {<RenderComponentNames component={child} setId={(value)=> setId(value)} setBody={(value)=> setBody(value)} />}
                    {depth += 1}
                </div>
            ))}
        </div>
    );
};

function addFrameClass(obj, id, setId, setBody) {
    function updateObject(obj, id) {
        if (obj.id === id) {
            setId(id)
            obj.className = obj.className || [];
            if (!obj.className.includes('frame')) {
                obj.className.push('frame');
            }
        } else {
            if (obj.className && obj.className.includes('frame')) {
                obj.className = obj.className.filter(className => className !== 'frame');
            }
        }

        if (obj.children && obj.children.length > 0) {
            obj.children = obj.children.map(child => updateObject(child, id));
        }

        return obj;
    }

    // Clonar el objeto antes de modificarlo
    const clonedObj = JSON.parse(JSON.stringify(obj));
    const updatedObj = updateObject(clonedObj, id);
    setBody(updatedObj);
}

export default RenderComponentNames
