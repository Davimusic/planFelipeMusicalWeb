'use client'

import "./globals.css";
import React, { useState, useEffect } from 'react';
import { Menu } from "@/components/menu";
import { Content } from "@/components/Content";


export function Root(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuActivation = (isOpen) => {
        setIsMenuOpen(isOpen)
        console.log(isOpen ? 'El menú se ha abierto.' : 'El menú se ha cerrado.');
    };

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const onlineHandler = () => setIsOnline(true);
        const offlineHandler = () => setIsOnline(false);

        window.addEventListener('online', onlineHandler);
        window.addEventListener('offline', offlineHandler);

        return () => {
        window.removeEventListener('online', onlineHandler);
        window.removeEventListener('offline', offlineHandler);
        };
    }, []);


    return (
        <html>
            <head>
                <link
                href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Dancing+Script&family=Montserrat+Alternates:ital,wght@0,300;1,100&family=PT+Serif:ital@1&family=Playfair+Display:ital,wght@1,500&family=Rubik+Vinyl&display=swap"
                rel="stylesheet"
                />
                <link 
                rel="icon" 
                href="https://res.cloudinary.com/dplncudbq/image/upload/v1696908663/f3_w6ble7_6_11zon_r9zfj1.webp" 
                type="image/x-icon">
                </link>
            </head>
            <body className={`imagenFondo ${isMenuOpen === false ? 'marco' : 'sinMarco' }`} style={{height: '100%'}}>
                <div>
                    {isOnline ? (
                        <div>
                            <Menu onActivate={handleMenuActivation} />
                            <Content />
                        </div>
                    ) : (
                        <div style={{backgroundColor: '#0000009a', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <p>No hay conexión a Internet</p>
                        </div>
                    )}
                </div>
            </body>
        </html>
    );
}