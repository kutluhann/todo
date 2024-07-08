"use client"

import { Draggable } from '@hello-pangea/dnd';

export default function TodoItem({ todo, index }) {
  return (
    <Draggable key={todo._id} draggableId={todo._id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex gap-2"
        >
          <input type="checkbox" />
          <p>{ todo.text }</p>
        </div>
      )}
    </Draggable>
  )
}