import { useState } from "react";
import { toast } from "react-hot-toast";
import { todoInput } from "~/types";
import { api } from "~/utils/api";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState("");

  const trpc = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    onMutate: (newTodo) => {
      console.log(
        "🚀 ~ file: CreateTodo.tsx:14 ~ onMutate: ~ newTodo:",
        newTodo
      );
    },
    onError: (error, newTodo, context) => {
      console.log(
        "🚀 ~ file: CreateTodo.tsx:18 ~ onError: ~ error, newTodo, context",
        error,
        newTodo,
        context
      );

      toast.error(error.message);
    },
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const result = todoInput.safeParse(newTodo);

          if (!result.success) {
            console.log("not valid");
            toast.error(result.error.format()._errors.join("\n"));
            return;
          }

          // Create todo
          mutate(newTodo);
        }}
        className="flex gap-2"
      >
        <input
          className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-black"
          placeholder="New Todo..."
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="rounded bg-blue-700 px-4 py-1 text-white hover:bg-blue-800 focus:right-4 focus:outline-none">
          Create
        </button>
      </form>
    </>
  );
}
