import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import '../estilos/menu.css'
import '../../src/app/globals.css'

export function Menu({ onActivate }){
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    }, [router.asPath]);

    
    function changeMenuState(){
        setIsOpen(!isOpen);
        onActivate(!isOpen);
    }

    return(
        <div className={`dropdown ${isOpen ? 'open' : ''}`}> 
            <img onClick={()=> changeMenuState()} className="imagenes" style={{margin: '5px'}} src="https://res.cloudinary.com/dplncudbq/image/upload/v1701542645/menu1_ui2fw4.png" alt="Descripción de la imagen" />
            {isOpen && (
                <div className='menuContent' onClick={()=> changeMenuState()}>
                    {typeof window !== 'undefined' ? 
                        <>
                            <button className="botones" onClick={() => {window.location.href='https://apu-kappa.vercel.app/'}}>APU</button>
                            <button className="botones" onClick={() => {window.location.href='https://gannt-blush.vercel.app/'}}>GANNT</button>
                        </>
                    : null}
                </div>
            )}
        </div>
    )
}


