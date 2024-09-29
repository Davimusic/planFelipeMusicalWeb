const renderComponentNames = (component, handleButtonClick, selectedId) => {
    const { type, id, children } = component;
    let depth = 0;

    return (
        <div style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
            <div
                className={selectedId === id ? 'color2 borders1' : ''}
                style={{ padding: '10px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(id);
                }}
            >
                {type}
            </div>
            {children && children.map((child, index) => (
                <div key={index}>
                    {renderComponentNames(child, handleButtonClick, selectedId)}
                </div>
            ))}
        </div>
    );
};

export default renderComponentNames;
