let API_KEY= '332683334251235'
let API_SECRET= 'TOCYNfFpLI-FPVM421gOYXptw9o'


import React, { useState, useEffect } from 'react';
import axios from 'axios';
'../../estilos/general/general.css'

const FileBrowser = ({type, showControls, setSrcToInject}) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('davipianof@gmail.com');
    const [llaveProyectoEnUso, setLlaveProyectoEnUso] = useState('plan felipe musical');
    const [resourceType, setResourceType] = useState(type); // Nuevo estado para el tipo de recurso

    
    useEffect(() => {
        console.log(resourceType);
    }, [resourceType]);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            try {
                console.log('Fetching files with resource type:', resourceType); // Log para depuración
                const res = await axios.get(`/api/cloudinary/resources/${resourceType}/upload`, {
                    params: {
                        prefix: `${email}/${llaveProyectoEnUso}`,
                        max_results: 100,
                    },
                    headers: {
                        Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
                    },
                });
                console.log('Response data:', res.data); // Log para depuración
                setFiles(res.data.resources || []);//en raw por ahora SOLO guardar WORD
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    setError(`Error: ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                    setError('Error: No response received from server.');
                } else {
                    console.error('Error message:', error.message);
                    setError(`Error: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [email, llaveProyectoEnUso, resourceType]); // Añadir resourceType a las dependencias


    const renderFile = (file, resourceType, style) => {
        const fileUrl = file.secure_url;
        //files
        //const url = <div onClick={()=> console.log(fileUrl)}>click</div>
        const url = <div onClick={()=> setSrcToInject(fileUrl)}>click</div>
        switch (resourceType) {
            case 'image':
                return  <div style={{display: 'block'}}>
                            <img style={style} src={fileUrl} alt={file.public_id} width="100" />
                            {url}
                        </div>
            case 'video':
                return  <div style={{display: 'block'}}>
                            <video style={style} src={fileUrl} controls width="100" />
                            {url}
                        </div>
            case 'raw':
                return (
                    <div style={{display: 'block'}}>
                        <iframe
                            src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
                            style={{ width: '80vw', height: '80vh', border: 'none', backgroundColor: 'transparent' }}
                            title="Word Document Viewer"
                        ></iframe>
                        {url}
                    </div>
                );
            default:
                return <p>Unsupported file type</p>;
        }
    };

    const style = {
        minWidth: '300px',
        maxWidth: '25vw',
        overflow: 'auto',
    };

    return (
        <div style={{ background: 'black' }}>
            {showControls && (
                <div className='center borders1 margin1' style={{height: '10vh', background: 'red'}}>
                    <select
                        id="resourceType"
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                    >
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                        <option value="raw">Documents (Word)</option>
                    </select>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
            )}
            <ul className='center scroll' style={{ display: 'flex', flexWrap: 'wrap', height: '80vh'}}>
                {files.length > 0 ? (
                    files.map((file) => (
                        <li className='center' key={file.public_id} style={{ margin: '10px' }}>
                            {renderFile(file, resourceType, style)}
                        </li>
                    ))
                ) : (
                    <p>No files found.</p>
                )}
            </ul>
        </div>
    );
};

export default FileBrowser;

















