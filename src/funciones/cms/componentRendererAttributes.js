import Input from "@/components/simple/input";

const componentRendererAttributes = (component, targetId) => {
    const filteredComponent = traverseAndFilter(component, targetId);
    return (
        <div>
            {formatNode(filteredComponent)}
        </div>
    );
};

function traverseAndFilter(node, targetId) {
    if (node.id === targetId) {
        return node;
    }
    if (node.children) {
        for (let child of node.children) {
            const result = traverseAndFilter(child, targetId);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

const formatNode = (node) => {
    if (!node) return null;

    return (
        <div key={node.id} style={{}}>
            <div>Type: {node.type}</div>
            <button className='borders1' style={{marginRight: '10px', background: 'green', padding: '10px', fontSize: '100%'}}>
                Save changes
            </button>
            {/*<div>ID: {node.id}</div>*/}
            <div>onClick: {node.onClick ? <Input className={['borders1']} type={"text"} value={node.onClick.toString()} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/> : <Input className={['borders1']} type={"text"} value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>}</div>
            {node.className && (
                <div style={{display: 'block', background: 'gold'}} className='borders1 padding1'>
                    ClassName:
                    {node.className.map((className, index) => (
                        <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}} key={index}>
                            {className} <button className='borders1' onClick={() => console.log(className + ' borrar')} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                        </div>
                    ))}
                </div>
            )}
            {node.style && (
                <div className='borders1 padding1' style={{background: 'gold'}}>
                    Style:
                    {Object.entries(node.style).map(([key, value], index) => (
                        <div key={index} style={{display: 'block', background: 'blue'}} className='borders1'>
                            <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}}>
                                {key}   <button className='borders1' onClick={() => console.log(key + ' borrar')} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                            </div>
                            <Input className={['borders1']} type={"text"} value={value} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>
                        </div>
                    ))}
                </div>
            )}
            <button className='borders1' style={{marginRight: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                Delete
            </button>
            {node.type !== 'Container' && node.children && node.children.map(child => formatNode(child))}
        </div>
    );
};

export default componentRendererAttributes