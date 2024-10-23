import React, { useState } from 'react';
import Image from "next/image";
import ComponentTableNames from "./componentTableNames";
import ComponentToggle from "./componentToggle";
import findObjectById from '@/functions/general/findObjectById';
import udpateBodies from './udpateBodies';
import toggleStyleById from '@/functions/general/toggleStyleById';
import colorPalette from './colorPalette';

const renderComponentNames = (
    component, handleButtonClick, selectedId, setIsModalOpen, setModalContent, 
    setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, 
    setBodyTest, bodyTest, checkBox, isWrapChildren, check2, 
    isMoveComponentsActivated, selectedComponent, setSelectedComponent
) => {
    const { type, id, children } = component;
    let depth = 0;
    let checkBoxRendered = false;

    const modal = (id) => {
        setId(id);
        setIsModalOpen(true);
        setModalContent(
            <ComponentTableNames 
                body={body} 
                setBody={setBody} 
                id={cloneId} 
                setIsReinjected={setIsReinjected} 
                setIsModalOpen={setIsModalOpen} 
                setBodyEdit={setBodyEdit} 
                setBodyTest={setBodyTest} 
                bodyTest={bodyTest} 
                isWrapChildren={isWrapChildren} 
            />
        );
    };

    const shouldRenderCheckBox = !checkBoxRendered;
    if (shouldRenderCheckBox) {
        checkBoxRendered = true;
    }

    const uniqueId = `container-${id}`;

    const handleComponentClick = (e, id) => {
      e.stopPropagation();
  
      if (isMoveComponentsActivated) {
          if (!selectedComponent) {
              setSelectedComponent(id);  // Primer clic: selecciona el componente a mover
              toggleStyleById(`${id}Component`, 'background', colorPalette()['color3'], true)
          } else {
              if (selectedComponent === id) {
                  // Si el componente de origen es el mismo que el de destino, no hacer nada
                  console.log("No se puede mover el componente a sí mismo.");
                  return;
              }
  
              const obj = {...body};
              const sourceComponent = findObjectById(obj, selectedComponent);
              const targetComponent = findObjectById(obj, id);
  
              if (sourceComponent && targetComponent) {
                  // Función para remover el componente fuente de su contenedor original
                  const removeComponent = (component, id) => {
                      if (component.children) {
                          component.children = component.children.filter(child => {
                              if (child.id === id) {
                                  return false;
                              }
                              if (child.children) {
                                  child.children = removeComponent(child, id);
                              }
                              return true;
                          });
                      }
                      return component.children;
                  };
  
                  obj.children = removeComponent(obj, selectedComponent);
                  
                  if (targetComponent.type === 'Container' && targetComponent.children) {
                      // Añadir el componente fuente como hijo del contenedor objetivo
                      targetComponent.children.push(sourceComponent);
                  } else {
                      // Insertar el componente fuente justo después del componente objetivo
                      const insertAfterComponent = (component, targetId, sourceComponent) => {
                          if (component.children) {
                              for (let i = 0; i < component.children.length; i++) {
                                  if (component.children[i].id === targetId) {
                                      component.children.splice(i + 1, 0, sourceComponent);
                                      return component.children;
                                  }
                                  if (component.children[i].children) {
                                      component.children[i].children = insertAfterComponent(
                                          component.children[i], 
                                          targetId, 
                                          sourceComponent
                                      );
                                  }
                              }
                          }
                          return component.children;
                      };
  
                      obj.children = insertAfterComponent(obj, id, sourceComponent);
                  }
                  toggleStyleById(`${selectedComponent}Component`,'background', colorPalette()['color3'], false)
                  udpateBodies({ ...obj }, { ...obj }, true, setIsReinjected, setBody, setBodyEdit, setBodyTest)
                  setSelectedComponent(null);
              }
          }
      } else {
          handleButtonClick(id);
      }
  };

    return (
        <div id={`${id}Component`} style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
            {shouldRenderCheckBox && checkBox}
            {shouldRenderCheckBox && check2}
            {isWrapChildren}
            <div
                className={`${selectedId === id ? 'borders1' : ''} cursor`}
                style={{ background: selectedId === id ? 'black' : 'none', padding: '10px' }}
                onClick={(e) => handleComponentClick(e, id)}
            >
                {type}
                {type === 'Container' ? (
                    <Image
                        onClick={() => modal(id)}
                        src='https://res.cloudinary.com/dplncudbq/image/upload/v1729718949/plus_b987af.png'
                        style={{marginLeft: '20px', width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}
                        width={30}
                        height={30}
                    />
                ) : null}
            </div>
            {children && (
                <>
                    <ComponentToggle id={uniqueId}/>
                    <div id={uniqueId} className="borders1" style={{ background: '#33303083' }}> {/* Div que envuelve a todos los hijos con un ID único */}
                        {children.map((child, index) => (
                            <div key={index}>
                                {renderComponentNames(
                                    child, handleButtonClick, selectedId, setIsModalOpen, 
                                    setModalContent, setBody, setIsReinjected, cloneId, body, 
                                    setId, setBodyEdit, setBodyTest, bodyTest, false, 
                                    isWrapChildren, false, isMoveComponentsActivated, 
                                    selectedComponent, setSelectedComponent
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default renderComponentNames;













/*import Image from "next/image";
import ComponentTableNames from "./componentTableNames";
import ComponentToggle from "./componentToggle";


const renderComponentNames = (component, handleButtonClick, selectedId, setIsModalOpen, setModalContent, setBody, setIsReinjected, cloneId, body, setId, setBodyEdit, setBodyTest, bodyTest, checkBox, isWrapChildren, check2, isMoveComponentsActivated) => {
    const { type, id, children } = component;
    let depth = 0;
    let checkBoxRendered = false; // Mover la inicialización aquí

    const modal = (id) => {
        setId(id);
        setIsModalOpen(true);
        setModalContent(
            <ComponentTableNames 
                body={body} 
                setBody={setBody} 
                id={cloneId} 
                setIsReinjected={setIsReinjected} 
                setIsModalOpen={setIsModalOpen} 
                setBodyEdit={setBodyEdit} 
                setBodyTest={setBodyTest} 
                bodyTest={bodyTest} 
                isWrapChildren={isWrapChildren} 
            />
        );
    };

    const shouldRenderCheckBox = !checkBoxRendered;
    if (shouldRenderCheckBox) {
        checkBoxRendered = true;
    }

    const uniqueId = `container-${id}`;

    return (
        <div style={{ marginLeft: depth * 2, paddingLeft: '5px' }}>
            {shouldRenderCheckBox && checkBox}
            {shouldRenderCheckBox && check2}
            {isWrapChildren}
            <div
                className={`${selectedId === id ? 'borders1' : ''} cursor`}
                style={{ background: selectedId === id ? 'black' : 'none', padding: '10px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(id);
                }}
            >
                {type}
                {type === 'Container' ? (
                    <Image
                        onClick={() => modal(id)}
                        src='https://res.cloudinary.com/dplncudbq/image/upload/v1706027794/agregarMas_gbbwzo.png'
                        style={{ width: '30px', height: '30px' }}
                        width={30}
                        height={30}
                    />
                ) : null}
            </div>
            {children && (
                <>
                    {ComponentToggle(uniqueId)}
                    <div id={uniqueId} className="borders1" style={{background: '#33303083'}}> 
                        {children.map((child, index) => (
                            <div key={index}>
                                {renderComponentNames(
                                    child, 
                                    handleButtonClick, 
                                    selectedId, 
                                    setIsModalOpen, 
                                    setModalContent, 
                                    setBody, 
                                    setIsReinjected, 
                                    cloneId, 
                                    body, 
                                    setId, 
                                    setBodyEdit, 
                                    setBodyTest, 
                                    bodyTest, 
                                    false, 
                                    isWrapChildren,
                                    //toggle,
                                    false,
                                    isMoveComponentsActivated
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default renderComponentNames;*/



