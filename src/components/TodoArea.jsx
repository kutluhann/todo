"use client"

import DayCard from "@/components/DayCard";
import { DragDropContext } from '@hello-pangea/dnd';
import { isSameDay } from "@/lib/utils";
import { updateTodos } from "@/actions";
import { useOptimistic, useTransition, useState, useEffect } from "react";
import Drawer from "@/components/Drawer";

export default function TodoArea({ days, todos, overdueTodos }) {
  const [pending, startTransition] = useTransition()
  const [isBlurred, setIsBlurred] = useState(true)
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(todos, (state, updatedTodos) => {
    return [
      ...state.filter(todo => !isSameDay(todo.date, updatedTodos[0].date)),
      ...updatedTodos
    ]
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
        event.preventDefault();
        setIsBlurred(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    const date = destination.droppableId
    const todo = todos.find(todo => todo.id === draggableId)
    const todosInDestinationDay = todos.filter(todo => isSameDay(todo.date, date) && todo.id !== draggableId)

    if (destination.droppableId !== source.droppableId) todo.date = date

    const updatedTodos = [
      ...todosInDestinationDay.slice(0, destination.index),
      todo,
      ...todosInDestinationDay.slice(destination.index)
    ]

    startTransition(() => {
      updateOptimisticTodo(updatedTodos)
    })

    await updateTodos(updatedTodos)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-full lg:h-full w-full p-3 justify-center items-center grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 *:w-full *:h-full gap-3">
        {days.map(day => {
          const todoList = optimisticTodos.filter(todo => isSameDay(todo.date, day.date))

          return (
            <DayCard key={day.name} day={day} todoList={todoList} overdueTodos={overdueTodos} isBlurred={isBlurred} />
          )
        })}
      </div>
      <Drawer todos={optimisticTodos} isBlurred={isBlurred} />
    </DragDropContext>
  );
}
