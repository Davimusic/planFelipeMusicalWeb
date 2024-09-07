import { useRouter } from 'next/router';
import '../../estilos/general/general.css'
import { Menu } from '@/components/menu';
import { useState, useEffect } from "react";
import RenderElement from '@/funciones/renderElement';

function render() {
  const [body, setBody] = useState({
    contaninerPadre: {
    type: "Container",
    name: "containerPadre",
    style: {
        
    },
    className: 'horizontalCenter',
    children: [
        {
        type: "Container",
        name: "formContainer",
        style: {
            
        },
        className: 'color3 block maxWidth400 margin1 padding1 borders1 ',
        children: [
            {
                type: "Text",
                name: "headerText",
                text: "Iniciar Sesión",
                style: {
                    textAlign: "center",
                    marginBottom: "20px",
                    fontSize: '50px',
                    color: 'red'
                }
                },
            {
            type: "Container",
            name: "emailContainer",
            style: {
                marginBottom: "15px"
            },
            children: [
                {
                type: "Label",
                name: "emailLabel",
                valor: "Correo Electrónico",
                },
                {
                type: "Input",
                name: "emailInput",
                inputType: "email",
                id: "email",
                required: true,
                style: {},
                className: 'borders1 width100 padding1 borderNone',
                value: '',
                onValueChange: (value) =>   [ changeBody(
                                                    HandleComponentChange, 
                                                    'emailInput', 
                                                    body, 
                                                    (component) => {
                                                        component.value = value
                                                    }
                                                ), 
                                                saveObjectsNameInEdition({object:'Input', name: 'emailInput'}),
                                            ]
                },
            ]
            },
            {
            type: "Container",
            name: "passwordContainer",
            style: {
                marginBottom: "15px"
            },
            children: [
                {
                type: "Label",
                name: "passwordLabel",
                valor: "Contraseña",
                },
                {
                type: "Container",
                name: "passwordInputContainer",
                style: {
                    display: "flex",
                    alignItems: "center"
                },
                children: [
                    {
                    type: "Input",
                    name: "passwordInput",
                    inputType: "password",
                    required: true,
                    style: {},
                    value: '',
                    className: 'borders1 width100 padding1 borderNone',
                    onValueChange: (value) =>   [ changeBody(
                                                        HandleComponentChange, 
                                                        'passwordInput', 
                                                        body, 
                                                        (component) => {
                                                            component.value = value
                                                        }
                                                    ), 
                                                    saveObjectsNameInEdition({object:'Input', name: 'passwordInput'}),
                                                ]
                    },
                    {
                    type: "Button",
                    name: "showPasswordButton",
                    buttonType: "button",
                    style: {
                        marginLeft: "10px",
                        padding: "10px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "black"
                    },
                    onClick:[     
                                    () => changeBody(
                                        HandleComponentChange, 
                                        'passwordInput', 
                                        body, 
                                        (component) => {
                                            component.inputType = "text";
                                        }
                                    ),
                                    () => changeBody(
                                        HandleComponentChange, 
                                        'passwordRepeatInput', 
                                        body, 
                                        (component) => {
                                            component.inputType = "text";
                                        }
                                    ),
                                    () => {
                                        changeInputType('mostrar', 'text', 'password', body.contaninerPadre, body, 'showPasswordButtonText', 'passwordInput', 'inputType')
                                    },
                                    () => {
                                        changeText(body.contaninerPadre, 'showPasswordButtonText', 'mostrar', 'ocultar')
                                    },
                            ],
                    children: [
                        {
                            type: "Text",
                            name: "showPasswordButtonText",
                            text: "mostrar",
                            style: {
                                textAlign: "center",
                                fontSize: '15px'
                            },
                            className: 'borders1 width100 padding1',
                            onClick:[()=> alert('ddd')  ]
                        }
                    ]
                    }
                ]
                }
            ]
            },
            {
                type: "Container",
                name: "passwordContainer",
                style: {},
                className: 'equalSpace',
                children: [
                    {
                        type: "Button",
                        name: "submitButton",
                        style: {
                            padding: "10px",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            cursor: "pointer"
                        },
                        onClick: [()=> checkTheLogin(findComponentByName(body, 'emailInput').value, findComponentByName(body, 'passwordInput').value, router, multipurpose, dispatch)],
                        
                        children: [
                            {
                            type: "Text",
                            name: "submitButtonText",
                            text: "Iniciar",
                            style: {
                                textAlign: "center",
                                fontSize: '16px'
                            }
                            }
                        ]
                    }
                ]
            },    
        ]
        }
    ]
    }
}
  
);

  const router = useRouter();
  const { id } = router.query;
  return (
    <Menu>
      <div className='color2'>
        <h1>Hola, {id}!</h1>
      </div>
    </Menu>
  );
  return RenderElement(body)
  

  
}

export default render;


/**
 * return (
    <Menu>
      <div className='color2'>
        <h1>Hola, {id}!</h1>
      </div>
    </Menu>
  );
 */