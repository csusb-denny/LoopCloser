export default function ActivityGrid({ dailyStats }) {
  if (Object.keys(dailyStats).length === 0) return null

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(dailyStats).map(([date, count]) => (
            <div
              key={date}
              title={`${count} session(s) on ${date}`}
              className="bg-green-500 text-white text-xs font-bold text-center rounded p-3"
            >
              {count}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
