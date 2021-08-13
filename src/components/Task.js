import React from 'react'

function Task({task, deleteTask}) {
    function handleClick() {
        deleteTask(task.id)
    }
    return (
        <div>
            <li>
                <button onClick={handleClick}>X</button>
                <button>!</button>
                {task.description}
            </li>
        </div>
    )
}

export default Task