import { useEffect, useState } from "react"
import { tickTimer, formatTime } from "../utils/time"
import { validateSessionInput } from "../utils/sessionValidation"

export default function Timer({ onComplete }) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setSeconds((s) => tickTimer(s))
    }, 1000)
    return () => clearInterval(timer)
  }, [running])

  const handleStart = () => setRunning(true)

  const handleEnd = () => {
    const validation = validateSessionInput(title)
    if (!validation.isValid) {
      alert(validation.error)
      return
    }

    onComplete({
      id: Date.now(),
      title: title.trim(),
      notes: notes.trim(),
      duration: seconds,
      date: new Date().toISOString(),
      dateDisplay: new Date().toLocaleString(),
    })

    setRunning(false)
    setSeconds(0)
    setTitle("")
    setNotes("")
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">
          New Session
        </h2>

        <input
          className="w-full p-2 border rounded"
          placeholder="Session title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={running}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />

        <div className="text-4xl font-mono text-center font-bold">
          {formatTime(seconds)}
        </div>

        {!running ? (
          <button
            onClick={handleStart}
            className="w-full bg-green-600 text-white py-3 rounded font-semibold"
          >
            Start Session
          </button>
        ) : (
          <button
            onClick={handleEnd}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  )
}
