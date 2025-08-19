import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/lib/utils";
import { getOverdueTodos, getTodos } from "@/actions";
import { cookies } from "next/headers";
import { checkToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TodoPage(deneme) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value
  const isTokenValid = await checkToken(token)

  if (!isTokenValid) {
    redirect("/")
  }

  const days = generateTodoDays()
  const todos = await getTodos()
  const overdueTodos = await getOverdueTodos()

  return (
    <TodoArea days={days} todos={todos} overdueTodos={overdueTodos} />
  );
}