import React from 'react';
import objectComponent from './objectComponent';
import logOutSession from '../generales/security/logOutSession';
import deepClone from '@/functions/general/deepClone';
'../../estilos/general/general.css'

const ComponentTableNames = ({body, setBody, id, setIsReinjected, setIsModalOpen, setBodyEdit, setBodyTest, bodyTest}) => {
  let tagertId = id['cloneId']

  const components = [
    { type: 'Text', description: 'Displays text content' },
    { type: 'Video', description: 'Embeds a video' },
    { type: 'Audio', description: 'Embeds an audio file' },
    { type: 'Link', description: 'Creates a hyperlink' },
    { type: 'Label', description: 'Displays a label' },
    { type: 'Button', description: 'Creates a clickable button' },
    { type: 'Icon', description: 'Displays an icon' },
    { type: 'Input', description: 'Creates an input field' },
    { type: 'Image', description: 'Displays an image' },
    { type: 'Container', description: 'A container for other components' },
    { type: 'TextArea', description: 'Displays text content' },
    { type: 'Select', description: 'Select' }
  ];


  function addChildComponentById(newChild, targetId, obj) {
    if (obj.id === targetId) {
        if (newChild.type === 'Container') {
            newChild.children = obj.children ? [...obj.children] : [];
            obj.children = [newChild];
        } else {
            if (!obj.children) {
                obj.children = [];
            }
            obj.children.push(newChild);
        }
    } else if (obj.children) {
        obj.children = obj.children.map(child => addChildComponentById(newChild, targetId, child));
    }
    return obj;
}


  // Función para manejar la selección de un componente
  function handleComponentSelect(type) {
    const newChild = objectComponent(type)
    setIsReinjected(true)
    setBody(addChildComponentById(newChild, tagertId, deepClone({...body})));
    setBodyEdit(addChildComponentById(newChild, tagertId, deepClone({...body})));
    setBodyTest(addChildComponentById(newChild, tagertId, deepClone({...bodyTest})));
    setIsModalOpen(false)
  }

  return (
    <table className='color6' style={tableStyles}>
      <thead>
        <tr>
          <th style={thStyles}>Component Type</th>
          <th style={thStyles}>Description</th>
        </tr>
      </thead>
      <tbody >
        {components.map((component, index) => (
          <tr key={index}>
            <td style={tdStyles} className='cursor' onClick={()=> handleComponentSelect(component.type)}>{component.type}</td>
            <td style={tdStyles}>{component.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
  backgroundColor: '#480083'
};

const thStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  color: 'black'
};

const tdStyles = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default ComponentTableNames;
