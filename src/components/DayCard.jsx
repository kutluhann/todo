"use client"

import TodoItem from "@/components/TodoItem"
import { Droppable } from '@hello-pangea/dnd';
import { useState } from "react";

export default function DayCard({ day, todos, setTodos }) {
  const [newTodo, setNewTodo] = useState("")

  const addTodo = (e) => {
    e.preventDefault()

    setTodos(oldTodos => [...oldTodos, {
      text: newTodo,
      id: Math.floor(Math.random() * 10000) + "",
      checked: false,
      day
    }])

    setNewTodo("")
  }

  return (
    <div className="bg-white rounded-md flex flex-col items-center gap-2 px-4 py-2 shadow-xl has-[.dragging-over]:border-2 border-black">
      <p className="deneme font-semibold text-lg">{day}</p>
      <Droppable droppableId={day}>
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${snapshot.isDraggingOver ? "dragging-over" : ""} w-full h-full`}
          >
            {todos.map((todo, index) => (
              <TodoItem todo={todo} key={todo.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form className="w-full" onSubmit={addTodo}>
        <input 
          type="text" 
          className="w-full h-10 border-none focus:outline-none" 
          placeholder="Add"
          value={newTodo}
          onInput={e => setNewTodo(e.target.value)}
        />
      </form>
    </div>
  )
}