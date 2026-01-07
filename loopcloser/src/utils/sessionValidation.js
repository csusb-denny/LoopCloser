export function validateSessionInput(title) {
  if (!title || !title.trim()) {
    return { isValid: false, error: "Please enter a session title." }
  }

  if (title.length > 100) {
    return { isValid: false, error: "Title must be 100 characters or less." }
  }

  return { isValid: true, error: null }
}
