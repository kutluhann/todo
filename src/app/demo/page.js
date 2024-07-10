import TodoArea from "@/components/demo/TodoArea";
import { generateTodoDays } from "@/utils";
import mockTodos from "./mock-todos";

export default async function DemoPage() {
  const days = generateTodoDays()

  return (
    <TodoArea days={days} mockTodos={mockTodos} />
  );
}
