import React from 'react';
import { useEffect } from "react";
import RenderElement from '@/functions/renderElement';
import LoginMold from '@/molds/login';
import '../estilos/general/general.css'



//import llamarTodoAPUObjeto from "@/funciones/conectoresBackend/llamarTodoAPUObjeto";

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export function Content() {    //redux
    /*useEffect(() => {
        llamarTodoAPUObjeto('davipianof@gmail.com')
            .then(objetos => {
                dispatch(updateObjetoAPU(objetos[0]))
                dispatch(updateLlavesProyectos(Object.keys(objetos[0])))
                setLlaveProyectoEnUso(Object.keys(objetos[0])[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);*/

    /*useEffect(() => {
        const obj={
            type: "Container",
            name: "botonsConatiner",
            style: {},
            className: ['paddingTop'],//color3
            children: [
                {
                    type: "Button",
                    name: "Button1",
                    id: '1',
                    buttonType: "button",
                    className: ['color1', 'paddingTop', 'rotate'],
                    style: {
                        padding: "10px",
                        border: "none",
                        background: "white",
                        cursor: "pointer",
                        color: "black"
                    },
                    onClick:`()=>  functions.handleMultipleFunctions([
                        functions.updateBody(setBody, '1', { style: { background: "blue" }}),
                        functions.alert("Otra funcion ejecutadaslrlrlrss")
                    ])`,
                    children: []
                },
                {
                    type: "Text",
                    name: "text",
                    text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha ",
                    style: {},
                    onClick:`()=>  functions.handleMultipleFunctions([
                        
                        functions.alert("Otra funcion text")
                    ])`,
                    className: 'padding1  scroll',//color2
                },
                {
                    type: "Button",
                    name: "Button2",
                    id: '2',
                    buttonType: "button",
                    className: ['color4', 'otros'],
                    style: {
                        padding: "10px",
                        border: "none",
                        background: "red",
                        cursor: "pointer",
                        color: "black"
                    },
                    onClick:`()=>  functions.handleMultipleFunctions([
                        functions.updateBody(setBody, '2', { style: { background: "blue" }}),
                        functions.alert("boton2")
                    ])`,
                    children: []
                }  
            ]
        }
        localStorage.setItem('multifunctions', JSON.stringify(obj));
    }, [])*/

    return (
        <div style={{height:'100%'}}>
            {RenderElement(LoginMold())}
        </div>
    );
}

