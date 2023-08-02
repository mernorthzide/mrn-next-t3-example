import { api } from "../utils/api";
import Todo from "./Todo";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();

  if (isLoading) return <>Loading todos...</>;
  if (isError) return <>Error fetching todos</>;

  return (
    <>
      {todos.length
        ? todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        : "Create a todo to get started!"}
    </>
  );
}
