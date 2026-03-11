import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskProvider } from "./Provider/TaskContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
    <Toaster position="top-right" />
  </StrictMode>,
);
