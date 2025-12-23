import { useState, useEffect } from "react"
import "./App.css"
import bgImage from "./assets/images/img01.jpg"

function App() {
  const [taskName, setTaskName] = useState("")
  const [goal, setGoal] = useState("")
  const [duration, setDuration] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Countdown timer logic
  useEffect(() => {
    if (!isActive || isPaused || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused ,timeLeft])

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      handleEnd()
    }
  }, [timeLeft, isActive])

  const handleStart = () => {
    if (!goal || !duration) return

    setTimeLeft(Number(duration) * 60)
    setIsActive(true)
  }

  const handleEnd = () => {
    setIsActive(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/90 p-10 rounded-xl shadow-lg w-full max-w-xl text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold italic mb-8">LoopCloser</h1>

        {/* FORM SCREEN */}
        {!isActive && (
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-1/3 min-w-[220px] rounded-md border border-gray-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <input
              type="text"
              placeholder="Session Goal *"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-1/3 min-w-[220px] rounded-md border border-gray-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <input
              type="number"
              placeholder="Duration (minutes) *"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-[140px] rounded-md border border-gray-300 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <button
              onClick={handleStart}
              className="w-1/3 min-w-[220px] mt-4 py-3 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition"
            >
              Start Session
            </button>
          </div>
        )}

        {/* ACTIVE SESSION SCREEN */}
        {isActive && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Session Active</h2>

            {taskName && (
              <p className="italic text-gray-700">{taskName}</p>
            )}

            <p className="text-lg">{goal}</p>

            <p className="text-4xl font-mono mt-4">
              {formatTime(timeLeft)}
            </p>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="w-1/3 min-w-[220px] py-3 rounded-md bg-gray-800 text-white font-semibold hover:bg-gray-700 transition"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button
              onClick={handleEnd}
              className="w-1/3 min-w-[220px] mt-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-500 transition"
            >
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
