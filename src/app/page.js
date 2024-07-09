import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/utils";
import { connectDB } from "@/db";
import { getOverdueTodos, getTodos } from "@/actions";

export default async function Home() {
  connectDB()
  const days = generateTodoDays()
  const todos = await getTodos()
  const overdueTodos = await getOverdueTodos()

  return (
    <TodoArea days={days} todos={todos} overdueTodos={overdueTodos} />
  );
}
