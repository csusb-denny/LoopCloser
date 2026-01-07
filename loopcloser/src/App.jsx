import Timer from "./components/Timer"
import Stats from "./components/Stats"
import SessionHistory from "./components/SessionHistory"
import ActivityGrid from "./components/ActivityGrid"
import { useSessions } from "./hooks/useSessions"

export default function App() {
  const {
    sessions,
    addSession,
    deleteSession,
    dailyStats,
    totalTime
  } = useSessions()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center py-12 px-4">
      {/* SINGLE CONSTRAINED COLUMN */}
      <div className="w-full max-w-md space-y-10">

        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            LoopCloser
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Focus. Track. Improve.
          </p>
        </header>

        {/* NEW SESSION */}
        <Timer onComplete={addSession} />

        {/* STATS */}
        {sessions.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-md">
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
        )}

        {/* SESSION HISTORY */}
        <section className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Session History
          </h2>

          {sessions.length === 0 ? (
            <p className="text-gray-500 text-center">
              No sessions yet. Start your first session above!
            </p>
          ) : (
            <ul className="space-y-3">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="border rounded-lg p-4 flex justify-between items-start"
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
                    onClick={() => deleteSession(s.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ACTIVITY OVERVIEW */}
        <section className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Activity Overview
          </h2>

          {Object.keys(dailyStats).length === 0 ? (
            <p className="text-gray-500 text-center">
              No activity yet.
            </p>
          ) : (
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
          )}
        </section>

      </div>
    </div>
  )
}
