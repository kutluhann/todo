"use client"

import DayCard from "@/components/demo/DayCard";
import { DragDropContext } from '@hello-pangea/dnd';
import { isSameDay } from "@/utils";
import { useState } from "react";

export default function TodoArea({ days, mockTodos }) {
  const [todos, setTodos] = useState(mockTodos)

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    const day = days.find(day => day.name === destination.droppableId)
    const todo = todos.find(todo => todo._id === draggableId)
    const todosInDestinationDay = todos.filter(todo => isSameDay(todo.date, day.date) && todo._id !== draggableId && !todo.done)
    const todosInDifferentDays = todos.filter(todo => !isSameDay(todo.date, day.date) && todo._id !== draggableId && !todo.done)
    const completedTodos = todos.filter(todo => todo.done)

    if (destination.droppableId !== source.droppableId) todo.date = day.date

    setTodos([
      ...todosInDifferentDays,
      ...todosInDestinationDay.slice(0, destination.index),
      todo,
      ...todosInDestinationDay.slice(destination.index),
      ...completedTodos,
    ])
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-full w-full p-3 justify-center items-center grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 *:w-full *:h-full gap-3">
        {days.map(day => {
          const mockTodoList = todos.filter(todo => isSameDay(todo.date, day.date))

          return (
            <DayCard key={day.name} day={day} mockTodoList={mockTodoList} setTodos={setTodos} />
          )
        })}
      </div>
    </DragDropContext>
  );
}
