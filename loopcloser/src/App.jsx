import { useEffect, useState, useRef } from "react";
import Timer from "./components/Timer";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const isInitialLoad = useRef(true);

  // Load from localStorage ONCE
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sessions");
      if (stored) {
        setSessions(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load sessions", err);
    }
  }, []);

  // Save only AFTER initial load
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session) => {
    setSessions((prev) => [session, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-2">LoopCloser</h1>
      <p className="text-gray-600 mb-6">Focus. Track. Improve.</p>

      <Timer onComplete={addSession} />

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Session History</h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.id} className="bg-white p-4 rounded shadow">
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-gray-600">{s.date}</div>
                <div className="text-sm mt-1">
                  Duration: {s.duration}s
                </div>
                {s.notes && (
                  <div className="text-sm italic mt-1">{s.notes}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
