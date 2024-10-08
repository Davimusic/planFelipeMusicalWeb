//import React from 'react';
import IsShow from '@/components/isShow';
import Text from '@/components/simple/text';
import Video from '@/components/simple/video';
import Audio from '@/components/simple/audio';
import Link from 'next/link';
import Container from '@/components/simple/container';
import Label from '@/components/simple/label';
import Button from '@/components/simple/button';
import Icon from '@/components/simple/icon';
import Input from '@/components/simple/input'
import Image from 'next/image';
import dynamic from 'next/dynamic';


import React, { useRef, useEffect } from 'react';

import Alert from '@/funciones/generales/alert';


const functions = {
    alert: dynamic(() => import('@/funciones/generales/alert')),
    deepClone: dynamic(() => import('@/funciones/generales/deepClone')),
    handleComponentChange: dynamic(() => import('@/funciones/generales/handleComponentChange')),
    handleMultipleFunctions: dynamic(() => import('@/funciones/generales/handleMultipleFunctions')),
    // Agrega aquí más funciones según sea necesario
};

console.log('Functions:', functions); // Para verificar que las funciones se cargan correctamente





const RenderElement = (element) => {
   // console.log(element);
    

    const handleClick = (onClick) => {
        
    };
    
    

    switch (element.type) {
        case 'Text':
            return <Text onClick={element.onClick} text={element.text} style={element.style} className={element.className} />;
        case 'Video':
            return <Video src={element.src} style={element.style} className={element.className} />;
        case 'Audio':
            return <Audio src={element.src} className={element.className} />;
        case 'Link':
            return <Link href={element.href} className={element.className}>{element.text}</Link>;
        case 'Label':
            return <Label valor={element.valor} onValueChange={element.onValueChange || (() => {})} className={element.className} />;
        case 'Button':
                return <Button id={element.id} onClick={element.onClick} style={element.style} className={element.className}>
                    {element.children && element.children.map((child, index) => (
                        <React.Fragment key={index}>{RenderElement(child)}</React.Fragment>
                    ))}
                </Button>;
        case 'Icon':
            return <Icon iconType={element.iconType} style={element.style} className={element.className} />;
        case 'Input':
            return <Input inputType={element.inputType} id={element.id} style={element.style} required={element.required} onValueChange={element.onValueChange} value={element.value} name={element.name} className={element.className} />;
        case 'Image':
            return <Image onClick={() => handleClick(element.onClick)} src={element.src} alt={element.alt} className={element.className} style={element.style} height={element.height} width={element.width} />;
        case 'Container':
            return (
                <Container style={element.style} className={element.className}>
                    {element.children.map((child, index) => (
                        <React.Fragment key={index}>{RenderElement(child)}</React.Fragment>
                    ))}
                </Container>
            );
        default:
            return null;
    }
};

export default RenderElement;
