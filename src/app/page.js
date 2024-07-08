import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/utils";
import { connectDB, Todo } from "@/db";

export default async function Home() {
  connectDB()
  const days = generateTodoDays()

  return (
    <TodoArea days={days} />
  );
}
