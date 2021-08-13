import React, {useState, useEffect} from 'react'
import NewCategoryForm from './NewCategoryForm'
import NewTaskForm from './NewTaskForm'
import Task from './Task'
import TaskFilter from './TaskFilter'

function TaskContainer({setUsers, users, currentUser}) {
    const [allTasks, setAllTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryFilter, setCategoryFilter] = useState("All")
    const baseURL = "http://localhost:9393"
    const options = categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)

    useEffect(() => {
        fetch(`${baseURL}/tasks`)
            .then(resp => resp.json())
            .then(data => setAllTasks(data))
    },[])

    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then(resp => resp.json())
            .then(data => setCategories(data))
    }, [])

    useEffect(() => {
        fetch(`${baseURL}/users`)
            .then(resp => resp.json())
            .then(data => setUsers(data))
    }, [setUsers, allTasks])

    function addTask(formData) {
        const configObj = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                ...formData,
                category_id: parseInt(formData.category_id),
                user_id: parseInt(currentUser)
            })
        }
        fetch(`${baseURL}/tasks`, configObj)
            .then(resp => resp.json())
            .then(newTask => {
                setAllTasks([...allTasks, newTask])
            })
    }

    function deleteTask(id) {
        fetch(`${baseURL}/tasks/${id}`, {method:"DELETE"})
            .then(resp => resp.json())
            .then(data => {
                const updatedTasks = allTasks.filter(task => task.id !== id)
                setAllTasks(updatedTasks)
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

    const userTasks = allTasks.filter(task => task.user_id === parseInt(currentUser))
    const filteredTasks = userTasks.filter(task => categoryFilter ===  "All" || task.category_id === parseInt(categoryFilter))
    const taskComponents = filteredTasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} />)

    return (
        <div>
            <NewTaskForm options={options} addTask={addTask} />
            <NewCategoryForm options={options} addCategory={addCategory} deleteCategory={deleteCategory} />
            {currentUser === "none" ? 
            (<p>Please select your username to view tasks</p>) : 
            (<div>
                <TaskFilter users={users} userIndex={currentUser} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
                <ul className="TaskContainer">
                    {taskComponents} 
                </ul>
             </div>)}
        </div>
    )
}

export default  TaskContainer