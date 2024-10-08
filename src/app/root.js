'use client';

import "./globals.css";
import React, { useState, useEffect } from 'react';
import { Content } from "@/components/content";
import Head from 'next/head';

export function Root() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Dancing+Script&family=Montserrat+Alternates:ital,wght@0,300;1,100&family=PT+Serif:ital@1&family=Playfair+Display:ital,wght@1,500&family=Rubik+Vinyl&display=swap"
                    rel="stylesheet"
                />
                <link 
                    rel="icon" 
                    href="https://res.cloudinary.com/dplncudbq/image/upload/v1696908663/f3_w6ble7_6_11zon_r9zfj1.webp" 
                    type="image/x-icon"
                />
                <link rel="stylesheet" href="../estilos/general/general.css" />
            </Head>
            <body className="backgroundImage sinMarco" style={{height: '100%'}}>
                <div>
                    <Content />
                </div>
            </body>
        </html>
    );
}

