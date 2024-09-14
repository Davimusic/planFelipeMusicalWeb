import { Alert } from "@/functions/general/alert";
import deepClone from "@/functions/general/deepClone";
import HandleComponentChange from "@/functions/general/handleComponentChange";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import validateMultipurposeAccess from "@/functions/security/validateMultipurposeAccess";
import Prueva from "@/functions/general/prueba";
import importAllLocalFunctions from '@/functions/general/importAllLocalFunctions';

let functions = importAllLocalFunctions()
//console.log(functions);
let login={
    "type": "Container",
    "name": "containerPadre",
    "style": {},
    "className": [
        "horizontalCenter",
        "center"
    ],
    "children": [
        {
            "type": "Container",
            "name": "formContainer",
            "style": {},
            "className": [
                "color3",
                "block",
                "maxWidth400",
                "margin1",
                "padding1",
                "borders1",
                
            ],
            "children": [
                {
                    "type": "Text",
                    "name": "headerText",
                    "text": "Iniciar Sesión",
                    "style": {
                        "textAlign": "center",
                        "marginBottom": "20px",
                        "fontSize": "50px",
                        "color": "red"
                    }
                },
                {
                    "type": "Container",
                    "name": "emailContainer",
                    "style": {
                        "marginBottom": "15px"
                    },
                    "children": [
                        {
                            "type": "Label",
                            "name": "emailLabel",
                            "valor": "Correo Electrónico"
                        },
                        {
                            "type": "Input",
                            "name": "Input1",
                            "inputType": "email",
                            "id": "Input1",
                            "required": true,
                            "style": {},
                            "className": [
                                "borders1",
                                "width100",
                                "padding1",
                                "borderNone"
                            ],
                            "value": "",
                            "onValueChange": `(value) => functions.handleMultipleFunctions([
                                functions.setEmail(value)
                            ])`
                        }
                    ]
                },
                {
                    "type": "Container",
                    "name": "passwordContainer",
                    "style": {
                        "marginBottom": "15px"
                    },
                    "children": [
                        {
                            "type": "Label",
                            "name": "passwordLabel",
                            "valor": "Contraseña"
                        },
                        {
                            "type": "Container",
                            "name": "passwordInputContainer",
                            "style": {
                                "display": "flex",
                                "alignItems": "center"
                            },
                            "children": [
                                {
                                    "type": "Input",
                                    "name": "Input2",
                                    "inputType": "password",
                                    "id": "Input2",
                                    "required": true,
                                    "style": {},
                                    "className": [
                                        "borders1",
                                        "width100",
                                        "padding1",
                                        "borderNone"
                                    ],
                                    "value": "",
                                    "onValueChange": `(value) => functions.handleMultipleFunctions([
                                functions.setPassword(value)
                                    ])`
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "name": "passwordInputContainer",
                    "style": {
                        "display": "flex",
                        "alignItems": "center"
                    },
                    className: ['center'],
                    "children": [
                        {
                            "type": "Button",
                            "name": "submitButton",
                            "style": {
                                "padding": "10px",
                                "borderRadius": "4px",
                                "border": "none",
                                "backgroundColor": "#007BFF",
                                "color": "#fff",
                                "cursor": "pointer"
                            },
                            "onClick": `() => functions.handleMultipleFunctions([
                                                functions.evaluteAction(functions.checkTheLogin(functions.email(), functions.password()), 
                                                                        functions.checkTheLoginInDb(functions.email(), functions.password(), functions.router()),
                                                                        functions.alert('login errado'))
                                                    
                                        ])`,
                            'className': [''],
                            "children": [
                                {
                                    "type": "Text",
                                    "text": "hola",
                                    "style": {color: 'blue'},
                                    onClick: `() => ''`,
                                    className: ['']
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
}

if (typeof window !== 'undefined') {
localStorage.setItem('multifunctions', JSON.stringify(login));
}


export default function LoginMold() {
    const [body, setBody] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    functions['setEmail'] = (value) => setEmail(value);
    functions['email'] = () => email;
    functions['setPassword'] = (value) => setPassword(value);
    functions['password'] = () => password;
    functions['router'] = () => router;

    console.log(functions);
    const router = useRouter();

    /*useEffect(() => {
        if (multipurpose.loggingStatus) {
            router.push('/first');
        }
    }, [multipurpose.loggingStatus]);*/

    useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
    }, []);

    useEffect(() => {
        console.log(email);
    }, [email]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (validateMultipurposeAccess('loggingStatus', true)) {
                router.push('/first');
            } 
        }
    }, [router]);  

    return body
}

let referencia = {
    type: "Container",
    name: "containerPadre",
    style: {
        
    },
    className: ['horizontalCenter', 'center'],
    children: [
        {
        type: "Container",
        name: "formContainer",
        style: {
            
        },
        className: ['color3', 'block', 'maxWidth400', 'margin1', 'padding1', 'borders1'],
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
                className: ['borders1', 'width100', 'padding1', 'borderNone'],
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
                    className: ['borders1', 'width100', 'padding1', 'borderNone'],
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
                            className: ['borders1', 'width100', 'padding1'],
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
                className: ['equalSpace'],
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

