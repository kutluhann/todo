"use client"

import { useState, useCallback } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export default function HorizontalDatePicker({
	selected,
	onSelect,
	className,
	...props
}) {
	const [currentWeek, setCurrentWeek] = useState(() => {
		const today = new Date()
		const day9 = new Date(today)
		day9.setDate(today.getDate() + 8)
		
		const startOfWeek = new Date(day9)
		const dayOfWeek = day9.getDay()
		const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
		startOfWeek.setDate(day9.getDate() - daysFromMonday)
		return startOfWeek
	})

	const generateDates = useCallback(() => {
		const dates = []
		
		for (let i = 0; i < 7; i++) {
			const date = new Date(currentWeek)
			date.setDate(currentWeek.getDate() + i)
			dates.push(date)
		}

		return dates
	}, [currentWeek])

	const dates = generateDates()
	const today = new Date()

	const goToPreviousWeek = () => {
		const previousWeek = new Date(currentWeek)
		previousWeek.setDate(currentWeek.getDate() - 7)
		setCurrentWeek(previousWeek)
	}

	const goToNextWeek = () => {
		const nextWeek = new Date(currentWeek)
		nextWeek.setDate(currentWeek.getDate() + 7)
		setCurrentWeek(nextWeek)
	}

	const isToday = (date) => {
		return date.toDateString() === today.toDateString()
	}

	const isSelected = (date) => {
		return selected && date.toDateString() === selected.toDateString()
	}

	const isPastDate = (date) => {
		const today = new Date()
		const day9 = new Date(today)
		day9.setDate(today.getDate() + 8)
		day9.setHours(0, 0, 0, 0)
		
		const dateStart = new Date(date)
		dateStart.setHours(0, 0, 0, 0)
		
		return dateStart < day9
	}

	const handleDateClick = (date) => {
		if (isPastDate(date)) return
		onSelect?.(date)
	}

	return (
		<div className={cn("w-full", className)} {...props}>
			<div className="flex items-center justify-between mb-4">
				<button
					variant="outline"
					size="sm"
					onClick={goToPreviousWeek}
					className="flex items-center justify-center cursor-pointer"
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</button>

				<div className="text-sm font-semibold">
					{(() => {
						const endOfWeek = new Date(currentWeek)
						endOfWeek.setDate(currentWeek.getDate() + 6)
						
						if (currentWeek.getMonth() !== endOfWeek.getMonth()) {
							return `${MONTHS[currentWeek.getMonth()]} - ${MONTHS[endOfWeek.getMonth()]} ${endOfWeek.getFullYear()}`
						}
						return `${MONTHS[currentWeek.getMonth()]} ${currentWeek.getFullYear()}`
					})()}
				</div>

				<button
					variant="outline"
					size="sm"
					onClick={goToNextWeek}
					className="flex items-center justify-center cursor-pointer"
				>
					<ChevronRightIcon className="h-4 w-4" />
				</button>
			</div>

			<div className="flex gap-1 justify-between">
				{dates.map((date, index) => {
					const jsDay = date.getDay()
					const mondayFirstDay = jsDay === 0 ? 6 : jsDay - 1
					const dayName = DAYS[mondayFirstDay]
					const dayNumber = date.getDate()
					const isCurrentlySelected = isSelected(date)
					const isCurrentlyToday = isToday(date)
					const isPast = isPastDate(date)

					return (
						<button
							key={index}
							onClick={() => handleDateClick(date)}
							disabled={isPast}
							className={cn(
								"flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-full h-16",
								{
									"cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2": !isPast,
									"cursor-not-allowed opacity-40": isPast,
									"bg-gray-200 text-gray-800 hover:bg-gray-300": isCurrentlySelected && !isPast,
									"bg-gray-100 text-gray-700": isCurrentlyToday && !isCurrentlySelected,
									"text-gray-600": !isCurrentlySelected && !isCurrentlyToday && !isPast,
									"text-gray-400": isPast,
								}
							)}
						>
							<span className="text-xs font-medium mb-1">{dayName}</span>
							<span className="text-sm font-semibold">{dayNumber}</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}
