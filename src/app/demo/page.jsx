import TodoArea from "@/components/demo/TodoArea";
import { generateTodoDays } from "@/lib/utils";
import mockTodos from "./mock-todos";

export const revalidate = 21600

export default async function DemoPage() {
  const days = generateTodoDays()

  return (
    <TodoArea days={days} mockTodos={mockTodos} />
  );
}