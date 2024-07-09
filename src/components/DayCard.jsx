"use client"

import TodoItem from "@/components/TodoItem"
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useOptimistic, useRef } from "react";
import { addTodo } from "@/actions";
import { formatDate } from "@/utils";

export default function DayCard({ day, todos }) {
  const ref = useRef(null)
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (state, callback) => {
    return callback(state)
  })

  const handleAddTodo = async (formData) => {
    const newTodoText = formData.get("new-todo-text")

    if (!newTodoText) return

    ref.current?.reset()

    const todo = {
      text: newTodoText,
      date: day.date
    }

    setOptimisticTodos((state) => [
      ...state,
      { ...todo, _id: Math.floor(Math.random() * 100000) + "" }
    ])

    await addTodo(todo)
  }

  return (
    <div className=" relative select-none bg-white rounded-md flex flex-col items-center gap-2 px-4 py-2 shadow-xl has-[.dragging-over]:shadow-2xl">
      <p className="deneme font-semibold text-lg">{ day.name }</p>
      <span className="absolute text-xs top-2 right-2">{ formatDate(day.date) }</span>
      <div className="overflow-scroll h-full w-full flex flex-col">
        <Droppable droppableId={day.name}>
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${snapshot.isDraggingOver ? "dragging-over" : ""} w-full flex-1`}
            >
              {(optimisticTodos.filter(todo => !todo.done).length === 0 
                && optimisticTodos.filter(todo => todo.done).length > 0) ? (
                <span className="text-sm">You've completed all of them!</span>
              ) : optimisticTodos.filter(todo => !todo.done).map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {(provided) => (
                    <TodoItem
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      todo={todo} 
                      key={todo._id} 
                      setOptimisticTodos={setOptimisticTodos} 
                    />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="w-full">
          {optimisticTodos.filter(todo => todo.done).length > 0 && (
            <span className="text-sm font-semibold text-gray-600 underline w-full">Completed</span>

          )}
          {optimisticTodos.filter(todo => todo.done).map((todo, index) => (
            <TodoItem 
              todo={todo} 
              key={todo._id} 
              setOptimisticTodos={setOptimisticTodos} 
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