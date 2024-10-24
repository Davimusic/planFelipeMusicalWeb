import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import '../estilos/menu.css';
import '../../src/app/globals.css';
import HandleMultipleFunctions from "@/functions/general/handleMultipleFunctions";
import localStorageAcces from "@/functions/security/localStorageAcces";

export function Menu({ children, imageLink, body, backgroundColor, zIndex }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        // Aquí puedes agregar cualquier lógica que necesites cuando cambie la ruta
    }, [router.asPath]);

    function changeMenuState() {
        setIsMenuOpen(!isMenuOpen);
        console.log(isMenuOpen ? 'El menú se ha cerrado.' : 'El menú se ha abierto.');
    }

    return (
        <div className={`backgroundImage ${isMenuOpen ? 'sinMarco' : 'marco'} center`} style={{ height: '100%', background: backgroundColor }}>
            <div>
                <div style={{background: backgroundColor, zIndex: zIndex}} className={`dropdown ${isMenuOpen ? 'open' : ''}`}>
                    <img 
                        onClick={changeMenuState} 
                        className="imagenes" 
                        style={{ margin: '5px' }} 
                        src={imageLink} 
                        alt="Descripción de la imagen" 
                    />
                    {isMenuOpen && (
                        <div className='menuContent' onClick={changeMenuState}>
                            {body}
                        </div>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}





