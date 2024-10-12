import Image from "next/image";
import ComponentTableNames from "./componentTableNames";
import ModernCheckbox from "./ModernCheckbox";


const renderComponentNames = (component, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, checkBox) => {
    const { type, id, children } = component;
    let depth = 0;
    let checkBoxRendered = false; // Mover la inicialización aquí
  
    const modal = (id) => {
      setId(id);
      setIsModalOpen(true);
      setModalContent(<ComponentTableNames body={body} setBody={setBody} id={cloneId} setIsReinjected={setIsReinjected} setIsModalOpen={setIsModalOpen} setBodyEdit={setBodyEdit} setBodyTest={setBodyTest} bodyTest={bodyTest} />);
    };
  
    function action(id) {
      console.log('so ' + id);
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'none';
      } else {
        console.error('Elemento con id ' + id + ' no encontrado.');
      }
    }
  
    const shouldRenderCheckBox = !checkBoxRendered;
    if (shouldRenderCheckBox) {
      checkBoxRendered = true;
    }
  
    return (
      <div style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
        {shouldRenderCheckBox && checkBox}
        <div
          className={`${selectedId === id ? 'color2 borders1' : ''} cursor`}
          style={{ padding: '10px' }}
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick(id);
          }}
        >
          {type}
          {type === 'Container' ? (
            <Image
              onClick={(id) => modal(id)}
              src='https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png'
              style={{ width: '30px', height: '30px' }}
              width={30}
              height={30}
            />
          ) : null}
        </div>
        {children && children.map((child, index) => (
          <div key={index}>
            {renderComponentNames(child, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, false)}
          </div>
        ))}
      </div>
    );
  };
  
  export default renderComponentNames;
  



/*const renderComponentNames = (component, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, checkBox) => {
    const { type, id, children } = component;
    let depth = 0;

    const modal = (id) => {
        setId(id)
        setIsModalOpen(true)
        setModalContent(<ComponentTableNames body={body} setBody={setBody} id={cloneId} setIsReinjected={setIsReinjected} setIsModalOpen={setIsModalOpen} setBodyEdit={setBodyEdit} setBodyTest={setBodyTest} bodyTest={bodyTest}/>)
    }

    function action(id) {
        console.log('so ' + id);
        
        // Obtener el elemento por su id
        const element = document.getElementById(id);
        
        // Verificar si el elemento existe
        if (element) {
          element.style.display = 'none';
        } else {
          console.error('Elemento con id ' + id + ' no encontrado.');
        }
      }
      

    

    return (
        <div style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
            {checkBox}
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
                    {renderComponentNames(child, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, checkBox)}
                </div>
            ))}
        </div>
    );

};

export default renderComponentNames;*/
