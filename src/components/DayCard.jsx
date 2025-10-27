"use client"

import TodoItem from "@/components/TodoItem"
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useOptimistic, useRef, useTransition } from "react";
import { addTodo, updateTodos } from "@/actions";
import { formatDate, isSameDay } from "@/lib/utils";

export default function DayCard({ day, todoList, overdueTodos, isBlurred }) {
  const ref = useRef(null)

  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todoList, (state, callback) => {
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
      date: day.date,
    }

    startTransition(() => {
      setOptimisticTodos((state) => [
        ...state,
        { ...todo, id: Math.floor(Math.random() * 100000) + "" }
      ])
    })

    await addTodo(todo)
  }

  const handlePostponeOverdueTodos = async () => {
    const updatedTodos = [
      ...overdueTodos.map(todo => ({...todo, isOverdue: false, date: day.date})),
      ...todoList,
    ]

    startTransition(() => {
      setOptimisticTodos(() => [...updatedTodos])
      setOptimisticOverdueTodos(() => [])
    })

    await updateTodos(updatedTodos)
  }

  return (
    <div className="h-full select-none bg-white rounded-md flex flex-col items-center px-4 py-2 shadow-xl has-[.dragging-over]:shadow-2xl">
      <div className="flex flex-col items-center mb-2">
        <span className="text-xs -mb-1">{ formatDate(day.date) }</span>
        <p className="font-semibold">{ day.name }</p>
      </div>
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
                key={todo.id} 
                setOptimisticOverdueTodos={setOptimisticOverdueTodos}
                isBlurred={isBlurred}
              />
            ))}
            <hr />
          </div>
        )}
        <Droppable droppableId={day.date}>
          {(provided, snapshot) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${snapshot.isDraggingOver ? "dragging-over" : ""} w-full min-h-1 flex-1`}
            >
              {(optimisticTodos.filter(todo => !todo.isCompleted).length === 0 
                && optimisticTodos.filter(todo => todo.isCompleted).length > 0) ? (
                <span className="text-sm">You've completed all of them!</span>
              ) : optimisticTodos.filter(todo => !todo.isCompleted).map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <TodoItem
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      todo={todo} 
                      key={todo.id} 
                      setOptimisticTodos={setOptimisticTodos}
                      isBlurred={isBlurred}
                    />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="w-full">
        {optimisticTodos.filter(todo => todo.isCompleted).length > 0 && (
          <span className="text-sm font-semibold text-gray-600 underline">Completed</span>
        )}
        {optimisticTodos.filter(todo => todo.isCompleted).map((todo, index) => (
          <TodoItem 
            todo={todo} 
            key={todo.id} 
            setOptimisticTodos={setOptimisticTodos}
            isBlurred={isBlurred}
          />
        ))}
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