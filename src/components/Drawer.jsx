"use client"

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer"
import HorizontalDatePicker from "@/components/ui/horizontal-datepicker"
import DayCard from "@/components/DayCard"
import { isSameDay } from "@/lib/utils"

import { useState, useEffect } from "react";

export default function DrawerComponent({ todos, isBlurred }) {
	const [date, setDate] = useState(() => {
		const today = new Date();
		const day9 = new Date(today);
		day9.setDate(today.getDate() + 8);
		return day9;
	});
	const [isOpen, setIsOpen] = useState(false);
	
	const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
	const formattedDate = date.toISOString().split("T")[0];

	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				setIsOpen(prev => !prev);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		console.log(formattedDate)
	}, [date])

	const todoList = todos.filter(todo => isSameDay(todo.date, formattedDate))

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
			<DrawerContent className="bg-gray-100 rounded-tl-md rounded-bl-md">
				<DrawerHeader>
					<DrawerTitle>Create Future Todo</DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className="p-4 pt-0 flex flex-col gap-3 h-full z-50">
					<HorizontalDatePicker
						selected={date}
						onSelect={setDate}
						className="rounded-md shadow-xl p-4 bg-white"
					/>
					<DayCard day={{ name: dayName, date: formattedDate }} todoList={todoList} overdueTodos={[]} isBlurred={isBlurred} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
