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
  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days)
}

export const isSameDay = (firstDate, secondDate) => {
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
      date: currentDate,
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

  return { startOfDay, endOfDay }
}

export const formatDate = (date) => {
  const month = date.toLocaleDateString("en", { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()
  
  console.log(date)
  return day + " " + month + " " + year
}