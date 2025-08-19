"use client"

import { Trash2 } from 'lucide-react';

export default function TodoItem({ todo, setTodos, innerRef, draggableProps, dragHandleProps }) {
  const handleTodoDelete = async () => {
    setTodos((state) => state.filter(t => t.id !== todo.id))
  }

  const handleTodoChecked = async (e) => {
    setTodos((state) => {
      const index = state.findIndex(t => t.id === todo.id)
      state[index] = { ...state[index], isCompleted: e.target.checked }

      return [...state]
    })
  }

  return (
    <div 
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="flex items-center"
    >
      <div className="flex gap-2 flex-1">
        <input disabled={todo.isOverdue} defaultChecked={todo.isCompleted} type="checkbox" onChange={(e) => handleTodoChecked(e)} className="cursor-pointer" />
        <p className={`${todo.isCompleted ? "line-through": ""} break-all`} >{ todo.text }</p>
      </div>
      <div className='group h-6 w-6 flex items-center justify-center'>
        <Trash2 onClick={handleTodoDelete} className="text-red-500 hidden group-hover:block cursor-pointer" size={16} />
      </div>
    </div>
  )
}