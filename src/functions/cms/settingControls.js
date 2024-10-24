import ModernCheckbox from "./ModernCheckbox";
import Image from "@/components/simple/image";
import UploadFileToCloudinary from "./uploadFileToCloudinary";
import React, { useState, useEffect } from 'react';
import '../../estilos/general/general.css';
import fullScreen from "@/functions/general/fullScreen";
import Select from "@/components/simple/selects";
import Input from "@/components/simple/input";
import saveTemplate from "@/functions/security/saveTemplate";
import replaceCharacter from "@/functions/general/replaceCharacter";
import traverseAndStringify from "@/functions/general/traverseAndStringify";
import udpateBodies from "./udpateBodies";
import traverseAndReplaceOnClick from "./traverseAndReplaceOnClick";
import colorPalette from "./colorPalette";



export default function SettingControl({ setIsModalOpen, setModalContent, setEditionState, objectMolds, bodyTest, setIsReinjected, setBody, setBodyEdit, setBodyTest, objectMoldsDb, handleButtonClick, setObjectMoldsInUse, objectMoldsInUse, setObjectMoldsDb }) {
    const [activeCheckbox, setActiveCheckbox] = useState('editTemplate');

    const handleCheckboxChange = (id) => {
        setActiveCheckbox(id);
    };

    useEffect(() => {
        setEditionState(activeCheckbox);
    }, [activeCheckbox]);

    useEffect(() => {
        document.getElementById('inputSetting').value = objectMoldsInUse;
    }, [objectMoldsInUse]);

    const handlePropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }} className="scroll">
            <Image
                onClick={(e) => {
                    //e.stopPropagation();
                    setIsModalOpen(true);
                    setModalContent(<UploadFileToCloudinary path={`davipianof@gmail.com/plan felipe musical`} />);
                }}
                src={'https://res.cloudinary.com/dplncudbq/image/upload/v1729718949/upload_rqmafo.png'}
                className={[]}
                style={{height: '50px', width: '50px'}}
                width={'50'}
                height={'50'}
                alt={'upload files'}
            />
            <div style={{display: 'flex'}} onClick={handlePropagation}>
                <ModernCheckbox
                    id={'editTemplate'}
                    actionFunction={(e) => {
                        handleCheckboxChange('editTemplate');
                    }}
                    isCheckedInitially={activeCheckbox === 'editTemplate'}
                />
                <div style={{ color: 'white' }}>Edit</div>
            </div>
            <div style={{display: 'flex'}} onClick={handlePropagation}>
                <ModernCheckbox
                    id={'testTemplate'}
                    actionFunction={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange('testTemplate');
                    }}
                    isCheckedInitially={activeCheckbox === 'testTemplate'}
                />
                <div style={{ color: 'white' }}>Teste</div>
            </div>
            <div onClick={handlePropagation}>
                <Image
                    onClick={(e) => {
                        fullScreen();
                    }}
                    src={'https://res.cloudinary.com/dplncudbq/image/upload/v1729718949/full_sxwwyn.png'}
                    width={'30'}
                    height={'30'}
                    alt={'ampliar'}
                    style={{ height: '50px', width: '50px' }}
                />
            </div>
            <div onClick={handlePropagation}>
                <Image
                    onClick={(e) => {
                        saveTemplate(JSON.stringify(traverseAndStringify(bodyTest)), replaceCharacter(document.getElementById('inputSetting').value, ' ', '-'), objectMolds, setObjectMoldsDb, objectMoldsDb, setIsModalOpen, setModalContent, setObjectMoldsInUse);
                    }}
                    src={'https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/save_pmx5wo.png'}
                    width={'30'}
                    height={'30'}
                    alt={'guardar'}
                    style={{ height: '50px', width: '50px' }}
                />
            </div>
            <div onClick={handlePropagation}>
                <Input
                    inputType={'text'}
                    id={'inputSetting'}
                    required={true}
                    value={objectMoldsInUse}
                />
            </div>
            <div onClick={handlePropagation}>
                <Select
                    id={'uploadModls'}
                    name={'uploadModls'}
                    value={objectMoldsInUse}
                    options={objectMolds}
                    event={(e) => {
                        e.stopPropagation();
                        setObjectMoldsInUse(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}











