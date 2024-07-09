"use client"

import TodoItem from "@/components/TodoItem"
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useOptimistic, useRef } from "react";
import { addTodo, updateTodos } from "@/actions";
import { formatDate, isSameDay } from "@/utils";

export default function DayCard({ day, todos, overdueTodos }) {
  console.log(todos)
  const ref = useRef(null)
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (state, callback) => {
    return callback(state)
  })
  const [optimisticOverdueTodos, setOptimisticOverdueTodos] = useOptimistic(overdueTodos, (state, callback) => {
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

  const handlePostponeOverdueTodos = async () => {
    const updatedTodos = [
      ...overdueTodos.map(todo => ({...todo, isOverdue: false, date: day.date})),
      ...todos,
    ]

    setOptimisticTodos(() => [...updatedTodos])
    setOptimisticOverdueTodos(() => [])

    await updateTodos(updatedTodos)
  }

  return (
    <div className=" relative select-none bg-white rounded-md flex flex-col items-center gap-2 px-4 py-2 shadow-xl has-[.dragging-over]:shadow-2xl">
      <p className="deneme font-semibold text-lg">{ day.name }</p>
      <span className="absolute text-xs top-2 right-2">{ formatDate(day.date) }</span>
      <div className="overflow-scroll h-full w-full flex flex-col">
        {isSameDay(new Date(), day.date) && optimisticOverdueTodos.length > 0 && (
          <div className="w-full mb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-600 underline">Overdue</span>
              <span 
                onClick={handlePostponeOverdueTodos}
                className="text-sm font-semibold text-gray-600 hover:text-black cursor-pointer"
              >
                Postpone
              </span>
            </div>
            {optimisticOverdueTodos.map(todo => (
              <TodoItem 
                todo={todo} 
                key={todo._id} 
                setOptimisticOverdueTodos={setOptimisticOverdueTodos} 
              />
            ))}
            <hr />
          </div>
        )}
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
            <span className="text-sm font-semibold text-gray-600 underline">Completed</span>
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