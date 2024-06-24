// src/ToDoList.js
import React, { useState } from "react"
import "./ToDoList.css"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"

const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask])
      setNewTask("")
    }
  }

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <Popup
      className="popup"
      trigger={<button> Trigger</button>}
      position="left top"
    >
      <div className="todo-list">
        <h1>To-Do List</h1>
        <input
          className="todo-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  )
}

export default ToDoList
