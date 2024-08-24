export function CreateSelect({name, value, options, event}) {
    return (
        <select style={{fontSize: '3.5vh'}} className="select-moderno resaltar" name={name} value={value} onChange={event}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}