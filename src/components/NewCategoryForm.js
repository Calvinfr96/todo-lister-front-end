import React, {useState} from 'react'

function NewCategoryForm({options, addCategory, deleteCategory}) {
    const [text, setText] = useState("")
    const [selection, setSelection] = useState("none")
    

    function editText(event) {
        setText(event.target.value)
    }

    function editSelection(event) {
        setSelection(event.target.value)
    }

    function handleAddCategory(event) {
        event.preventDefault()
        addCategory(text)
        setText("")
    }

    function handleDeleteCategory(event) {
        event.preventDefault()
        console.log(selection)
        deleteCategory(selection)
        setSelection("none")
    }

    return (
        <div className="CategoryForm">
            <form onSubmit={handleAddCategory}>
                <span>Add / Delete Category: </span>
                <input type="text" value={text} onChange={editText}></input>
                <button type="submit">Add</button>
            </form>
            <form onSubmit={handleDeleteCategory}>
                <select value={selection} onChange={editSelection}>
                    <option value="none" disabled>Select Category</option>
                    {options}
                </select>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default  NewCategoryForm