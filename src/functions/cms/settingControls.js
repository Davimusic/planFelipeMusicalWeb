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



export default function SettingControl({ setIsModalOpen, setModalContent, setEditionState, objectMolds, bodyTest, setIsReinjected, setBody, setBodyEdit, setBodyTest, objectMoldsDb, handleButtonClick, setObjectMoldsInUse, objectMoldsInUse}) {
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
                <div style={{ color: 'black' }}>Edit</div>
                <ModernCheckbox
                    id={'editTemplate'}
                    actionFunction={handleCheckboxChange}
                    isCheckedInitially={activeCheckbox === 'editTemplate'}
                />
            </div>
            <div>
                <div style={{ color: 'black' }}>Teste</div>
                <ModernCheckbox
                    id={'testTemplate'}
                    actionFunction={handleCheckboxChange}
                    isCheckedInitially={activeCheckbox === 'testTemplate'}
                />
            </div>
            <Image onClick={()=> fullScreen()} src={'https://res.cloudinary.com/dplncudbq/image/upload/v1729543654/fullscreen-6759436_640_qer3ov.png'} width={'30'} height={'30'} alt={'ampliar'} style={{height: '50px', width: '50px'}}/>
            <Image onClick={()=> saveTemplate(JSON.stringify(traverseAndStringify(bodyTest)), replaceCharacter(document.getElementById('inputSetting').value, ' ', '-'), objectMolds)} 
                                    src={'https://res.cloudinary.com/dplncudbq/image/upload/v1706024045/save_pmx5wo.png'} width={'30'} height={'30'} alt={'guardar'} style={{height: '50px', width: '50px'}}
            />
            <Input inputType={'text'} id={'inputSetting'} required={true} onValueChange={(e) => e} value={'hi'}/>
            <Select id={'uploadModls'} name={'uploadModls'} value={objectMoldsInUse} options={objectMolds} event={(e) => setObjectMoldsInUse(e.target.value)} />
        </div>
    );
}











