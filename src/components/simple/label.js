import { useState } from 'react';

export default function Label(props) {
  const [value, setValue] = useState(props.valor);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onValueChange(event.target.value);
  };

  return (
    <div>
      <label
        style={{
          color: 'black',
          width: '100%',
          padding: '12px 20px',
          margin: '8px 0',
          boxSizing: 'border-box',
          borderRadius: '4px',
          transition: '0.5s',
          outline: 'none',
          display: 'block',
        }}
      >
        {value}
      </label>
    </div>
  );
}
