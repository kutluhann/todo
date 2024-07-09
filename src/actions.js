"use server"

import { revalidatePath } from "next/cache"
import { Todo } from "@/db"
import { getStartAndEndOfDay } from "@/utils"

export const getTodos = async () => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date)

  const todos = await Todo.find({
    date: {
      $gte: startOfDay,
    }
  }).sort({ order: 1 })

  return todos.map(todo => ({...todo._doc, _id: todo._id.toString(), isOverdue: false}))
}

export const getOverdueTodos = async () => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date)

  const overdueTodos = await Todo.find({
    date: {
      $lt: startOfDay,
    },
    done: false,
  }).sort({ date: 1 })

  return overdueTodos.map(todo => ({...todo._doc, _id: todo._id.toString(), isOverdue: true}))
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

export const updateTodos = async (updatedTodos) => {
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

export const changeStateOfTodo = async (todoID, state) => {
  await Todo.updateOne({ _id: todoID }, { done: state })

  revalidatePath("/")
}