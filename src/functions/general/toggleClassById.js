export default function toggleClassById(id, className, isAddClass) {
    const element = document.getElementById(id);
    if (element) {
        if (isAddClass) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    } else {
        console.error(`Element with id ${id} not found.`);
    }
}
