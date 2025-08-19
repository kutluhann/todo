"use server"

import { getDb } from "@/db"
import { todos as todosTable } from "@/db/schema"
import { lt, and, eq, gte, desc } from 'drizzle-orm'

import { getStartAndEndOfDay } from "@/lib/utils"
import { generateJWT } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const getTodos = async () => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date)

  const db = getDb();
  const todos = await db
    .select()
    .from(todosTable)
    .where(
      gte(todosTable.date, startOfDay)
    )

  return todos.map(todo => ({...todo, isOverdue: false})).sort((a, b) => {
    return a.position - b.position
  })
}

export const getOverdueTodos = async () => {
  const { startOfDay, endOfDay } = getStartAndEndOfDay(new Date)

  const db = getDb();
  const overdueTodos = await db
    .select()
    .from(todosTable)
    .where(
      and(
        lt(todosTable.date, startOfDay),
        eq(todosTable.isCompleted, false)
      )
    )

  return overdueTodos.map(todo => ({...todo, isOverdue: true}))
}

export const addTodo = async (todoObj) => {
  const db = getDb();
  const latestTodo = (await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.date, todoObj.date))
    .orderBy(desc(todosTable.position))
    .limit(1)
  )[0];

  todoObj.position = latestTodo ? latestTodo.position + 1 : 0

  await db.insert(todosTable).values({
    ...todoObj
  });

  revalidatePath("/app")
}

export const updateTodos = async (updatedTodos) => {
  const db = getDb();
  
  for (const [index, todo] of updatedTodos.entries()) {
    await db
      .update(todosTable)
      .set({
        date: todo.date,
        position: index
      })
      .where(eq(todosTable.id, todo.id));
  }

  revalidatePath("/app")
}

export const deleteTodo = async (id) => {
  const db = getDb();
  await db
    .delete(todosTable)
    .where(eq(todosTable.id, id));

  revalidatePath("/app")
}

export const changeStateOfTodo = async (id, state) => {
  const db = getDb();
  const a = await db
    .update(todosTable)
    .set({ isCompleted: state })
    .where(eq(todosTable.id, id)).returning();

  revalidatePath("/app")
}

export const authenticateUser = async (googleID) => {
  if (googleID === process.env.AUTHORIZED_USER) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    const token = await generateJWT({ googleID }, expires)

    cookies().set("session", token, { expires, httpOnly: true })

    redirect("/app")
  } else {
    return {
      error: "Sorry, this app is only for me. If you wonder how it works you can look over the demo page."
    }
  }
}