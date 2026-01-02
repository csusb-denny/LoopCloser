import { useState } from "react";
import Timer from "./components/Timer";

export default function App() {
  const [sessions, setSessions] = useState([]);

  const addSession = (duration) => {
    const newSession = {
      id: Date.now(),
      duration,
      date: new Date().toLocaleString(),
    };

    setSessions((prev) => [newSession, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-2">LoopCloser</h1>
      <p className="text-gray-600 mb-6">
        Focus. Track. Improve.
      </p>

      <Timer onComplete={addSession} />

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Session History</h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="bg-white shadow p-3 rounded flex justify-between"
              >
                <span>{session.date}</span>
                <span>{session.duration} sec</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
