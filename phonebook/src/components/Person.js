const Person = ({ info, removeHandler }) => {
    return (
    <div>
        <li key={info.name}>{info.name} {info.number} <button onClick={() => removeHandler(info.id)}>delete</button></li>
    </div>
    )
}

export default Person