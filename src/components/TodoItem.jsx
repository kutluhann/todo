"use client"

import { Trash2 } from 'lucide-react';
import { deleteTodo, changeStateOfTodo } from '@/actions';
import { useTransition } from 'react';

export default function TodoItem({ todo, setOptimisticTodos, setOptimisticOverdueTodos, innerRef, draggableProps, dragHandleProps }) {
  const [pending, startTransition] = useTransition()

  const handleTodoDelete = async () => {
    if (todo.isOverdue) {
      startTransition(() => setOptimisticOverdueTodos((state) => state.filter(t => t._id !== todo._id)))
    } else {
      startTransition(() => setOptimisticTodos((state) => state.filter(t => t._id !== todo._id)))
    }

    await deleteTodo(todo._id)
  }

  const handleTodoChecked = async (e) => {
    startTransition(() => {
      setOptimisticTodos((state) => {
        const index = state.findIndex(t => t._id === todo._id)
        state[index] = { ...state[index], done: e.target.checked }
  
        return [...state]
      })
    })

    await changeStateOfTodo(todo._id, e.target.checked)
  }

  return (
    <div 
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="flex items-center"
    >
      <div className="flex gap-2 flex-1">
        <input disabled={todo.isOverdue} defaultChecked={todo.done} type="checkbox" onChange={(e) => handleTodoChecked(e)} className="bg-black" />
        <p className={`${todo.done ? "line-through": ""} break-all`} >{ todo.text }</p>
      </div>
      <div className='group h-6 w-6 flex items-center justify-center'>
        <Trash2 onClick={handleTodoDelete} className="text-red-500 hidden group-hover:block cursor-pointer" size={16} />
      </div>
    </div>
  )
}