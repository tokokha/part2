const Form = (props) => {
    return (    
        <form onSubmit={props.onSubmit}>
            {props.inputs.map(input => 
            <div>
                {input.text}: <input value={input.value} onChange={input.onChange}/>
            </div>
            )}
            <button type="submit">add</button>
        </form>
    )
}

export default Form