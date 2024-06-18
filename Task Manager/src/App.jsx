import React, { useState } from 'react';
import './App.css';

function TaskManager() {
  let [tasks, setTasks] = useState([]);
  let [taskInput, setTaskInput] = useState('');
  let [editingIndex, setEditingIndex] = useState(null);
  let [editingInput, setEditingInput] = useState('');

  let addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  let deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  let startEditing = (index) => {
    setEditingIndex(index);
    setEditingInput(tasks[index]);
  };

  let updateTask = () => {
    if (editingInput.trim() !== '') {
      setTasks(tasks.map((task, i) => (i === editingIndex ? editingInput.trim() : task)));
      setEditingIndex(null);
      setEditingInput('');
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingInput}
                  onChange={(e) => setEditingInput(e.target.value)}
                />
                <button className="update" onClick={updateTask}>Update</button>
                <button className="cancel" onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button className="edit" onClick={() => startEditing(index)}>Edit</button>
                <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;