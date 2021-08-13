import React, {useState} from 'react'

function NewTaskForm({categories, addTask}) {
    const [formData, setFormData] = useState({
        description: "",
        category_id: "none"
    }) 

    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value

        setFormData({
            ...formData,
            [name]:value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        addTask(formData)
        setFormData({
            description: "",
            category_id: "none"
        })
    }

    const options = categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)

    return (
        <form onSubmit={handleSubmit}>
           <span>Add New Task: </span>
           <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description..."></input>
           <select name="category_id" value={formData.category_id} onChange={handleChange}>
                <option value="none" disabled>Select Category</option>
                {options}
           </select>
           <button type="submit">Add</button>
        </form>
    )
}

export default NewTaskForm