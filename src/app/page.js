import DayCard from "@/components/DayCard";

const days = [
  "Monday (Today)",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Next Monday",
]

export default function Home() {
  return (
    <div className="h-full p-3 flex justify-center items-center">
      <div className="h-full container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {days.map((day, index) => (
          <DayCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
