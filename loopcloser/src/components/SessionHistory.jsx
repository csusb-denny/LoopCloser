import { formatDuration } from "../utils/time"

export default function SessionHistory({ sessions, onDelete }) {
  if (sessions.length === 0) return null

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md space-y-3">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
          >
            <div>
              <div className="font-semibold text-gray-800">
                {s.title}
              </div>
              <div className="text-sm text-gray-500">
                {s.dateDisplay}
              </div>
              <div className="text-sm text-blue-600 mt-1">
                Duration: {formatDuration(s.duration)}
              </div>
              {s.notes && (
                <div className="text-sm italic text-gray-600 mt-2">
                  {s.notes}
                </div>
              )}
            </div>

            <button
              onClick={() => onDelete(s.id)}
              className="text-red-500 hover:text-red-700 font-bold text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
