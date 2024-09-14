import generalConnector from "@/functions/BackendConnectors/generalConnector";
import localStorageAcces from "./localStorageAcces";

export default async function checkTheLoginInDb(user, password, router) {
    try {
        const result = await generalConnector('verifyLogin', 'POST', { user: user,password: password });

        if (result.success) {
            //dispatch(updateMultipurpose({ ...multipurpose, loggingStatus: true }));
            //console.log(Prueva('Post','loggingStatus', true));
            localStorageAcces('POST', 'loggingStatus', true)
            /*if (typeof window !== 'undefined') {
            //localStorage.setItem('loggingStatus', JSON.stringify(true));
            }*/
            //console.log('logeo exitosamente');
            router.push('/first');
        } else {
            console.log(result.message);
        }
    } catch (error) {
        console.error('Error verificando el usuario:', error);
    }    
}