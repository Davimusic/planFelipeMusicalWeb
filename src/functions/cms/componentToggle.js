import toggleContainerSize from "./toggleContainerSize";

export default function ComponentToggle( id ) {
    //console.log(id);
    
    function all(event) {
        toggleContainerSize([id], 'transition');
        const currentText = event.target.innerText;
        event.target.innerText = currentText === 'x' ? '+' : 'x';
    }

    return (
        <div className="center" style={{ background: 'white', color: 'black', fontSize: '3vh', borderRadius: '50%', width: '4vh', border: 'solid 2px black', padding: '2px', margin: '2px'  }} onClick={all}>
            x
        </div>
    );
    
}


