import React from "react";
import { Task } from "../Context/TaskContext";

const TaskComponent: React.FC<{
  task: Task;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
}> = ({ task, deleteTask, toggleDone }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: task.status === "done" ? "#d4edda" : "#f8d7da",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div><strong>{task.title}</strong></div>
        <div>{task.description}</div>
        <div><em>{task.category}</em></div>
      </div>
      <div>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: task.status === "done" ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          onClick={() => toggleDone(task.id)}
        >
          {task.status === "done" ? "Undo" : "Done"}
        </button>
        <button
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;
