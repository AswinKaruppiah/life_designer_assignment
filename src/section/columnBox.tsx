import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";
import { useTasks } from "../hooks/useTasks";
import { COLUMN_TAG, type ColumnTag, type Note } from "../Provider/TaskContext";

export default function ColumnBox() {
  const { tasks } = useTasks();
  const { moveTask } = useTasks();

  function handleDragEnd(event: any) {
    if (event.canceled) return;

    const { source, target } = event.operation;

    const task = source?.data?.task as Note;
    const targetColumn = target?.id as ColumnTag;

    if (!task || !targetColumn) return;

    if (task.column !== targetColumn) {
      moveTask(task, targetColumn);
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="gap-6 grid grid-cols-3 p-6">
        {/* TODO */}
        <ColumnCard
          data={tasks.todo}
          columnType={COLUMN_TAG.TODO}
          title="To Do"
        />

        {/* IN PROGRESS */}
        <ColumnCard
          data={tasks.inProgress}
          columnType={COLUMN_TAG.IN_PROGRESS}
          title="In Progress"
        />

        {/* DONE */}
        <ColumnCard
          data={tasks.done}
          columnType={COLUMN_TAG.DONE}
          title="Done"
        />
      </div>
    </DragDropProvider>
  );
}

type ColumnCardProps = {
  data: Note[];
  columnType: ColumnTag;
  title: string;
};

const ColumnCard = ({ data, columnType, title }: ColumnCardProps) => {
  const { ref } = useDroppable({
    id: columnType,
  });

  return (
    <div ref={ref} className="bg-gray-50 p-4 min-h-screen h-fit rounded">
      <h2 className="font-bold mb-6">{title}</h2>
      {data.length ? (
        data.map((task) => (
          <TaskCard key={task.id} task={task} column={columnType} />
        ))
      ) : (
        <h3 className="text-2xl text-center my-4">No tasks in this column</h3>
      )}
    </div>
  );
};

type TaskCardProps = {
  task: Note;
  column: ColumnTag;
};

const TaskCard = ({ task, column }: TaskCardProps) => {
  const { deleteTask, moveTask } = useTasks();
  const { ref, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  return (
    <div
      ref={ref}
      key={task.id}
      className={`bg-white min-h-40 flex flex-col justify-between ${isDragging ? "shadow-amber-200 shadow-lg" : ""} hover:shadow-amber-200 hover:shadow-lg transition-all p-3 cursor-grab rounded shadow mb-3`}
    >
      <div className="flex justify-between items-start gap-1.5">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-black/50 mt-1.5 text-balance">{task.desc}</p>
        </div>
        <button
          className="text-red-500"
          onClick={() => deleteTask(task.id, task.column)}
        >
          Delete
        </button>
      </div>

      <div className="flex gap-2 mt-4 text-sm">
        {column != COLUMN_TAG.TODO && (
          <button
            onClick={() => moveTask(task, COLUMN_TAG.TODO)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Move to Todo
          </button>
        )}
        {column != COLUMN_TAG.IN_PROGRESS && (
          <button
            onClick={() => moveTask(task, COLUMN_TAG.IN_PROGRESS)}
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Move to Progress
          </button>
        )}
        {column != COLUMN_TAG.DONE && (
          <button
            onClick={() => moveTask(task, COLUMN_TAG.DONE)}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Move to Done
          </button>
        )}
      </div>
    </div>
  );
};
