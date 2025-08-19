"use client"

import TodoItem from "@/components/demo/TodoItem"
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useRef } from "react";
import { formatDate } from "@/lib/utils";

export default function DayCard({ day, mockTodoList, setTodos }) {
  const ref = useRef(null)

  const handleAddTodo = async (formData) => {
    const newTodoText = formData.get("new-todo-text")

    if (!newTodoText) return

    ref.current?.reset()

    const todo = {
      text: newTodoText,
      date: day.date,
    }

    setTodos((state) => [
      ...state,
      { ...todo, id: Math.floor(Math.random() * 100000) + "" }
    ])
  }

  return (
    <div className="select-none bg-white rounded-md flex flex-col items-center gap-2 px-4 py-2 shadow-xl has-[.dragging-over]:shadow-2xl">
      <div className="flex flex-col items-center">
        <span className="text-xs -mb-1">{ formatDate(day.date) }</span>
        <p className="font-semibold">{ day.name }</p>
      </div>
      <div className="overflow-scroll h-full w-full flex flex-col">
        <Droppable droppableId={day.name}>
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${snapshot.isDraggingOver ? "dragging-over" : ""} w-full flex-1`}
            >
              {(mockTodoList.filter(todo => !todo.isCompleted).length === 0 
                && mockTodoList.filter(todo => todo.isCompleted).length > 0) ? (
                <span className="text-sm">You've completed all of them!</span>
              ) : mockTodoList.filter(todo => !todo.isCompleted).map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <TodoItem
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      todo={todo} 
                      key={todo.id} 
                      setTodos={setTodos} 
                    />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="w-full">
          {mockTodoList.filter(todo => todo.isCompleted).length > 0 && (
            <span className="text-sm font-semibold text-gray-600 underline">Completed</span>
          )}
          {mockTodoList.filter(todo => todo.isCompleted).map((todo, index) => (
            <TodoItem 
              todo={todo} 
              key={todo.id} 
              setTodos={setTodos} 
            />
          ))}
        </div>
      </div>
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