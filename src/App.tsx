import React from "react";
import "./App.css";
import { TaskProvider } from "./Context/TaskContext"; 
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
};

export default App;
