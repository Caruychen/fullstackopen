import React from 'react'

const FormInput = ({ value, text, type, onChange }) => {
  const handleChange = ({ target }) => onChange(target.value)
  return (
    <div>
      {text}:
      <input
        type={type}
        value={value}
        name={text}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormInput