import '../../estilos/general/general.css'
import { Menu } from '@/components/menu';
import React, { useState, useEffect } from "react";
import RenderElement from '@/functions/renderElement';
import importAllLocalFunctions from '@/functions/general/importAllLocalFunctions';
import slideGalery from '@/components/complex/slideGalery';
import SlideGallery from '@/components/complex/slideGalery';

const functions = importAllLocalFunctions()

/*let prueba = [{
    "type": "Text",
    "text": "hola",
    "style": {color: 'blue'},
    onClick: `() => ''`,
    className: ['padding1']
},{
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
                        functions.alert('bu')
                            
                ])`,
    'className': ['rotate'],
    "children": [
        {
            "type": "Text",
            "text": "hola",
            "style": {color: 'blue'},
            onClick: `() => ''`,
            className: ['']
        },
    ]
},{
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
functions.alert(value)
    ])`
},{
    "type": "Text",
    "text": "hola",
    "style": {color: 'blue'},
    onClick: `() => ''`,
    className: ['']
}]

console.log(slideGalery(prueba));

functions.localStorageAcces('POST', 'multifunctions', slideGalery(prueba))*/

export default function render() {
    const [body, setBody] = useState({});

    const items = [
        <div className='rotate' style={{ backgroundColor: 'red', height: '45vh', width: '90%',objectFit: 'cover', margin: '0 auto'  }}>Item 1</div>,
        <div style={{ backgroundColor: 'green', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 2</div>,
        <div onClick={() => alert('si')} style={{ backgroundColor: 'blue', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 3</div>,
        <div style={{ backgroundColor: 'yellow', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 4</div>,
        <p style={{ backgroundColor: 'lightgrey', height: '45vh', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover', margin: '0 auto'  }}>Texto de ejemplo</p>,
        <img src="https://res.cloudinary.com/dplncudbq/image/upload/v1657563380/mias/h19_wgstaq.jpg" alt="Placeholder" style={{ width: '100%', objectFit: 'cover', margin: '0 auto' }} />,
        <video controls style={{ height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>
            <source src="https://res.cloudinary.com/dplncudbq/video/upload/v1657988838/mias/y5_hjj0uv.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>,
        <div className='rotate' style={{ backgroundColor: 'red', height: '45vh', width: '90%',objectFit: 'cover', margin: '0 auto'  }}>Item 1</div>,
        <div style={{ backgroundColor: 'green', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 2</div>,
        <div onClick={() => alert('si')} style={{ backgroundColor: 'blue', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 3</div>,
        <div style={{ backgroundColor: 'yellow', height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>Item 4</div>,
        <p style={{ backgroundColor: 'lightgrey', height: '45vh', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'cover', margin: '0 auto'  }}>Texto de ejemplo</p>,
        <img src="https://res.cloudinary.com/dplncudbq/image/upload/v1657563380/mias/h19_wgstaq.jpg" alt="Placeholder" style={{ width: '100%', objectFit: 'cover', margin: '0 auto' }} />,
        <video controls style={{ height: '45vh', width: '90%', objectFit: 'cover', margin: '0 auto'  }}>
            <source src="https://res.cloudinary.com/dplncudbq/video/upload/v1657988838/mias/y5_hjj0uv.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    ];

    return  <Menu>
                <SlideGallery 
                    visibleCount={2} 
                    autoScroll={true} 
                    interval={2000} 
                    showNavigationPoints={true} 
                    showNavigationButtons={true} 
                    autoScrollAfterClick={false} 
                    timeToReactivateAutoScrollAfterClick={1000} 
                    transitionType={'fade'}>                    
                </SlideGallery>
            </Menu>
    
    
    /*useEffect(() => {
        functions.convertStringFunctionsToOperables('multifunctions', functions, setBody)
    }, []);*/

    return <Menu>{RenderElement(body)}</Menu>
}



