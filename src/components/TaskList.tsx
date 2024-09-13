import React from "react";
import { useTaskContext } from "../Context/TaskContext";
import TaskComponent from "./TaskComponent";

const TaskList: React.FC = () => {
  const { filteredTasks, toggleDone, deleteTask } = useTaskContext();

  return (
    <div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            deleteTask={(id: number) => deleteTask(id)}
            toggleDone={(id: number) => toggleDone(id)}
          />
        ))
      ) : (
        <div>No tasks found</div>
      )}
    </div>
  );
};

export default TaskList;
