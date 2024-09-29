export default function validateMultipurposeAccess(key, value){
    if (typeof window !== 'undefined') {
        const storedMultipurpose = JSON.parse(localStorage.getItem('multipurpose'));
        return storedMultipurpose && storedMultipurpose[key] === value;
    }
    return false;
};