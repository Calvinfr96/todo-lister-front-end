import React from 'react'

function Task({task, deleteTask, toggleImportant, toggleCompleted}) {
    function handleDelete() {
        if (task.completed) {
            deleteTask(task.id)
        } else {
            alert('Task must be marked as completed before being deleted')
        }
    }

    function handleToggleImportant() {
        toggleImportant(task)
    }

    function handleToggleCompleted() {
        toggleCompleted(task)
    }

    let className = "normal"

    if (task.completed) {
        className = "completed"
    } else if (task.important) {
        className = "important"
    } else {
        className = "normal"
    }
    
    return (
        <div className={className}>
            <li>
                <input className="remove" type="button" value="&#x2715;" onClick={handleDelete}></input>
                <input className="finish" type="button" value="&#x2713;" onClick={handleToggleCompleted}></input>
                <input className="emphasize" type="button" value="&#33;" onClick={handleToggleImportant}></input>
                {task.description}
            </li>
        </div>
    )
}

export default Task