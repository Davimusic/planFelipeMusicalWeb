import Image from "next/image";
import ComponentTableNames from "./componentTableNames";

const renderComponentNames = (component, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId) => {
    const { type, id, children } = component;
    let depth = 0;

    const modal = (id) => {
        setId(id)
        setIsModalOpen(true)
        setModalContent(<ComponentTableNames body={body} setBody={setBody} id={cloneId} setIsReinjected={setIsReinjected} setIsModalOpen={setIsModalOpen}/>)
    }

    return (
        <div style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
            <div
                className={`${selectedId === id ? 'color2 borders1' : ''} cursor`}
                style={{ padding: '10px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(id);
                }}
            >
                {type} {type === 'Container' ? <Image onClick={(id)=> modal(id)} src='https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png' style={{width: '30px', height: '30px'}} width={30} height={30}/> : null} 
            </div>
            {children && children.map((child, index) => (
                <div key={index}>
                    {renderComponentNames(child, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId)}
                </div>
            ))}
        </div>
    );
};

export default renderComponentNames;
