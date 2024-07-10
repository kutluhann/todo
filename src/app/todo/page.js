import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/utils";
import { connectDB } from "@/db";
import { getOverdueTodos, getTodos } from "@/actions";
import { cookies } from "next/headers";
import { checkToken } from "@/auth";
import { redirect } from "next/navigation";

export default async function TodoPage(deneme) {
  const token = cookies().get("session")?.value
  const isTokenValid = await checkToken(token)

  if (!isTokenValid) {
    redirect("/")
  }

  connectDB()
  const days = generateTodoDays()
  const todos = await getTodos()
  const overdueTodos = await getOverdueTodos()

  return (
    <TodoArea days={days} todos={todos} overdueTodos={overdueTodos} />
  );
}
