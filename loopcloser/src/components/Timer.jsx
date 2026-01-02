import { useState, useEffect } from "react";

export default function Timer({ onComplete }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const stopSession = () => {
    if (!title.trim()) {
      alert("Please enter a session title.");
      return;
    }

    onComplete({
      id: Date.now(),
      title,
      notes,
      duration: seconds,
      date: new Date().toLocaleString(),
    });

    setSeconds(0);
    setTitle("");
    setNotes("");
    setRunning(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">New Session</h2>

      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Session title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mb-3 p-2 border rounded"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="text-3xl font-mono mb-4">
        {Math.floor(seconds / 60)}:
        {(seconds % 60).toString().padStart(2, "0")}
      </div>

      {!running ? (
        <button
          onClick={() => setRunning(true)}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Start Session
        </button>
      ) : (
        <button
          onClick={stopSession}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          End Session
        </button>
      )}
    </div>
  );
}
