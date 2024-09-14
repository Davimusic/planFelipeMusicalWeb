import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import '../estilos/menu.css';
import '../../src/app/globals.css';
import HandleMultipleFunctions from "@/functions/general/handleMultipleFunctions";

export function Menu({ children }) {
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
        <div className={`backgroundImage ${isMenuOpen ? 'sinMarco' : 'marco'}`} style={{ height: '100%' }}>
            <div>
                <div className={`dropdown ${isMenuOpen ? 'open' : ''}`}>
                    <img 
                        onClick={changeMenuState} 
                        className="imagenes" 
                        style={{ margin: '5px' }} 
                        src="https://res.cloudinary.com/dplncudbq/image/upload/v1701542645/menu1_ui2fw4.png" 
                        alt="Descripción de la imagen" 
                    />
                    {isMenuOpen && (
                        <div className='menuContent' onClick={changeMenuState}>
                            {typeof window !== 'undefined' ? (
                                <>
                                    <button className="botones" onClick={() => { window.location.href = 'https://apu-kappa.vercel.app/' }}>APU</button>
                                    <button className="botones" onClick={() => { window.location.href = 'https://gannt-blush.vercel.app/' }}>GANNT</button>
                                    <button className="botones" onClick={HandleMultipleFunctions(
                
                () => router.push('/')
            )}
            >SALIR</button>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}





