import React from 'react';
import IsShow from '@/components/isShow';
import Text from '@/components/simple/text';
import Video from '@/components/simple/video';
import Audio from '@/components/simple/audio';
import Link from 'next/link';
import Container from '@/components/simple/container';
import Label from '@/components/simple/label';
import Button from '@/components/simple/button';
import Icon from '@/components/simple/icon';
import Input from '@/components/simple/input';

const RenderElement = (element) => {
    switch (element.type) {
        case 'Text':
            return <Text text={element.text} estilo={element.estilo} />;
        case 'Video':
            return <Video src={element.src} estilo={element.estilo} />;
        case 'Audio':
            return <Audio src={element.src} />;
        case 'Link':
            return <Link href={element.href}>{element.text}</Link>;
        case 'Label':
            return <Label valor={element.valor} onValueChange={element.onValueChange || (() => {})} />; 
        case 'Button':
            return <Button onClick={element.onClick} style={element.style} children={element.children}/>
        case 'Icon':
            return <Icon iconType={element.iconType} style={element.style} />; 
        case 'Input':
            return <Input inputType={element.inputType} id={element.id} style={element.style} required={element.required} onValueChange={element.onValueChange} />; 
        case 'Container':
            return (
            <Container style={element.style}>
                {element.children.map((child, index) => (
                <React.Fragment key={index}>
                    {RenderElement(child)}
                </React.Fragment>
                ))}
            </Container>
            );
        default:
            return null;
        }
    };

export default RenderElement;