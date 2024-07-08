import TodoArea from "@/components/TodoArea";
import { generateTodoDays } from "@/app/utils";

export default function Home() {
  const days = generateTodoDays()

  console.log(days)

  return (
    <TodoArea days={days} />
  );
}
