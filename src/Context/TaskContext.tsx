import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";

export interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  category: string;
}

export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  addTask: (title: string, description: string, category: string) => void;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
  searchByCategory: (category: string) => void;
  resetSearch: () => void;
}

const initialTasks  = [
  {
    "id": 1,
    "category": "Shopping",
    "title": "Shopping",
    "status": "pending",
    "description": "Get essentials from Trader Joe's"
  },
  {
    "id": 2,
    "category": "Shopping",
    "title": "Shoes",
    "status": "pending",
    "description": "Purchase running shoes"
  },
  {
    "id": 3,
    "category": "Work",
    "title": "Presentation",
    "status": "pending",
    "description": "Create slides for team meeting"
  },
  {
    "id": 4,
    "category": "Work",
    "title": "Review",
    "status": "pending",
    "description": "Review frontend team's pull request"
  },
  {
    "id": 5,
    "category": "Home",
    "title": "Garage",
    "status": "pending",
    "description": "Organize tools and discard unnecessary items"
  },
  {
    "id": 6,
    "category": "Home",
    "title": "Plants",
    "status": "pending",
    "description": "Water indoor and outdoor plants"
  },
  {
    "id": 7,
    "category": "Health",
    "title": "Exercise",
    "status": "pending",
    "description": "Complete 30-minute yoga session"
  },
  {
    "id": 8,
    "category": "Health",
    "title": "Appointment",
    "status": "pending",
    "description": "Visit dentist for routine check-up"
  }
]

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(initialTasks);
    setFilteredTasks(initialTasks); 
  }, []);

  const addTask = (title: string, description: string, category: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      category,
      status: "pending"
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const toggleDone = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "pending" ? "done" : "pending" } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); 
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); 
  };

  const searchByCategory = (category: string) => {
    const filtered = tasks.filter((task) => task.category.toLowerCase() === category.toLowerCase());
    setFilteredTasks(filtered);
  };

  const resetSearch = () => {
    setFilteredTasks(tasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, filteredTasks, addTask, deleteTask, toggleDone, searchByCategory, resetSearch }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
