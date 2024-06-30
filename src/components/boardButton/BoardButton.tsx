import { useMemo, useState } from "react";
import { PlusIcon } from "../../icons";
import { Column, Id } from "../../Types/types";
import ColContainer from "../colContainer/ColContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export const BoardView = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const addColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteCol = (id: Id) => {
    const filterColumn = columns.filter((col) => col.id !== id);
    setColumns(filterColumn);
  };

  return (
    <div className="m-auto flex min-h-screen items-center overflow-x-auto overflow-y-auto px-[40px]">
      <DndContext>
        <div className="mx-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColContainer
                  key={col.id}
                  columns={col}
                  deleteCol={deleteCol}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={addColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex items-center gap-4"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );
};
