const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text}
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <Input text={"name:"} value={props.newName} onChange={props.handleNameChange} />
      <Input text={"number:"} value={props.newNumber} onChange={props.handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm