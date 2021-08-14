import React from 'react'

function Task({task, deleteTask, toggleImportant}) {
    function handleClick() {
        deleteTask(task.id)
    }

    function handleToggle() {
        toggleImportant(task)
    }
    return (
        <div className={task.important ? "important" : null}>
            <li>
                <button onClick={handleClick}>X</button>
                <button onClick={handleToggle}>!</button>
                {task.description}
            </li>
        </div>
    )
}

export default Task