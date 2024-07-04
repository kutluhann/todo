export default function DayCard({ day }) {
  return (
    <div className="bg-white rounded-md flex flex-col items-center gap-2 py-2 px-4 shadow-xl">
      <p className="font-semibold text-lg">{day}</p>
      <div className="w-full">
        <div className="flex gap-2">
          <input type="checkbox" />
          <p>Kitap oku</p>
        </div>
      </div>
    </div>
  )
}