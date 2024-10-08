import React, { useState } from 'react';
import axios from 'axios';

export default function UploadFileToCloudinary() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [email, setEmail] = useState('davipianof@gmail.com');
    const [llaveProyectoEnUso, setLlaveProyectoEnUso] = useState('plan felipe musical');

    const uploadFile = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'y8peecdo');
        formData.append('folder', `${email}/${llaveProyectoEnUso}`);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dplncudbq/upload`,
                formData
            );
            console.log(res.data);
            console.log(res.data['url']);
            setUploadSuccess(true);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
            setSelectedFile(null);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setUploadSuccess(false);
    };

    return (
        <div>
            <label className="imagenSubirArchivos" style={{ display: loading ? 'none' : 'flex', backgroundImage: 'url("https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/crearNuevoObjeto_o9hw7f.png")' }}>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
            {selectedFile && !loading && (
                <button onClick={uploadFile}>Upload</button>
            )}
            {loading && <p>Uploading...</p>}
            {uploadSuccess && <p>Upload successful!</p>}
        </div>
    );
}
