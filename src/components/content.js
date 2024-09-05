import React from 'react';
import { useState, useEffect } from "react";
import RenderElement from '@/funciones/renderElement';
import axios from 'axios';
import IsShow from "./isShow";
import Text from "./simple/text";
import Video from "./simple/video";
import Audio from "./simple/audio";
import Link from "next/link";
import Container from "./simple/container";
import Label from './simple/label';
import Button from './simple/button';
import { CreateSelect } from "./simple/selects";
import decidirTipoDeArchivo from "@/funciones/decidirTipoDeArchivo";
import LoginMold from '@/molds/login';



//import llamarTodoAPUObjeto from "@/funciones/conectoresBackend/llamarTodoAPUObjeto";

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateObjetoAPU, updateLlavesProyectos } from "@/funciones/redux/actions";
import { basePath } from '../../next.config';

export function Content() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [email, setEmail] = useState('davipianof@gmail.com');
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [llaveProyectoEnUso, setLlaveProyectoEnUso] = useState('');

    //redux
    const objetosAPU = useSelector(state => state.objetosAPU);
    const llavesProyectos = useSelector(state => state.llavesProyectos);
    const dispatch = useDispatch();

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

    return (
        <div style={{height:'100%'}}>
            <div>
                {Object.keys(LoginMold()).map((key) => (
                    <React.Fragment key={key}>
                        {RenderElement(LoginMold()[key])}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

