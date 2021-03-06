import React, {useState, useEffect} from 'react'
import NewCategoryForm from './NewCategoryForm'
import NewTaskForm from './NewTaskForm'
import NewUserForm from './NewUserForm'
import Task from './Task'
import TaskFilter from './TaskFilter'

function TaskContainer({baseURL, setUsers, users, currentUser}) {
    const [allTasks, setAllTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryFilter, setCategoryFilter] = useState("Default")
    const [showImportant, setShowImportant] = useState(false)
    const options = categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)

    useEffect(() => {
        fetch(`${baseURL}/tasks`)
            .then(resp => resp.json())
            .then(data => setAllTasks(data))
    },[baseURL])

    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then(resp => resp.json())
            .then(data => setCategories(data))
    }, [baseURL])

    useEffect(() => {
        fetch(`${baseURL}/users`)
            .then(resp => resp.json())
            .then(data => setUsers(data))
    }, [baseURL, setUsers, allTasks])

    function addTask(formData) {
        const configObj = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                ...formData,
                category_id: parseInt(formData.category_id),
                user_id: parseInt(currentUser),
                important: false,
                completed: false
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

    function toggleImportant(task) {
        const configObj = {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                important: !task.important
            })
        }
        fetch(`${baseURL}/tasks/${task.id}`, configObj)
            .then(resp => resp.json())
            .then(newTask => {
                const updatedTasks = allTasks.map(task => {
                    if (task.id === newTask.id) {
                        return newTask
                    } else {
                        return task
                    }
                })
                setAllTasks(updatedTasks)
            })
    }

    function toggleCompleted(task) {
        const configObj = {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                completed: !task.completed
            })
        }
        fetch(`${baseURL}/tasks/${task.id}`, configObj)
            .then(resp => resp.json())
            .then(newTask => {
                const updatedTasks = allTasks.map(task => {
                    if (task.id === newTask.id) {
                        return newTask
                    } else {
                        return task
                    }
                })
                setAllTasks(updatedTasks)
            })
    }

    function toggleFilter() {
        setShowImportant(!showImportant)
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

    function addUser(name) {
        const configObj = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name: name
            })
        }
        fetch(`${baseURL}/users`, configObj)
            .then(resp => resp.json())
            .then(newUser => {
                setUsers([...users, newUser])
            })
    }

    const userTasks = allTasks.filter(task => task.user_id === parseInt(currentUser))
    const importantTasks = userTasks.filter(task => task.important)
    const filteredTasks = userTasks.filter(task => categoryFilter ===  "Default" || categoryFilter === "All" ||
        task.category_id === parseInt(categoryFilter))

    const taskComponents = showImportant ? 
        (importantTasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} toggleImportant={toggleImportant} toggleCompleted={toggleCompleted} />)) :
        (filteredTasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} toggleImportant={toggleImportant} toggleCompleted={toggleCompleted} />))
        
    const importantButton = importantTasks.length === 0 ? 
        null: <button onClick={toggleFilter}>{showImportant ? "Show all tasks" : "Show important tasks"}</button>

    return (
        <div>
            <NewTaskForm options={options} addTask={addTask} />
            <NewCategoryForm options={options} addCategory={addCategory} deleteCategory={deleteCategory} />
            {currentUser === "none" ? 
            (<div>
                <p>Please select your username from above to view tasks</p>
                <NewUserForm addUser={addUser} />
             </div>) : 
            (<div>
                <TaskFilter users={users} userIndex={currentUser} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
                {importantButton}
                <ul className="TaskContainer">
                    {taskComponents} 
                </ul>
             </div>)}
        </div>
    )
}

export default  TaskContainer