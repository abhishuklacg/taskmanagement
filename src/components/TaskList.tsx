import React from "react";
import { useTaskContext } from "../Context/TaskContext";
import TaskComponent from "./TaskComponent";

const TaskList: React.FC = () => {
  const { tasks, toggleDone, deleteTask } = useTaskContext();

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      {tasks.map((task, index) => (
        <TaskComponent
          key={index}
          task={task}
          deleteTask={(id: number) => deleteTask(id)}
          toggleDone={(id: number) => toggleDone(id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
