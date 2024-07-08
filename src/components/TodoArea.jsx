"use client"

import DayCard from "@/components/DayCard";
import { DragDropContext } from '@hello-pangea/dnd';
import { isSameDay, addDaysToDate } from "@/utils";
import { updateTodo } from "@/actions";
import { useOptimistic, useTransition } from "react";

export default function TodoArea({ days, todos }) {
  const [pending, startTransition] = useTransition()
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(todos, (state, updatedTodos) => {
    return [
      ...state.filter(todo => !isSameDay(todo.date, updatedTodos[0].date)),
      ...updatedTodos
    ]
  })

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    const day = days.find(day => day.name === destination.droppableId)
    const todo = todos.find(todo => todo._id === draggableId)
    const todosInDestinationDay = todos.filter(todo => isSameDay(todo.date, day.date) && todo._id !== draggableId)

    if (destination.droppableId !== source.droppableId) todo.date = day.date

    const updatedTodos = [
      ...todosInDestinationDay.slice(0, destination.index),
      todo,
      ...todosInDestinationDay.slice(destination.index)
    ]

    startTransition(() => {
      updateOptimisticTodo(updatedTodos)
    })

    await updateTodo(updatedTodos)
  }

  return (
    <div className="h-full p-3 flex justify-center items-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  sm:grid-rows-4 lg:grid-rows-2 *:w-full *:h-full gap-3">
          {days.map(day => {
            const todoList = optimisticTodos.filter(todo => isSameDay(todo.date, day.date))

            return (
              <DayCard key={day.name} day={day} todos={todoList} />
            )
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
