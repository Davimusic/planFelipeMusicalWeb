export function CreateSelect({id, name, value, options, event}) {
    return (
        <select id={id} style={{fontSize: '3.5vh'}} className="select-moderno resaltar" name={name} value={value} onChange={event}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}