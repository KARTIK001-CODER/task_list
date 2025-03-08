// src/components/TaskForm.jsx
// You need to write the code for TaskForm component in the TaskForm.jsx file.

import { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (response.ok) {
      const newTask = await response.json();
      onTaskAdded(newTask);
      setTask("");
    } else {
      alert("Error adding task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;