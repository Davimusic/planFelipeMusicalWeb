export default function saveLocalStorageInformation(path, body){
    localStorage.setItem(path, JSON.stringify(body));
}