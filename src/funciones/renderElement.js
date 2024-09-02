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

import React, { useRef, forwardRef, useEffect } from 'react';
//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateRefs } from "@/funciones/redux/actions";

const refs = {};
const RenderElement = (element) => {
    const ref = useRef(null);
    refs[element.name] = ref;

    //redux
    const objetoRefs = useSelector(state => state.refs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateRefs(refs));
    }, [dispatch]);

    const ForwardedText = forwardRef((props, ref) => <Text {...props} forwardedRef={ref} />);
    const ForwardedVideo = forwardRef((props, ref) => <Video {...props} forwardedRef={ref} />);
    const ForwardedAudio = forwardRef((props, ref) => <Audio {...props} forwardedRef={ref} />);
    const ForwardedLink = forwardRef((props, ref) => <Link {...props} forwardedRef={ref} />);
    const ForwardedLabel = forwardRef((props, ref) => <Label {...props} forwardedRef={ref} />);
    const ForwardedButton = forwardRef((props, ref) => <Button {...props} forwardedRef={ref} />);
    const ForwardedIcon = forwardRef((props, ref) => <Icon {...props} forwardedRef={ref} />);
    const ForwardedInput = forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />);
    const ForwardedContainer = forwardRef((props, ref) => <Container {...props} forwardedRef={ref} />);

    switch (element.type) {
        case 'Text':
            return <ForwardedText ref={ref} text={element.text} style={element.style} />;
        case 'Video':
            return <ForwardedVideo ref={ref} src={element.src} style={element.style} />;
        case 'Audio':
            return <ForwardedAudio ref={ref} src={element.src} />;
        case 'Link':
            return <ForwardedLink ref={ref} href={element.href}>{element.text}</ForwardedLink>;
        case 'Label':
            return <ForwardedLabel ref={ref} valor={element.valor} onValueChange={element.onValueChange || (() => {})} />;
        case 'Button':
            return <ForwardedButton ref={ref} onClick={element.onClick} style={element.style} children={element.children} />;
        case 'Icon':
            return <ForwardedIcon ref={ref} iconType={element.iconType} style={element.style} />;
        case 'Input':
            return <ForwardedInput ref={ref} inputType={element.inputType} id={element.id} style={element.style} required={element.required} onValueChange={element.onValueChange} value={element.value} name={element.name} />;
        case 'Container':
            return (
            <ForwardedContainer ref={ref} style={element.style}>
                {element.children.map((child, index) => (
                    <React.Fragment key={index}>{RenderElement(child)}</React.Fragment>
                ))}
            </ForwardedContainer>
            );
        default:
            return null;
    }
};

export default RenderElement;