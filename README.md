# Life Designer Assignment – Kanban Task Board

## Objective

Build a simple **Kanban-style task board** to manage tasks across different stages.

---

## Live Demo

**Live Link:**
`https://life-designer-assignment.vercel.app/`

---

## Features

- Create tasks with **title** and **description**
- **Drag and drop** tasks between columns
- **Delete tasks**
- Tasks are saved in **localStorage**

---

## Tech Stack

- **React 18 + TypeScript**
- **Tailwind CSS**
- **React Context API**
- **dnd-kit** (drag & drop)

---

## Columns

- **To Do**
- **In Progress**
- **Done**

---

## How It Works

### Task Creation

Users can create tasks with a **title** and **description**.
New tasks are initially added to the **To Do** column.

### Drag & Drop

Tasks can be moved **directly between any columns** (To Do, In Progress, or Done) using **drag-and-drop** implemented with **dnd-kit**, or by using the **move buttons** available on each task.

### State Management

Global state is managed using the **React Context API**, allowing components to access and update tasks.

### Data Persistence

All tasks are stored in **localStorage**, ensuring tasks remain available even after refreshing the page.

---

## Demo Video

`Add demo video link here`
