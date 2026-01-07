export function loadSessions() {
  try {
    const stored = localStorage.getItem("sessions")
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading sessions:", error)
    return []
  }
}

export function saveSessions(sessions) {
  try {
    localStorage.setItem("sessions", JSON.stringify(sessions))
  } catch (error) {
    console.error("Error saving sessions:", error)
  }
}
