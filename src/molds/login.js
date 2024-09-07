import { Alert } from "@/funciones/generales/alert";
import deepClone from "@/funciones/generales/deepClone";
import HandleComponentChange from "@/funciones/generales/handleComponentChange";
import { useState, useEffect } from "react";
import { updateObjectInEdition, updateMultipurpose } from "@/funciones/redux/actions";
import generalConnector from "@/funciones/conectoresBackend/generalConnector";
import { useRouter } from "next/navigation";
import validateMultipurposeAccess from "@/funciones/generales/security/validateMultipurposeAccess";
import Prueva from "@/funciones/generales/prueba";



function findComponentByName(obj, name) {
    if (obj.name === name) {
        return obj;
    }

    if (obj.children) {
        for (let child of obj.children) {
            const result = findComponentByName(child, name);
            if (result) {
                return result;
            }
        }
    }

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            const result = findComponentByName(obj[key], name);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

async function checkTheLogin(user, password, router, multipurpose, dispatch) {
    user = user.trim();// Eliminar espacios en blanco adicionales
    password = password.trim();

    if (!user || !password) {// Verificar si el usuario o la contraseña están vacíos
        alert("Error: El usuario y la contraseña no pueden estar vacíos.");
        return false;
    }
    checkTheLoginInDb(user, password, router, multipurpose, dispatch)
}

async function checkTheLoginInDb(user, password, router, multipurpose, dispatch) {
    

    try {
        const result = await generalConnector('verifyLogin', 'POST', { user: user,password: password });

        if (result.success) {
            //dispatch(updateMultipurpose({ ...multipurpose, loggingStatus: true }));
            //console.log(Prueva('Post','loggingStatus', true));
            localStorage.setItem('multipurpose', JSON.stringify({'loggingStatus': true}));
            // Recuperar y mostrar el objeto en el log
            const storedObject = JSON.parse(localStorage.getItem('hola'));
            console.log('Objeto almacenado:', storedObject);
            //console.log('logeo exitosamente');
            router.push('/first');
        } else {
            console.log(result.message);
        }
    } catch (error) {
        console.error('Error verificando el usuario:', error);
    }    
}








//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
export default function LoginMold() {
    const refs = useSelector(state => state.refs);
    const multipurpose = useSelector(state => state.multipurpose);
    const objectInEdition = useSelector(state => state.objectInEdition);
    const router = useRouter();

    useEffect(() => {
        if (multipurpose.loggingStatus) {
            router.push('/first');
        }
    }, [multipurpose.loggingStatus]);

    useEffect(() => {
        console.log(multipurpose);
        
    }, [multipurpose]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (validateMultipurposeAccess('loggingStatus', true)) {
                router.push('/first');
            } 
        }
    }, [router]);

    
    

    const dispatch = useDispatch();
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

    



    function changeText(object, name, text1, text2){
        const textComponent = findComponentByName(object, name);
        if (textComponent.text === text1) {
            changeBody(
                HandleComponentChange, 
                'showPasswordButtonText', 
                body, 
                (component) => {
                    component.text = text2;
                }
            );
        } else {
            changeBody(
                HandleComponentChange, 
                'showPasswordButtonText', 
                body, 
                (component) => {
                    component.text = text1;
                }
            );
        }                                            
    }
    
    function changeInputType(text1, inputType1, inputType2, object, body, compativeName, finalName, newType) {
        const obj = findComponentByName(object, compativeName);
        
        const newInputType = (text1 === obj.text) ? inputType1 : inputType2;
        
        changeBody(
            HandleComponentChange, 
            finalName, 
            body, 
            (component) => {
                component[newType] = newInputType;
            }
        );
    }
    

    
    
    const saveObjectsNameInEdition = (obj) => {
        dispatch(updateObjectInEdition(obj))
    }

    const changeBody = (func, ...args) => {
        const updatedBody = func(...args);
        //console.log(updatedBody);
        //console.log(deepClone(updatedBody));
        setBody(deepClone(updatedBody));
    };

    return body
}



