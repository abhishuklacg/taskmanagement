import React from "react";
import "./App.css";
import { TaskProvider } from "./Context/TaskContext"; 
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTask";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div style={{ padding: "20px" }}>
        <h1>Task Management</h1>
        <AddTaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
