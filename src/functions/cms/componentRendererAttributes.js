import Input from "@/components/simple/input";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import findObjectById from "@/functions/general/findObjectById";
import React from 'react';
import TextArea from "@/components/simple/textArea";
import Select from "@/components/simple/selects";
import FileBrowser from "./fileBrowser";
import sortArrayAlphabetically from "@/functions/general/sortArrayAlphabetically";
import ComponentToggle from "./componentToggle";
import udpateBodies from "./udpateBodies";
import deleteComponent from "./deleteComponent";

let functions = importAllFunctions()

const componentRendererAttributes = (component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected, setIsModalOpen, setModalContent, resourceType, setSrcToInject, setBodyEdit, setBodyTest, bodyTest) => {
    
    const filteredComponent = traverseAndFilter(component, targetId);
    return (
        <div>
            {formatNode(filteredComponent, component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected, setIsModalOpen, setModalContent, resourceType, setSrcToInject, setBodyEdit, setBodyTest, bodyTest)}
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

const formatNode = (node, component, targetId, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected, setIsModalOpen, setModalContent, resourceType, setSrcToInject, setBodyEdit, setBodyTest, bodyTest) => {

    /*function udpateBodies(edit, test, isReloadBodyWithTraverseAndReplaceOnClick){
        if(isReloadBodyWithTraverseAndReplaceOnClick === true){
            setIsReinjected(true)
        }
        setBody(edit)
        setBodyEdit(edit)
        setBodyTest(test)
    }*/

    const removeClass = (classToRemove) => {
        const newArray = functions.removeStringFromArray(findObjectById(component, targetId).className, classToRemove)
        setClassNames(newArray)
        //setBody(functions.updateObjectKeyById(targetId, component, 'className', newArray))
        let editObj = functions.updateObjectKeyById(targetId, component, 'className', newArray)
        let testObj = functions.updateObjectKeyById(targetId, {...bodyTest}, 'className', newArray)
        //udpateBodies(editObj, testObj, false)
        udpateBodies(editObj, testObj, false, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    };

    const addClass = () => {
        const newArray = functions.addElementToArray(classNames, selectedClassName)
        setClassNames(newArray)
        //setBody(functions.updateObjectKeyById(targetId, component, 'className', newArray))
        let editObj = functions.updateObjectKeyById(targetId, component, 'className', newArray)
        let testObj = functions.updateObjectKeyById(targetId, {...bodyTest}, 'className', newArray)
        udpateBodies(editObj, testObj, false, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    }


    /*function deleteComponent() {
        const id = targetId;
        const obj = component
    
        function removeComponentById(id, obj) {
            if (obj.id === id) {
                return null;
            }
            if (obj.children) {
                obj.children = obj.children
                    .map(child => removeComponentById(id, child))
                    .filter(child => child !== null);
            }
            return obj;
        }
    
        //const clonedObj = clone(obj);
        //const clonedObj = functions.deepClone(obj)
    
        //reloadBodyWithTraverseAndReplaceOnClick(removeComponentById(id, clonedObj))
        let editObj = removeComponentById(id, functions.deepClone(obj))
        let testObj = removeComponentById(id, functions.deepClone(bodyTest))
        udpateBodies(editObj, testObj, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    }*/

    function deleteStyle(styleKey) {
        const obj = component
        
        // Función recursiva para eliminar el estilo
        function removeStyleById(styleKey, targetId, obj) {
            console.log(styleKey);
            console.log(targetId);
            console.log(obj);
            
            if (obj.id === targetId && obj.style) {
                delete obj.style[styleKey];
            }
            if (obj.children) {
                obj.children = obj.children.map(child => removeStyleById(styleKey, targetId, child));
            }
            return obj;
        }
    
        //const clonedObj = clone(obj);
        //reloadBodyWithTraverseAndReplaceOnClick(removeStyleById(styleKey, targetId, clonedObj))
        let editObj = removeStyleById(styleKey, targetId, functions.deepClone(obj))
        let testObj = removeStyleById(styleKey, targetId, bodyTest)
        udpateBodies(editObj, testObj, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    }

    function injectStyle() {
        const newKeyValue = document.getElementById('styleInput').value;
    
        function addStyleById(newKeyValue, targetId, obj) {
            if (obj.id === targetId) {
                const [key, value] = newKeyValue.split(':');
                if (obj.style) {
                    obj.style[key.trim()] = value.trim();
                } else {
                    obj.style = { [key.trim()]: value.trim() };
                }
            }
            if (obj.children) {
                obj.children = obj.children.map(child => addStyleById(newKeyValue, targetId, child));
            }
            return obj;
        }
    
        //const clonedObj = clone(component);
        //reloadBodyWithTraverseAndReplaceOnClick(addStyleById(newKeyValue, targetId, clonedObj))
        let editObj = addStyleById(newKeyValue, targetId, functions.deepClone(component))
        let testObj = addStyleById(newKeyValue, targetId, bodyTest)
        udpateBodies(editObj, testObj, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    }

    const setStyleInputValue = (key, value) => {
        document.getElementById('styleInput').value = `${key}: ${value}`
    }

    function updateValueByKey(key, newValue) {
        function update(obj) {
            if (obj.id === targetId) {
                if (obj[key] !== undefined) {
                    obj[key] = newValue;
                }
            } else if (obj.children) {
                obj.children = obj.children.map(child => update(child));
            }
            return obj;
        }
    
        //const clonedComponent = clone(component);
        //const updatedComponent = update(functions.deepClone(component));
        //reloadBodyWithTraverseAndReplaceOnClick(update(functions.deepClone(component)))
        

        let editObj = update(functions.deepClone(component))
        let testObj = update(functions.deepClone(bodyTest))
        udpateBodies(editObj, testObj, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
    }

    function updateSrcValue(a){
        updateValueByKey('src', a.secure_url)
    }

    if (!node) return null;

    

   


    /*return (
        <div key={node.id} style={{}}>
            <div>Type: {node.type}</div>
            <div className="marginTop1">onClick: {node.onClick ? <Input className={['borders1', 'cursor']} type="text" value={node.onClick.toString()} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/> : <Input className={['borders1']} type="text" value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%'}}/>}</div>
            {node.className && (
                <div style={{display: 'block', background: 'gold'}} className='borders1 padding1 marginTop1'>
                    ClassName:
                        <Select 
                            id={'selectFileBrowser'} 
                            style={{ marginRight: '10px', padding: '10px', fontSize: '100%', maxWidth: '100%', boxSizing: 'border-box' }} 
                            className={[]} 
                            name={'selectFileBrowser'} 
                            value={selectedClassName} 
                            event={(e) => setSelectedClassName(e.target.value)} 
                            options={['Select class', ...sortArrayAlphabetically(availableClasses)]} 
                        />
                        <button className='borders1 cursor' onClick={()=> addClass()} style={{marginRight: '10px', background: 'blue', padding: '10px', fontSize: '100%'}}>
                            Add class
                        </button>
                    {node.className.map((className, index) => (
                        <div className='borders1 center' style={{margin: '10px', background: 'black', padding: '10px', display: 'flex'}} key={index}>
                            {className} <button className='borders1 cursor' onClick={() => removeClass(className)} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                            x
                                        </button>
                        </div>
                    ))}
                </div>
            )}
            {node.style && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Style:
                    <Input id={'styleInput'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => console.log(e)} type="text" value={''} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                    <button className='borders1 cursor' onClick={() => injectStyle()} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                        add new style
                    </button>
                    {Object.entries(node.style).map(([key, value], index) => (
                        <div onClick={()=> setStyleInputValue(key, value)} key={index} style={{display: 'block', background: 'blue', margin: '10px'}} className='borders1'>
                            <div className='borders1 center' style={{background: 'black', padding: '10px', display: 'flex'}}>
                                {key}   
                                <button className='borders1 cursor' onClick={() => deleteStyle(key)} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                                    x
                                </button>
                            </div>
                            <p className='center'>{value}</p>
                        </div>
                    ))}
                </div>
            )}
            {node.text && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Text:                                                                                   
                    <Input id={'styleInput'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => updateValueByKey('text', e)} type="text" value={node.text} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                    <button className='borders1 cursor' onClick={() => injectStyle()} style={{margin: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                        add new style
                    </button>
                </div>
            )}
            {node.value && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    Value:
                    <TextArea id={'styleTextArea'} className={['borders1', 'cursor', 'marginTop1']} onValueChange={(e) => updateValueByKey('value', e)} type="text" value={node.value} style={{marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%'}}/>
                </div>
            )}
            {node.src && (
                <div className='borders1 padding1 marginTop1' style={{background: 'gold'}}>
                    src:
                    <div style={{width: '100vw', height: '2vh', background: 'black'}} onClick={() => { setIsModalOpen(true); setModalContent(<FileBrowser type={resourceType} showControls={false} actionFunction={updateSrcValue} path={'davipianof@gmail.com/plan felipe musical'}/>)}}>Change src</div>
                </div>
            )}
            <button className='borders1 cursor marginTop1' onClick={()=> deleteComponent()} style={{marginRight: '10px', background: 'red', padding: '10px', fontSize: '100%'}}>
                Delete component
            </button>
        </div>
    );*/
    return (
        <div key={node.id} style={{}}>
            <div>Type: {node.type}</div>
            <div className="marginTop1">
                onClick: 
                {ComponentToggle('onclickId')}
                <div id='onclickId'>
                    <Input 
                        className={['borders1', 'cursor']} 
                        type="text" 
                        value={node.onClick ? node.onClick.toString() : ''} 
                        style={{ marginRight: '10px', padding: '10px', fontSize: '100%' }}
                    />
                </div>
            </div>
            {node.hasOwnProperty('className') && (
                <div style={{ display: 'block', background: 'gold' }} className='borders1 padding1 marginTop1'>
                    ClassName:
                    {ComponentToggle('classNameId')}
                    <div id='classNameId'>
                        <Select 
                            id={'selectFileBrowser'} 
                            style={{ marginRight: '10px', padding: '10px', fontSize: '100%', maxWidth: '100%', boxSizing: 'border-box' }} 
                            className={[]} 
                            name={'selectFileBrowser'} 
                            value={selectedClassName} 
                            event={(e) => setSelectedClassName(e.target.value)} 
                            options={['Select class', ...sortArrayAlphabetically(availableClasses)]} 
                        />
                        <button className='borders1 cursor' onClick={addClass} style={{ marginRight: '10px', background: 'blue', padding: '10px', fontSize: '100%' }}>
                            Add class
                        </button>
                        {node.className.map((className, index) => (
                            <div className='borders1 center' style={{ margin: '10px', background: 'black', padding: '10px', display: 'flex' }} key={index}>
                                {className} 
                                <button className='borders1 cursor' onClick={() => removeClass(className)} style={{ margin: '10px', background: 'red', padding: '10px', fontSize: '100%' }}>
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {node.hasOwnProperty('style') && (
                <div className='borders1 padding1 marginTop1' style={{ background: 'gold' }}>
                    Style:
                    {ComponentToggle('styleId')}
                    <div id='styleId'>
                        <Input 
                            id={'styleInput'} 
                            className={['borders1', 'cursor', 'marginTop1']} 
                            onValueChange={() => {}} 
                            type="text" 
                            value={''} 
                            style={{ marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%' }}
                        />
                        <button className='borders1 cursor' onClick={injectStyle} style={{ margin: '10px', background: 'red', padding: '10px', fontSize: '100%' }}>
                            add new style
                        </button>
                        {Object.entries(node.style).map(([key, value], index) => (
                            <div onClick={() => setStyleInputValue(key, value)} key={index} style={{ display: 'block', background: 'blue', margin: '10px' }} className='borders1'>
                                <div className='borders1 center scroll' style={{ background: 'black', padding: '10px', display: 'flex' }}>
                                    {key}   
                                    <button className='borders1 cursor' onClick={() => deleteStyle(key)} style={{ margin: '10px', background: 'red', padding: '10px', fontSize: '100%' }}>
                                        x
                                    </button>
                                </div>
                                <p className='center'>{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {node.hasOwnProperty('text') && (
                <div className='borders1 padding1 marginTop1' style={{ background: 'gold' }}>
                    Text: 
                    {ComponentToggle('textId')}
                    <div id='textId'>                                                                                  
                        <Input 
                            id={'styleInput'} 
                            className={['borders1', 'cursor', 'marginTop1']} 
                            onValueChange={(e) => updateValueByKey('text', e)} 
                            type="text" 
                            value={node.text || ''} 
                            style={{ marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%' }}
                        />
                    </div>
                </div>
            )}
            {node.hasOwnProperty('value') && (
                <div className='borders1 padding1 marginTop1' style={{ background: 'gold' }}>
                    Value:
                    {ComponentToggle('ValueID')}
                    <div id='ValueID'>    
                        <TextArea 
                            id={'styleTextArea'} 
                            className={['borders1', 'cursor', 'marginTop1']} 
                            onValueChange={(e) => updateValueByKey('value', e)} 
                            type="text" 
                            value={node.value || ''} 
                            style={{ marginRight: '10px', padding: '10px', fontSize: '100%', width: '100%' }}
                        />
                    </div>
                </div>
            )}
            {node.hasOwnProperty('src') && (
                <div className='borders1 padding1 marginTop1' style={{ background: 'gold' }}>
                    src:
                    {ComponentToggle('srcId')}
                    <div id='srcId'>  
                        <button className='borders1 cursor' onClick={() => { setIsModalOpen(true); setModalContent(<FileBrowser type={resourceType} showControls={false} actionFunction={updateSrcValue} path={'davipianof@gmail.com/plan felipe musical'} />); }} style={{ margin: '10px', background: 'red', padding: '10px', fontSize: '100%' }}>
                            change scr file
                        </button>
                    </div>
                </div>
            )}
            <button className='borders1 cursor marginTop1' onClick={()=> deleteComponent(targetId, component, setIsReinjected, setBody, setBodyEdit, setBodyTest, bodyTest, true)} style={{ marginRight: '10px', background: 'red', padding: '10px', fontSize: '100%' }}>
                Delete component
            </button>
        </div>
    );
    
    
};

export default componentRendererAttributes