import React, { useState, useEffect, useRef } from 'react';
'../../estilos/general/general.css'

export default function SlideGallery({ children, visibleCount, autoScroll = false, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoScrollRef = useRef();

    useEffect(() => {
        if (autoScroll) {
            autoScrollRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
            }, interval);
        }
        return () => clearInterval(autoScrollRef.current);
    }, [autoScroll, interval, children.length]);

    const handleNext = () => {
        clearInterval(autoScrollRef.current);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    };

    const handleBefore = () => {
        clearInterval(autoScrollRef.current);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
    };

    return (
        <div className='center' style={{width: '100%', height: '90vh'}}>
            <div className='' style={{width: '80%', height: '90vh'}}>
            <div>
            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 'max-content' }}>
            <div
                style={{
                    flex: 1,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    border: 'none',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', width: '100%', transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.9s ease' }}>
                    {children.map((child, index) => (
                        <div className='center' key={index} style={{ flex: '0 0 100%', width: '100%' }}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            
            </div>
            <div className='center padding1'>
                <button
                    onClick={handleBefore}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        cursor: 'pointer',
                        margin: '0 10px'
                    }}
                >
                    Before
                </button>
                <button
                    onClick={handleNext}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px',
                        cursor: 'pointer',
                        margin: '0 10px'
                    }}
                >
                    After
                </button>
            </div>
            </div>
            </div>
            </div>
    );
}













/*export default function slideGalery(children){
    return {
        "type": "Container",
        "style": {
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center"
        },
        "children": [
            {
                "type": "Button",
                "onClick": "() => functions.alert('next')",
                "style": {
                    "backgroundColor": "#007bff",
                    "color": "white",
                    "border": "none",
                    "padding": "10px",
                    "cursor": "pointer",
                    "margin": "0 10px"
                },
                "children": []
            },
            {
                "type": "Container",
                "style": {
                    "maxWidth": "600px",
                    "maxHeight": "400px",
                    "border": "2px solid #ddd",
                    "borderRadius": "10px",
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center"
                },
                "children": children
            },
            {
                "type": "Button",
                "onClick": "() => functions.alert('before')",
                "style": {
                    "backgroundColor": "#007bff",
                    "color": "white",
                    "border": "none",
                    "padding": "10px",
                    "cursor": "pointer",
                    "margin": "0 10px"
                },
                "children": []
            }
        ]
    }    
}*/


