import React from "react";

const Form = ({ submitHandle, name, handleName, number, handleNumber }) => {
    return (
        <form onSubmit={submitHandle}>
            <div>
                name: <input value={name} onChange={handleName} />
            </div>
            <div>
                number: <input value={number} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;