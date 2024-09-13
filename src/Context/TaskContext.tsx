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
  addTask: (title: string, description: string, category: string) => void;
  deleteTask: (id: number) => void;
  toggleDone: (id: number) => void;
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


  useEffect(() => {
    if(initialTasks){
      setTasks(initialTasks)
    }
  },[])

  const addTask = (title: string, description: string, category: string) => {
    const newTask: Task = {
      id: tasks.length + 1,  
      title,
      description,
      category,
      status: "pending",  
    };
  
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  

  const toggleDone = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "pending" ? "done" : "pending" } : task
      )
    );
  };
  

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleDone }}>
      {children}
    </TaskContext.Provider>
  );
};



export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Context not intitialised properly.");
  }

  return context;
};