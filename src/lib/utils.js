import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export const addDaysToDate = (date, days) => {
  return formatDateDefault(new Date(date.getTime() + 1000 * 60 * 60 * 24 * days))
}

export const isSameDay = (firstDate, secondDate) => {
  firstDate = new Date(firstDate)
  secondDate = new Date(secondDate)

  return firstDate.getDate() === secondDate.getDate() 
    && firstDate.getMonth() === secondDate.getMonth()
    && firstDate.getYear() === secondDate.getYear()
}

export const generateTodoDays = () => {
  const currentDate = new Date()
  const today = currentDate.toLocaleDateString("en", { weekday: 'long' })

  const index = days.findIndex(day => day === today)
  const filteredDays = days.filter(day => day !== today)

  return [
    {
      name: today + " (Today)",
      date: addDaysToDate(currentDate, 0),
    },
    ...filteredDays.slice(index).map(dayName => {
      const dayIndex = days.findIndex(day => day === dayName)

      return ({
        name: dayName,
        date: addDaysToDate(currentDate, dayIndex - index),
      })
    }),
    ...filteredDays.slice(0, index).map(dayName => {
      const dayIndex = days.findIndex(day => day === dayName)

      return ({
        name: dayName,
        date: addDaysToDate(currentDate, 7 + dayIndex - index),
      })
    }),
    {
      name: "Next " + today,
      date: addDaysToDate(currentDate, 7),
    },
  ]
}

export const getStartAndEndOfDay = (date) => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0); 

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  return { startOfDay: formatDateDefault(startOfDay), endOfDay: formatDateDefault(endOfDay) }
}

export const formatDate = (date) => {
  date = new Date(date)
  const month = date.toLocaleDateString("en", { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()

  return day + " " + month + " " + year
}

export const formatDateDefault = (date) => {
  return date.toISOString().split("T")[0]
}