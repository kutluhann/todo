"use client"

import { Draggable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';
import { deleteTodo } from '@/actions';
import { useTransition } from 'react';

export default function TodoItem({ todo, index, setOptimisticTodos }) {
  const [pending, startTransition] = useTransition()
  
  const handleTodoDelete = async () => {
    startTransition(() => setOptimisticTodos((state) => state.filter(t => t._id !== todo._id)))
    await deleteTodo(todo._id)
  }

  return (
    <Draggable key={todo._id} draggableId={todo._id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-center"
        >
          <div className="flex gap-2 flex-1">
            <input type="checkbox" />
            <p>{ todo.text }</p>
          </div>
          <div className='group h-6 w-6 flex items-center justify-center'>
            <Trash2 onClick={handleTodoDelete} className="text-red-500 hidden group-hover:block cursor-pointer" size={16} />
          </div>
        </div>
      )}
    </Draggable>
  )
}