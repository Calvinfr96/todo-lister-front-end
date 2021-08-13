import React from 'react'

function Task({task, deleteTask}) {
    function handleClick() {
        deleteTask(task.id)
    }
    return (
        <div>
            <li>
                <button onClick={handleClick}>X</button>
                {task.description}
            </li>
        </div>
    )
}

export default Task