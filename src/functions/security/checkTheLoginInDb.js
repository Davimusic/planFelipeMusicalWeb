import generalConnector from "@/functions/BackendConnectors/generalConnector";
import localStorageAcces from "./localStorageAcces";

export default async function checkTheLoginInDb(user, password, router) {
    console.log({user: user});
    console.log({password: password});
    
    try {
        const result = await generalConnector('verifyLogin', 'POST', { user: user,password: password });
        console.log(result);

        if (result.success) {
            localStorageAcces('POST', 'loggingStatus', true)
            console.log('logeo exitoso');
            router.push('/first');
        } else {
            console.log(result.message);
        }
    } catch (error) {
        console.error('Error verificando el usuario:', error);
    }    
}