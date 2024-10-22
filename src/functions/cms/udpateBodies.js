export default function udpateBodies(edit, test, isReloadBodyWithTraverseAndReplaceOnClick, setIsReinjected, setBody, setBodyEdit, setBodyTest){
    if(isReloadBodyWithTraverseAndReplaceOnClick === true){
        setIsReinjected(true)
    }
    setBody(edit)
    setBodyEdit(edit)
    setBodyTest(test)
}