"use client"

import TodoItem from "@/components/TodoItem"
import { Droppable } from '@hello-pangea/dnd';
import { useOptimistic, useRef } from "react";
import { addTodo } from "@/actions";
import { addDaysToDate } from "@/utils";

export default function DayCard({ day, todos, setTodos }) {
  const ref = useRef(null)
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo) => {
    return [...state, newTodo]
  })

  const handleAddTodo = async (formData) => {
    const newTodoText = formData.get("new-todo-text")

    if (!newTodoText) return

    ref.current?.reset()

    const todo = {
      text: newTodoText,
      date: addDaysToDate(new Date(), day.daysFromToday)
    }

    addOptimisticTodo({ ...todo, _id: Math.floor(Math.random() * 100000) + "" })

    await addTodo(todo)
  }

  return (
    <div className="bg-white rounded-md flex flex-col items-center gap-2 px-4 py-2 shadow-xl has-[.dragging-over]:shadow-2xl">
      <p className="deneme font-semibold text-lg">{day.name}</p>
      <Droppable droppableId={day.name}>
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${snapshot.isDraggingOver ? "dragging-over" : ""} w-full h-full`}
          >
            {optimisticTodos.map((todo, index) => (
              <TodoItem todo={todo} key={todo._id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form 
        ref={ref}
        className="w-full" 
        action={handleAddTodo}
      >
        <input 
          type="text" 
          className="w-full h-10 border-none focus:outline-none" 
          placeholder="New todo"
          name="new-todo-text"
        />
      </form>
    </div>
  )
}