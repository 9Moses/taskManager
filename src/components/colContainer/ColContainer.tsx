import { useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../../Types/types";
import { DeleteIcon, PlusIcon } from "../../icons";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskCard from "../taskCard/TaskCard";

interface Props {
  columns: Column;
  deleteCol: (id: Id) => void;
  updateColum: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  task: Task[];
}

export default function ColContainer(props: Props) {
  const {
    columns,
    deleteCol,
    updateColum,
    createTask,
    task,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columns.id,
    data: {
      type: "Column",
      columns,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor opacity-40 border-2 border-blue-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-2 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>

          {!editMode && columns.title}
          {editMode && (
            <input
              className="bg-black focus:border-blue-500 border rounded outline-none px-2"
              value={columns.title}
              onChange={(e) => updateColum(columns.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteCol(columns.id)}
          className="hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {task.map((tasks) => (
          <TaskCard
            key={tasks.id}
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2
       rounded-md p-4 border-x-columnBackgroundColor 
      hover:bg-mainBackgroundColor hover:text-blue-500 active:bg-black"
        onClick={() => createTask(columns.id)}
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
}
