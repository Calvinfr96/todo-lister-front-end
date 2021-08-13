import React, {useState, useEffect} from 'react'
import NewCategoryForm from './NewCategoryForm'
import NewTaskForm from './NewTaskForm'
import Task from './Task'

function TaskContainer() {
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const baseURL = "http://localhost:9393"
    const options = categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
    

    useEffect(() => {
        fetch(`${baseURL}/tasks`)
            .then(resp => resp.json())
            .then(data => setTasks(data))
    },[])

    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then(resp => resp.json())
            .then(data => setCategories(data))
    }, [])

    function addTask(formData) {
        const configObj = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                ...formData,
                category_id: parseInt(formData.category_id)
            })
        }
        fetch(`${baseURL}/tasks`, configObj)
            .then(resp => resp.json())
            .then(newTask => {
                setTasks([...tasks, newTask])
            })
    }

    function deleteTask(id) {
        fetch(`${baseURL}/tasks/${id}`, {method:"DELETE"})
            .then(resp => resp.json())
            .then(data => {
                const updatedTasks = tasks.filter(task => task.id !== id)
                setTasks(updatedTasks)
            })
    }

    function addCategory(name) {
        const configObj = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name: name
            })
        }
        fetch(`${baseURL}/categories`, configObj)
            .then(resp => resp.json())
            .then(newCategory => {
                setCategories([...categories, newCategory])
            })   
    }

    function deleteCategory(id) {
        fetch(`${baseURL}/categories/${id}`, {method:"DELETE"})
            .then(resp => resp.json())
            .then(data => {
                const updatedCategories = categories.filter(category => category.id !== parseInt(id))
                setCategories(updatedCategories)
            })
    }

    const taskComponents = tasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} />)

    return (
        <div>
            <NewTaskForm options={options} addTask={addTask} />
            <NewCategoryForm options={options} addCategory={addCategory} deleteCategory={deleteCategory} />
            <ul className="TaskContainer">
            {taskComponents} 
            </ul>
        </div>
    )
}

export default  TaskContainer