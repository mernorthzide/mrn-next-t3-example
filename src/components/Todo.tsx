import type { Todo } from "../types";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, text, done } = todo;

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50"
            type="checkbox"
            name="done"
            id="done"
            checked={done}
          />
          <label htmlFor="done" className="cursor-pointer">
            {text}
          </label>
        </div>
        <button className="rounded bg-blue-700 px-4 py-1 text-white hover:bg-blue-800 focus:right-4 focus:outline-none">
          Delete
        </button>
      </div>
    </>
  );
}
