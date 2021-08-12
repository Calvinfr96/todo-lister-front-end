import React, {useState, useEffect} from 'react'
import Task from './Task'

function TaskContainer() {
    const [tasks, setTasks] = useState([])
    const baseURL = "http://localhost:9393"

    useEffect(() => {
        fetch(`${baseURL}/tasks`)
            .then(resp => resp.json())
            .then(data => setTasks(data))
    },[])

    const taskComponents = tasks.map(task => <Task key={task.id} task={task} />)

    return (
        <ul className="TaskContainer">
           {taskComponents} 
        </ul>
    )
}

export default  TaskContainer