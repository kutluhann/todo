"use client"

import DayCard from "@/components/DayCard";
import { DragDropContext } from '@hello-pangea/dnd';
import { useState } from "react";

export default function Home() {
  const [days, setDays] = useState([
    "Monday (Today)",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Next Monday",
  ])
  const [todos, setTodos] = useState([
    {
      text: "Todo 1",
      checked: false,
      id: "12",
      day: "Monday (Today)",
    },
    {
      text: "Todo 2",
      checked: false,
      id: "13",
      day: "Monday (Today)",
    },
    {
      text: "Todo 3",
      checked: false,
      id: "14",
      day: "Tuesday",
    },
    {
      text: "Todo 4",
      checked: false,
      id: "15",
      day: "Tuesday",
    },
  ])

  const onDragEnd = (result) => {
    console.log(result)
    const { destination, source, draggableId } = result

    if (!destination) return

    const todo = todos.find(todo => todo.id === draggableId)
    const todosInDestinationDay = todos.filter(todo => todo.day === destination.droppableId && todo.id !== draggableId)
    const todosInDifferentDays = todos.filter(todo => todo.day !== destination.droppableId && todo.id !== draggableId)

    if (destination.droppableId !== source.droppableId) todo.day = destination.droppableId

    setTodos([
      ...todosInDifferentDays,
      ...todosInDestinationDay.slice(0, destination.index),
      todo,
      ...todosInDestinationDay.slice(destination.index)
    ])
  }

  return (
    <div className="h-full p-3 flex justify-center items-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  sm:grid-rows-4 lg:grid-rows-2 *:w-full *:h-full gap-3">
          {days.map(day => {
            const list = todos.filter(todo => todo.day == day)
            return (
              <DayCard key={day} day={day} todos={list} setTodos={setTodos} />
            )
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
