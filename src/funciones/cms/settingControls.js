import ModernCheckbox from "./ModernCheckbox";
import Image from "@/components/simple/image";
import UploadFileToCloudinary from "./uploadFileToCloudinary";
import React, { useState, useEffect } from 'react';
import '../../estilos/general/general.css';

export default function SettingControl({ setIsModalOpen, setModalContent, setEditionState }) {
    const [activeCheckbox, setActiveCheckbox] = useState('editTemplate');

    const handleCheckboxChange = (id) => {
        setActiveCheckbox(id);
    };

    useEffect(() => {
        setEditionState(activeCheckbox);
    }, [activeCheckbox]);

    return (
        <div style={{ width: '100%' }} className="equalSpace">
            <Image
                onClick={() => {
                    setIsModalOpen(true);
                    setModalContent(<UploadFileToCloudinary path={`davipianof@gmail.com/plan felipe musical`} />);
                }}
                src={'https://res.cloudinary.com/dplncudbq/image/upload/v1693583167/subir_pinj91.png'}
                className={[]}
                style={{ width: '2vhx' }}
                width={'30'}
                height={'30'}
                alt={'upload files'}
            />
            <div>
                <div style={{ color: 'black' }}>edit template</div>
                <ModernCheckbox
                    id={'editTemplate'}
                    actionFunction={handleCheckboxChange}
                    isCheckedInitially={activeCheckbox === 'editTemplate'}
                />
            </div>
            <div>
                <div style={{ color: 'black' }}>teste template</div>
                <ModernCheckbox
                    id={'testTemplate'}
                    actionFunction={handleCheckboxChange}
                    isCheckedInitially={activeCheckbox === 'testTemplate'}
                />
            </div>
        </div>
    );
}









