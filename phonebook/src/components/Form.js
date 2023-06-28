const Form = (props) => {
    return (    
        <form onSubmit={props.onSubmit}>
            {props.inputs.map((input, i) => 
            <div key={i}>
                {input.text}: <input key={i} value={input.value} onChange={input.onChange}/>
            </div>
            )}
            <button type="submit">add</button>
        </form>
    )
}

export default Form