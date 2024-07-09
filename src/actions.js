"use server"

import { revalidatePath } from "next/cache"
import { Todo } from "@/db"
import { getStartAndEndOfDay } from "@/utils"

export const getTodos = async () => {
  const todos = await Todo.find().sort({ order: 1 })

  return todos.map(todo => ({...todo._doc, _id: todo._id.toString()}))
}

export const addTodo = async (todoObj) => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(todoObj.date)

  const latestTodo = await Todo.findOne({
    date: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  }).sort({ order: -1 });

  todoObj.order = latestTodo ? latestTodo.order + 1 : 0

  const todo = new Todo(todoObj)
  await todo.save()

  revalidatePath("/")
}

export const updateTodo = async (updatedTodos) => {
  const update = updatedTodos.map((todo, index) => {
    return {
      updateOne: {
        filter: { _id: todo._id },
        update: { order: index, date: todo.date }
      }
    }
  })

  await Todo.bulkWrite(update)

  revalidatePath("/")
}

export const deleteTodo = async (todoID) => {
  await Todo.deleteOne({ _id: todoID })

  revalidatePath("/")
}