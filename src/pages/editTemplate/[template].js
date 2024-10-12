import RenderElement from "@/functions/renderElement";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import React, { useState, useEffect } from 'react';
import { Menu } from "@/components/menu";
import injectLabelIntoJSON from "@/funciones/cms/injectLabelIntoJSON";
import traverseAndReplaceOnClick from "@/funciones/cms/traverseAndReplaceOnClick";
import renderComponentNames from "@/funciones/cms/renderComponentNames";
import componentRendererAttributes from "@/funciones/cms/componentRendererAttributes";
import items from "@/funciones/cms/itemsTest";
import Modal from "@/components/complex/modal";
import UploadFileToCloudinary from "@/funciones/cms/uploadFileToCloudinary";
import Image from "next/image";
import Input from "@/components/simple/input";
import SettingControls from "@/funciones/cms/settingControls";
import FileBrowser from "@/funciones/cms/fileBrowser";
import '../../estilos/general/general.css'
import findObjectById from "@/functions/general/findObjectById";
import Text from "@/components/simple/text";
import ModernCheckbox from "@/funciones/cms/ModernCheckbox";

//hacer que en prueba los links tambien no tengan activacion
const functions = importAllFunctions()

export default function hi(){
    const [body, setBody] = useState({});//el que todo el tiempo se ve en ejecucion
    const [bodyTest, setBodyTest] = useState({});//el que siempre tiene con todas sus funcionalidades finales
    const [bodyEdit, setBodyEdit] = useState({});//el que siempre tiene el modo edicion
    
    const [isInjected, setIsInjected] = useState(false);
    const [isReinjected, setIsReinjected] = useState(false);
    const [id, setId] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [availableClasses, setAvailableClasses] = useState(['color1', 'color2', 'color3', 'rotate'])
    const [selectedClassName, setSelectedClassName] = useState('')
    const [classNames, setClassNames] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [resourceType, setResourceType] = useState('image');
    const [srcToInject, setSrcToInject] = useState('');
    const [editionState, setEditionState] = useState('editTemplate');
    const [isRearrangeComponents, setIsRearrangeComponents] = useState(false)


    
    const [isReinjectedBodyCLone, setIsReinjectedBodyCLone] = useState(false);

    

    const handleButtonClick = (id) => {
        setSelectedId(id);
        setId(id)
        updateClassForOnlyOneComponent(id, 'frame')
    };

    function updateClassForOnlyOneComponent(id, className) {
        functions.removeClassFromElements(functions.getElementsByClass(className), className);
        functions.addClassToElement(id, className);
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
        console.log(isRearrangeComponents);
    }, [isRearrangeComponents]);



    

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
        } else {
            console.log('Object not found');
        }
    }, [id]);

    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
        functions.injectDocumentStyle('frame', 'border: 5px solid blue;')
        setAvailableClasses(functions.importClassNames())
    }, []);

    useEffect(() => {
        if (Object.keys(body).length !== 0) { 
            if (!isInjected) {
                setIsInjected(true);
                const obj = traverseAndReplaceOnClick(injectLabelIntoJSON({...body}, items), handleButtonClick)
                setBodyTest(injectLabelIntoJSON({...body}, items))
                setBodyEdit(obj)
                setBody(obj)
                //setBody(injectLabelIntoJSON(body, items))
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
    const buttonStyles = {
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    

    let divstyle = { width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black', opacity: editionState === 'testTemplate' ? 0 : 1, visibility: editionState === 'testTemplate' ? 'hidden' : 'visible', transition: 'opacity 0.5s, visibility 0.5s' }
    //let divstyle = { width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black' }
    const cloneId = { cloneId: id };

    function handleCheckboxChange(dic){
        setIsRearrangeComponents(!isRearrangeComponents)
    }
    const check = <ModernCheckbox
                        id={'moveComponents'}
                        actionFunction={handleCheckboxChange}
                        isCheckedInitially={isRearrangeComponents === true}
                    />

    return (
        <>
            <div className="center cursor margin1" style={{width: '100%', height: '5vh', display: 'flex'}} >
                <SettingControls setIsModalOpen={setIsModalOpen} setModalContent={setModalContent} setEditionState={setEditionState}/>
            </div>

            <div style={{color: 'black'}} onClick={()=> functions.fullScreen()}>click....</div>
            
            <div className='center color2' style={{width: '100vw', height: '95vh'}}>
                <div className='scroll borders1' style={divstyle}>
                    {renderComponentNames(body, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, check)}
                </div>
                <div className='' style={{width: '55%', height: '90%', background: 'transparent', position: 'relative', border: '1px solid black'}}>
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











