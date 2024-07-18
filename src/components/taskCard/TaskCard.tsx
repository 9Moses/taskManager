import { useState } from "react";
import { Id, Task } from "../../Types/types";
import { DeleteIcon } from "../../icons";

interface Props {
  tasks: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ tasks, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditeMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left
   rounded-xl hover:ring-2 hover:ring-insert 
   hover:ring-blue-700 cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={tasks.content}
          autoFocus
          placeholder="Task Content Here"
          onBlur={toggleEditeMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleEditeMode();
            }
          }}
          onChange={(e) => updateTask(tasks.id, e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      onClick={toggleEditeMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left
     rounded-xl hover:ring-2 hover:ring-insert 
     hover:ring-blue-700 cursor-grab relative"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {tasks.content}
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(tasks.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
