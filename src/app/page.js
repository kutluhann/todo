import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/utils";
import { connectDB, Todo } from "@/db";
import { getTodos } from "@/actions";

export default async function Home() {
  connectDB()
  const days = generateTodoDays()
  const todos = await getTodos()

  return (
    <TodoArea days={days} todos={todos} />
  );
}
