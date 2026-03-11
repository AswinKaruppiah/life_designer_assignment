import { createContext, useState, useEffect, type ReactNode } from "react";

export const COLUMN_TAG = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
} as const;

export type ColumnTag = (typeof COLUMN_TAG)[keyof typeof COLUMN_TAG];

export interface Note {
  id: number;
  title: string;
  desc: string;
  column: ColumnTag;
}

interface Tasks {
  todo: Note[];
  inProgress: Note[];
  done: Note[];
}

interface TaskContextType {
  tasks: Tasks;
  addTask: (task: Note) => void;
  moveTask: (task: Note, target: Note["column"]) => void;
  deleteTask: (id: number, column: Note["column"]) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

const LOCAL_STORAGE_KEY = "test_tasks";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    return {
      todo: [],
      inProgress: [],
      done: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Note) => {
    setTasks((prev) => ({
      ...prev,
      todo: [task, ...prev.todo],
    }));
  };

  const moveTask = (task: Note, target: Note["column"]) => {
    setTasks((prev) => {
      const updated = { ...prev };

      updated[task.column] = updated[task.column].filter(
        (t) => t.id !== task.id,
      );

      const movedTask = { ...task, column: target };
      updated[target] = [movedTask, ...updated[target]];

      return updated;
    });
  };

  const deleteTask = (id: number, column: Note["column"]) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, moveTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
