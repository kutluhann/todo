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

export const generateTodoDays = () => {
  const currentDate = new Date()
  const today = currentDate.toLocaleDateString("en", { weekday: 'long' })

  const index = days.findIndex(day => day === today)
  const filteredDays = days.filter(day => day !== today)

  return [
    {
      name: today + " (Today)",
      date: currentDate,
      daysFromToday: 0,
    },
    ...filteredDays.slice(index).map(dayName => {
      const dayIndex = days.findIndex(day => day === dayName)

      return ({
        name: dayName,
        date: addDaysToDate(currentDate, dayIndex - index),
        daysFromToday: dayIndex - index,
      })
    }),
    ...filteredDays.slice(0, index).map(dayName => {
      const dayIndex = days.findIndex(day => day === dayName)

      return ({
        name: "Next " + dayName,
        date: addDaysToDate(currentDate, 7 + dayIndex - index),
        daysFromToday: 7 + dayIndex - index,
      })
    }),
    {
      name: "Next " + today,
      date: addDaysToDate(currentDate, 7),
      daysFromToday: 7,
    },
  ]
}