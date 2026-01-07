import { formatDuration } from "../utils/time"

export default function Stats({ sessions, totalTime }) {
  if (sessions.length === 0) return null

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-blue-600">
              {sessions.length}
            </div>
            <div className="text-sm text-gray-600">
              Total Sessions
            </div>
          </div>

          <div className="text-center flex-1 border-l">
            <div className="text-2xl font-bold text-green-600">
              {formatDuration(totalTime)}
            </div>
            <div className="text-sm text-gray-600">
              Total Time
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
