import { useMemo, useState } from "react";
import { PlusIcon } from "../../icons";
import { Column, Id, Task } from "../../Types/types";
import ColContainer from "../colContainer/ColContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export const BoardView = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [task, setTask] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColContainer
                  key={col.id}
                  columns={col}
                  deleteCol={deleteCol}
                  updateColum={updateColum}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  task={task.filter((tasks) => tasks.columnId === col.id)}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => addColumn()}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex items-center gap-4"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColContainer
                columns={activeColumn}
                deleteCol={deleteCol}
                updateColum={updateColum}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                task={task.filter(
                  (tasks) => tasks.columnId === activeColumn.id
                )}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function addColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteCol(id: Id) {
    const filterColumn = columns.filter((col) => col.id !== id);
    setColumns(filterColumn);
  }

  function updateColum(id: Id, title: string) {
    const newColunm = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColunm);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${task.length + 1}`,
    };
    setTask([...task, newTask]);
  }

  function deleteTask(id: Id) {
    const newTask = task.filter((tasks) => tasks.id !== id);
    setTask(newTask);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = task.map((tasks) => {
      if (tasks.id !== id) return tasks;
      return { ...tasks, content };
    });

    setTask(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    const column = columns.find((col) => col.id === event.active.id);
    if (column) {
      setActiveColumn(column);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
};
