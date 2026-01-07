export function tickTimer(currentSeconds) {
  return currentSeconds + 1
}

export function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = (totalSeconds % 60).toString().padStart(2, "0")
  return `${mins}:${secs}`
}

export function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`
  if (mins > 0) return `${mins}m ${secs}s`
  return `${secs}s`
}
