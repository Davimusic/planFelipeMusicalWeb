import React from 'react';
import objectComponent from './objectComponent';
import logOutSession from '../generales/security/logOutSession';

const ComponentTableNames = ({body, setBody, id, setIsReinjected, setIsModalOpen}) => {
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

  // Función para clonar el objeto
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

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
    const updatedBody = clone(body); 
    setIsReinjected(true)
    setBody(addChildComponentById(newChild, tagertId, updatedBody));
    setIsModalOpen(false)
  }

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          <th>Component Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {components.map((component, index) => (
          <tr key={index}>
            <td onClick={()=> handleComponentSelect(component.type)}>{component.type}</td>
            <td>{component.description}</td>
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
};

const thStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
};

const tdStyles = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default ComponentTableNames;
