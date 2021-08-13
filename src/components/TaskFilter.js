import React from 'react'

function TaskFilter({users, userIndex, categoryFilter, setCategoryFilter}) {
    const currentUser = users.filter(user => user.id === parseInt(userIndex))[0]
    const userCategories = currentUser.categories
    const options = userCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)

    function handleSelection(event) {
        setCategoryFilter(event.target.value)
    }
    return (
        <div>
           <span>Filter Tasks: </span>
           <select value={categoryFilter} onChange={handleSelection}>
                <option value="All" disabled>Select Filter</option>
                {options}
           </select>
        </div>
    )
}

export default TaskFilter