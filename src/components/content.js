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

import llamarTodoAPUObjeto from "@/funciones/conectoresBackend/llamarTodoAPUObjeto";

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

    useEffect(() => {
        llamarTodoAPUObjeto('davipianof@gmail.com')
            .then(objetos => {
                dispatch(updateObjetoAPU(objetos[0]))
                dispatch(updateLlavesProyectos(Object.keys(objetos[0])))
                setLlaveProyectoEnUso(Object.keys(objetos[0])[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const prueba2 = {
        contaninerPadre: {
            type: "Container",
            style: {
                background: "green",
                width: "50%",
                padding: "20px",
                borderRadius: "0.5em"
            },
            children: [
                {
                type: "Container",
                style: {
                    background: "blue",
                    width: "50%",
                    padding: "20px",
                    borderRadius: "0.5em"
                },
                children: [
                    {
                    type: "Text",
                    texto: "hola mundo",
                    estilo: {
                        fontSize: "16px"
                    }
                    },
                    {
                    type: "Video",
                    src: "https://res.cloudinary.com/dplncudbq/video/upload/v1707506488/davipianof%40gmail.com/MadrenonaXD%20%C3%B1o%C3%B1a/jqezdabjbztdecleiun3.mp4",
                    estilo: {
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "0.5em"
                    }
                    },
                    {
                    type: "Container",
                    style: {
                        background: "gray",
                        width: "50%",
                        padding: "20px",
                        borderRadius: "0.5em"
                    },
                    children: [
                        {
                        type: "Link",
                        href: "/about",
                        text: "Acerca de nosotros"
                        },
                        {
                        type: "Audio",
                        src: "https://res.cloudinary.com/dplncudbq/video/upload/v1692977795/mias/relax7_orxvbj.mp3"
                        }
                    ]
                    }
                ]
                },
                {
                type: "Container",
                style: {
                    background: "blue",
                    width: "50%",
                    padding: "20px",
                    borderRadius: "0.5em"
                },
                children: [
                    {
                    type: "Text",
                    texto: "hola mundo",
                    estilo: {
                        fontSize: "16px"
                    }
                    },
                    {
                    type: "Video",
                    src: "https://res.cloudinary.com/dplncudbq/video/upload/v1707506488/davipianof%40gmail.com/MadrenonaXD%20%C3%B1o%C3%B1a/jqezdabjbztdecleiun3.mp4",
                    estilo: {
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "0.5em"
                    }
                    },
                    {
                    type: "Container",
                    style: {
                        background: "gray",
                        width: "fit-content",
                        padding: "20px",
                        borderRadius: "0.5em"
                    },
                    children: [
                        {
                        type: "Link",
                        href: "/about",
                        text: "Acerca de nosotros"
                        },
                        {
                        type: "Audio",
                        src: "https://res.cloudinary.com/dplncudbq/video/upload/v1692977795/mias/relax7_orxvbj.mp3"
                        }
                    ]
                    }
                ]
                }
            ]
            }
        };

        const login = {
            contaninerPadre: {
              type: "Container",
              style: {
                maxWidth: "400px",
                margin: "0 auto",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                backgroundColor: "gray"
              },
              children: [
                {
                  type: "Text",
                  text: "Iniciar Sesión",
                  estilo: {
                    textAlign: "center",
                    marginBottom: "20px",
                    fontSize: '50px'
                  }
                },
                {
                  type: "Container",
                  style: {
                    display: "flex",
                    flexDirection: "column"
                  },
                  children: [
                    {
                      type: "Container",
                      style: {
                        marginBottom: "15px"
                      },
                      children: [
                        {
                          type: "Label",
                          valor: "Correo Electrónico",
                          onValueChange: (value) => console.log(value)
                        },
                        {
                          type: "Input",
                          inputType: "email",
                          id: "email",
                          required: true,
                          style: {
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            background: 'red'
                          },
                          onValueChange: (value) => console.log('Checkbox value:', value)
                        }
                      ]
                    },
                    {
                      type: "Container",
                      style: {
                        marginBottom: "15px"
                      },
                      children: [
                        {
                          type: "Label",
                          valor: "Contraseña",
                          onValueChange: (value) => console.log(value)
                        },
                        {
                          type: "Container",
                          style: {
                            display: "flex",
                            alignItems: "center"
                          },
                          children: [
                            {
                              type: "Input",
                              inputType: "password",
                              id: "password",
                              required: true,
                              style: {
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc"
                              }
                            },
                            {
                              type: "Button",
                              buttonType: "button",
                              style: {
                                marginLeft: "10px",
                                padding: "10px",
                                border: "none",
                                background: "white",
                                cursor: "pointer",
                                color: "black"
                              }, 
                              children: [
                                {
                                    type: "Text",
                                    text: "mostrar",
                                    estilo: {
                                      textAlign: "center",
                                      fontSize: '15px'
                                    }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: "Container",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px"
                      },
                      children: [
                        {
                          type: "Input",
                          inputType: "checkbox",
                          id: "rememberMe",
                          required: true,
                          style: {
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                            background: 'red'
                          },
                        },
                        {
                          type: "Label",
                          valor: "Recordar sesión",
                          onValueChange: (value) => console.log(value)
                        }
                      ]
                    },
                    {
                      type: "Button",
                      style: {
                        padding: "10px",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        cursor: "pointer"
                      },
                      children: [
                        {
                            type: "Text",
                            text: "iniciar sesión",
                            estilo: {
                              textAlign: "center",
                              fontSize: '15px'
                            },
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "Container",
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px"
                  },
                  children: [
                    {
                      type: "Button",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: "#fff"
                      },
                      children: [
                        {
                          type: "Icon",
                          iconType: "FaGoogle",
                          style: {
                            marginRight: "10px"
                          }
                        },
                        {
                          type: "Text",
                          text: "Iniciar con Google",
                          estilo: {
                            textAlign: "center",
                            marginBottom: "20px",
                            fontSize: '15px'
                          }
                        }
                      ]
                    },
                    {
                      type: "Button",
                      style: {
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        backgroundColor: "#fff"
                      },
                      children: [
                        {
                          type: "Icon",
                          iconType: "FaFacebook",
                          style: {
                            marginRight: "10px"
                          }
                        },
                        {
                          type: "Text",
                          text: "Iniciar con Facebook",
                          estilo: {
                            textAlign: "center",
                            marginBottom: "20px",
                            fontSize: '15px'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          };
          
          
  

  


    
    return (
        <div style={{height:'100%'}}>
            {llavesProyectos.length === 0 ? 
                <div className="miContenedor">
                    <div className="miCirculoGiratorio"></div>
                </div>
            : 
            <div>
                {Object.keys(login).map((key) => (
                    <React.Fragment key={key}>
                        {RenderElement(login[key])}
                    </React.Fragment>
                ))}
            </div>
            }
        </div>
    );
}

