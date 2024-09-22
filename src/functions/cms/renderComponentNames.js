import TransitionComponent from "./transitionComponent";

const renderComponentNames = (component, depth = 0) => {
    const { type, id, children } = component;
    //console.log(component);
    
    return (
        <div style={{ marginLeft: depth * 10, paddingLeft: '5px', marginTop: '10px' }} onClick={(e) => {
            e.stopPropagation();
            {TransitionComponent(id)}
        }}>
            {type}
            {children && children.map((child, index) => (
                <div key={index}>
                    {renderComponentNames(child, depth + 1)}
                </div>
            ))}
        </div>
    );
};

export default renderComponentNames

