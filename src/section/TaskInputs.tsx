import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { COLUMN_TAG, type Note } from "../Provider/TaskContext";
import toast from "react-hot-toast";

export default function TaskInputs() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { addTask } = useTasks();

  const handleSubmit = (): void => {
    if (loading) return;
    if (!title.trim() || !desc.trim()) return;
    setLoading(true);
    const note: Note = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      column: COLUMN_TAG.TODO,
    };
    addTask(note);
    setTitle("");
    setDesc("");
    setTimeout(() => {
      setLoading(false);
    }, 300);
    toast.success("Task added successfully.");
  };

  return (
    <>
      <div className="text-center mb-14">
        <h1 className=" text-black/80 font-light text-4xl">Add Tasks</h1>
      </div>
      {/* Form */}
      <div className={`w-full max-w-lg mx-auto`}>
        {/* Title */}
        <div className="mb-7">
          <label className=" text-black/80 text-xs font-medium tracking-widest uppercase block mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Give it a name…"
            className="w-full bg-mauve-50 px-2 border-b border-black/20 focus:border-amber-600 text-sm py-2 outline-none transition-colors duration-300 placeholder:text-black/50"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="text-black/80 font-medium text-xs tracking-widest uppercase block mb-2">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="What's on your mind…"
            rows={4}
            className="w-full bg-mauve-50 border-b border-black/20 focus:border-amber-600 text-sm py-2 px-2 outline-none transition-colors duration-300 placeholder:text-black/50 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            disabled={loading || !title.trim() || !desc.trim()}
            onClick={handleSubmit}
            className="text-xs disabled:opacity-50 disabled:cursor-not-allowed! tracking-widest uppercase bg-amber-600 hover:bg-amber-500 active:scale-95 text-stone-950 px-8 py-3 transition-all duration-200"
          >
            {loading ? "Adding..." : "Save Task"}
          </button>
        </div>
      </div>
    </>
  );
}
