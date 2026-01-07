import { useEffect, useRef, useState } from "react"
import { loadSessions, saveSessions } from "../utils/sessionStorage"

export function useSessions() {
  const [sessions, setSessions] = useState([])
  const isInitialLoad = useRef(true)

  useEffect(() => {
    setSessions(loadSessions())
  }, [])

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    saveSessions(sessions)
  }, [sessions])

  const addSession = (session) => {
    setSessions((prev) => [session, ...prev])
  }

  const deleteSession = (id) => {
    if (confirm("Are you sure you want to delete this session?")) {
      setSessions((prev) => prev.filter((s) => s.id !== id))
    }
  }

  const getDailyStats = () => {
    const stats = {}
    sessions.forEach((s) => {
      const date = new Date(s.date).toLocaleDateString()
      stats[date] = (stats[date] || 0) + 1
    })
    return stats
  }

  const getTotalTime = () =>
    sessions.reduce((total, s) => total + s.duration, 0)

  return {
    sessions,
    addSession,
    deleteSession,
    dailyStats: getDailyStats(),
    totalTime: getTotalTime(),
  }
}
