import React, {useState} from 'react'

function NewUserForm({addUser}) {
    const [text, setText] = useState("")

    function editText(event) {
        setText(event.target.value)
    }

    function handleAddUser(event) {
        event.preventDefault()
        addUser(text)
        setText("")
    }

    return (
        <div className="NewUser">
            <form onSubmit={handleAddUser}>
                <span>Create new user: </span>
                <input type="text" value={text} onChange={editText} placeholder="Name..."></input>
                <button type="submit">Add</button>
            </form>
            <form>
            </form>
        </div>
    )
}

export default NewUserForm