import RenderElement from "@/functions/renderElement";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import React, { useState, useEffect } from 'react';
import { Menu } from "@/components/menu";
import injectLabelIntoJSON from "@/functions/cms/injectLabelIntoJSON";
import traverseAndReplaceOnClick from "@/functions/cms/traverseAndReplaceOnClick";
import renderComponentNames from "@/functions/cms/renderComponentNames";
import componentRendererAttributes from "@/functions/cms/componentRendererAttributes";
import items from "@/functions/cms/itemsTest";
import Modal from "@/components/complex/modal";
import UploadFileToCloudinary from "@/functions/cms/uploadFileToCloudinary";
import Image from "@/components/simple/image";
import Input from "@/components/simple/input";
import SettingControls from "@/functions/cms/settingControls";
import FileBrowser from "@/functions/cms/fileBrowser";
import findObjectById from "@/functions/general/findObjectById";
import Text from "@/components/simple/text";
import ModernCheckbox from "@/functions/cms/ModernCheckbox";
import ComponentRenderCheckbox from "@/functions/cms/componentRenderCheckbox";
import generalConnector from "@/functions/BackendConnectors/generalConnector";
import udpateBodies from "@/functions/cms/udpateBodies";


//hacer que en prueba los links tambien no tengan activacion
const functions = importAllFunctions()

export default function hi(){
    //guardan los estados de los objetos 
    const [body, setBody] = useState({});//el que todo el tiempo se ve en ejecucion
    const [bodyTest, setBodyTest] = useState({});//el que siempre tiene con todas sus funcionalidades finales
    const [bodyEdit, setBodyEdit] = useState({});//el que siempre tiene el modo edicion
    
    const [isInjected, setIsInjected] = useState(false);//permite la actualizacion de los bodies
    const [isReinjected, setIsReinjected] = useState(false);//activa las funciones del template
    const [id, setId] = useState(0);//contiene el id del objeto seleccionado
    const [selectedId, setSelectedId] = useState(null);
    const [availableClasses, setAvailableClasses] = useState(['color1', 'color2', 'color3', 'rotate'])//clases traidas de la nuve para usar
    const [selectedClassName, setSelectedClassName] = useState('')//clase seleccionada a usar
    const [classNames, setClassNames] = useState([]);//las clases del objeto seleccionado
    const [modalContent, setModalContent] = useState(null);//contenido del modal
    const [resourceType, setResourceType] = useState('image');//tipo de recurso a usar nube cloudinary
    const [srcToInject, setSrcToInject] = useState('');
    const [editionState, setEditionState] = useState('editTemplate');//estado en uso como edicion o test con sus funciones
    
    
    const [isRearrangeComponents, setIsRearrangeComponents] = useState(false)
    const [isWrapChildren, setIsWrapChildren] = useState(false)
    const [isMoveComponentsActivated, setIsMoveComponentsActivated] = useState(false)//para reubicar componentes


    const [objectMolds, setObjectMolds] = useState([])//nombres de los templates ya creados
    const [objectMoldsInUse, setObjectMoldsInUse] = useState(objectMolds[0])//template en uso
    const [objectMoldsDb, setObjectMoldsDb]= useState([])//todos los templates de base de datos


    function traverseAndEval(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
    
        for (const key in obj) {
            if (key === 'onClick' && typeof obj[key] === 'string') {
                obj[key] = eval(`(${obj[key]})`);
            } else if (typeof obj[key] === 'object') {
                traverseAndEval(obj[key]);
            }
        }
        return obj;
    }

    const handleButtonClick = (id) => {
        setSelectedId(id);
        setId(id)
        updateClassForOnlyOneComponent(id, 'frame')
    };

    function updateClassForOnlyOneComponent(id, className) {
        functions.removeClassFromElements(functions.getElementsByClass(className), className);
        functions.addClassToElement(id, className);
    }

    async function fetchTemplates() {
        try {
            const result = await generalConnector('getTemplates', 'GET');
            console.log(result.templates);
            setObjectMoldsDb(result.templates)
            setObjectMolds(functions.extractKeys(result.templates))
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        console.log(editionState);
        if(editionState === 'editTemplate'){
            functions.injectDocumentStyle('frame', 'border: 5px solid blue;')
            setBody(bodyEdit)
        } else if(editionState === 'testTemplate'){
            functions.removeDocumentClass('frame')
            setBody(bodyTest)
        }
        
    }, [editionState]);

    useEffect(() => {
        if (objectMoldsDb[objectMoldsInUse] !== undefined) {
            const obj = { ...objectMoldsDb[objectMoldsInUse] };
            udpateBodies(obj, traverseAndEval(obj), false, setIsReinjected, setBody, setBodyEdit, setBodyTest )
            //setBody(traverseAndEval(obj));
        }
    }, [objectMoldsInUse]);//actualiza cada que se selecciona un nuevo objeto de la base de datos

    /*useEffect(() => {
        if (functions.extractKeys(objectMoldsDb).length >= 1) {
            setBody(traverseAndEval(objectMoldsDb[functions.extractKeys(objectMoldsDb)[0]]));
        }
    }, [objectMoldsDb]);//carga el primer resultado traido base de datos templates*/

    function closeAtributeTools(){
        console.log('entra');
        const containerIds = ['onclickId', 'classNameId', 'styleId', 'textId', 'ValueID', 'srcID'];
        const transitionClass = 'transition';
        containerIds.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                // Configurar contenedores para estar cerrados inicialmente
                container.style.height = '0px';
                container.style.width = '0px';
                container.style.overflow = 'hidden';
                container.setAttribute('data-shrunk', 'true');
            }
        });
    }

    useEffect(() => {
        //console.log('id: '+id);
        const foundObject = functions.findObjectById(body, id);
        if (foundObject) {
            setClassNames(foundObject.className)
            if(foundObject.type === 'Video'){
                setResourceType('video')
            } else if(foundObject.type === 'Image'){
                setResourceType('image')
            }
            closeAtributeTools()
        } else {
            console.log('Object not found');
        }
    }, [id]);

    useEffect(() => {
        //functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
        functions.injectDocumentStyle('frame', 'border: 5px solid blue;')
        functions.inyectClassNamesToDOM(functions.importClassNames())
        setAvailableClasses(functions.sortArrayAlphabetically(functions.getObjectKeysArray(functions.importClassNames(), '@')))
        fetchTemplates()
    }, []);

    useEffect(() => {
        if (Object.keys(body).length !== 0) { 
            if (!isInjected) {
                setIsInjected(true);
                const obj = traverseAndReplaceOnClick(injectLabelIntoJSON({...body}, items), handleButtonClick)
                setBodyTest(injectLabelIntoJSON({...body}, items))
                setBodyEdit(obj)
                setBody(obj)
            }
        }
    }, [body, isInjected]);

    useEffect(() => {
        if(isReinjected === true){
            setIsReinjected(false);
            setBody(traverseAndReplaceOnClick(body, handleButtonClick))
        }
    }, [body, isReinjected]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    /*const buttonStyles = {
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };*/


    //let divstyle = { width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black', opacity: editionState === 'testTemplate' ? 0 : 1, visibility: editionState === 'testTemplate' ? 'hidden' : 'visible', transition: 'opacity 0.5s, visibility 0.5s' }
    let divstyle = { width: functions.isSmallScreen(800) ? '100%' : '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black' }
    const cloneId = { cloneId: id };

    function handleCheckboxChange(){
        setIsRearrangeComponents(!isRearrangeComponents)
        setIsWrapChildren(!isWrapChildren)
    }

    function handleCheckboxChange2(){
        setIsMoveComponentsActivated(!isMoveComponentsActivated)
    }

    const check = ComponentRenderCheckbox(isWrapChildren, 'moveComponents', 'crear hijo envuelto', 'crear hijo separado', handleCheckboxChange, isRearrangeComponents);
    const check2 = ComponentRenderCheckbox(isMoveComponentsActivated, 'moveComponents2', 'mover componente', 'sin uso', handleCheckboxChange2, isMoveComponentsActivated);
    
    
    
    
    const [selectedComponent, setSelectedComponent] = useState(null);
    useEffect(() => {
        console.log(bodyTest);
    }, [bodyTest]);

    return (
        <>
            <div className="center cursor margin1" style={{width: '100%', height: '5vh', display: 'flex'}} >
                <SettingControls setIsModalOpen={setIsModalOpen} setModalContent={setModalContent} setEditionState={setEditionState} objectMolds={objectMolds} bodyTest={bodyTest} setIsReinjected={setIsReinjected} setBody={setBody} setBodyEdit={setBodyEdit} setBodyTest={setBodyTest} objectMoldsDb={objectMoldsDb} handleButtonClick={handleButtonClick} setObjectMoldsInUse={setObjectMoldsInUse} objectMoldsInUse={objectMoldsInUse}/>
            </div>
            <div className='center color2 scroll' style={{width: '100vw', height: '85vh', display: functions.isSmallScreen(800) ? 'block' : 'flex'}}>
                <div className='scroll borders1' style={divstyle}>
                    {renderComponentNames(body, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, check, isWrapChildren, check2, isMoveComponentsActivated, selectedComponent, setSelectedComponent)}
                </div>
                <div className='' style={{width: '55%', height: '90%', background: 'transparent', position: 'relative', border: 'none'}}>
                    <Menu>
                        {RenderElement(body)}
                    </Menu>
                </div>
                <div className='scroll borders1' style={divstyle}>
                        {componentRendererAttributes(body, id, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected, setIsModalOpen, setModalContent, resourceType, setSrcToInject, setBodyEdit, setBodyTest, bodyTest)}
                </div>
                <Modal isOpen={isModalOpen}  onClose={closeModal} children={modalContent}/>
            </div>
        </>
    )  
}











