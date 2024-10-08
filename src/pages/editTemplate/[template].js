import RenderElement from "@/functions/renderElement";
import importAllFunctions from "@/functions/general/importAllLocalFunctions";
import React, { useState, useEffect, useRef } from 'react';
import { Menu } from "@/components/menu";
import injectLabelIntoJSON from "@/funciones/cms/injectLabelIntoJSON";
import traverseAndReplaceOnClick from "@/funciones/cms/traverseAndReplaceOnClick";
import renderComponentNames from "@/funciones/cms/renderComponentNames";
import componentRendererAttributes from "@/funciones/cms/componentRendererAttributes";
import items from "@/funciones/cms/itemsTest";
import Modal from "@/components/complex/modal";
import UploadFileToCloudinary from "@/funciones/cms/uploadFileToCloudinary";
import '../../estilos/general/general.css'

//hacer que en prueba los links tambien no tengan activacion
const functions = importAllFunctions()

export default function hi(){
    const [body, setBody] = useState({});
    const [isInjected, setIsInjected] = useState(false);
    const [isReinjected, setIsReinjected] = useState(false);
    const [id, setId] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [availableClasses, setAvailableClasses] = useState(['color1', 'color2', 'color3', 'rotate'])
    const [selectedClassName, setSelectedClassName] = useState('')
    const [classNames, setClassNames] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    

    

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
        if(isReinjected === true){
            setIsReinjected(false);
            setBody(traverseAndReplaceOnClick(body, handleButtonClick))
        }
    }, [body, isReinjected]);

    useEffect(() => {
        //console.log('id: '+id);
        const foundObject = functions.findObjectById(body, id);
        if (foundObject) {
            setClassNames(foundObject.className)
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
                setBody(traverseAndReplaceOnClick(injectLabelIntoJSON(body, items), handleButtonClick))
            }
        }
    }, [body, isInjected]);

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

    let divstyle = { width: '20%', minWidth: '200px', maxWidth: '400px', height: '90%', background: 'gray', padding: '20px', border: '1px solid black' };
    const cloneId = { cloneId: id };
    return (
        <>
            <div style={{width: '100vw', height: '2vh', background: 'black'}} onClick={() => { setIsModalOpen(true); setModalContent(<UploadFileToCloudinary/>); }}>uplod</div>
            <div className='center color2' style={{width: '100vw', height: '98vh'}}>
                <div className='scroll borders1' style={divstyle}>
                    {renderComponentNames(body, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId)}
                </div>
                <div className='' style={{width: '55%', height: '90%', background: 'transparent', position: 'relative', border: '1px solid black'}}>
                    <Menu>
                        {RenderElement(body)}
                    </Menu>
                </div>
                <div className='scroll borders1' style={divstyle}>
                        {componentRendererAttributes(body, id, classNames, setClassNames, setBody, availableClasses, selectedClassName, setSelectedClassName, setIsReinjected)}
                </div>
                <Modal isOpen={isModalOpen}  onClose={closeModal} children={modalContent}/>
            </div>
        </>
    )  
}








 function GanttTable() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState('davipianof@gmail.com');
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [llaveProyectoEnUso, setLlaveProyectoEnUso] = useState('');

    //redux
    const objetosAPU = useSelector(state => state.objetosAPU);
    const llavesProyectos = useSelector(state => state.llavesProyectos);
    const dispatch = useDispatch();

    useEffect(() => {
        llamarTodoAPUObjeto('davipianof@gmail.com')
            .then(objetos => {
                dispatch(updateObjetoAPU(objetos[0]))
                dispatch(updateLlavesProyectos(Object.keys(objetos[0])))
                setLlaveProyectoEnUso(Object.keys(objetos[0])[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const uploadFile = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'y8peecdo');
        formData.append('folder', `${email}/${llaveProyectoEnUso}`);

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dplncudbq/upload`,
            formData
        );

        console.log(res.data);
        console.log(res.data['url']);
        setLoading(false);
        setUploadSuccess(true);
        setSelectedFile(null);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadSuccess(false);
    };

    
    return (
        <div style={{height:'100%'}}>
            {llavesProyectos.length === 0 ? 
                <div className="miContenedor">
                    <div className="miCirculoGiratorio"></div>
                </div>
            : 
                <div >
                    <div className="centrar" style={{display: 'block', height:'25%', background: 'black', paddingBottom: '5%'}}>
                        <div className="" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around'}}>
                            <MostrarInfo    informacion={'cargar archivo'} 
                                            contenido={<label className="imagenSubirArchivos" style={{display: loading === true ? 'none' : 'flex', backgroundImage: 'url("https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjeto_o9hw7f.png")'}}>
                                                            <input type="file" onChange={handleFileChange} style={{display: 'none'}} />
                                                        </label>}
                                            width={65} height={65} style={{paddingBottom: '20px'}}/>
                            <MostrarInfo    informacion={'subir archivo'} 
                                            contenido={<button className="imagenSubirArchivos" style={{display: !selectedFile || loading ? 'none' : 'flex',  backgroundImage: 'url("https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/save_pmx5wo.png")'}} onClick={uploadFile} ></button>}
                                            width={65} height={65} tyle={{paddingBottom: '20px'}}/> 
                            {llavesProyectos.length !== 0 ? 
                                <CreateSelect 
                                    name={'llaves'} 
                                    value={llaveProyectoEnUso} 
                                    options={llavesProyectos} 
                                    event={(event) => setLlaveProyectoEnUso(event.target.value)}
                                /> 
                            : null }                               
                        </div>                
                        <div style={{marginTop: '20px'}}>
                            {loading && <p>Cargando...</p>}
                            {uploadSuccess && <p>¡Archivo subido con éxito!</p>}
                            {selectedFile && <p>Archivo seleccionado: {selectedFile.name}. Guardar en proyecto: {llaveProyectoEnUso}</p>}
                        </div>
                    </div>
                    <div className="centrar borde bordes color5" style={{height:'70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {selectedFile && (
                            decidirTipoDeArchivo(selectedFile)
                        )}
                    </div>
                </div>
            }
        </div>
    );
}


