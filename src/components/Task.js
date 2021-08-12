import React from 'react'

function Task({task}) {
    return (
        <div>
            <li>
                {task.description}
            </li>
        </div>
    )
}

export default Task