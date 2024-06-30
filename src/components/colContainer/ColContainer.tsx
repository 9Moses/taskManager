import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "../../Types/types";
import { DeleteIcon } from "../../icons";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  columns: Column;
  deleteCol: (id: Id) => void;
}

export default function ColContainer(props: Props) {
  const { columns, deleteCol } = props;

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: columns.id,
      data: {
        type: "Column",
        columns,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-2 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {columns.title}
        </div>
        <button
          onClick={() => deleteCol(columns.id)}
          className="hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}
