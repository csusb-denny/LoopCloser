import { useState, useEffect } from "react";

export default function Timer({ onComplete }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const stopSession = () => {
    setRunning(false);
    onComplete(seconds);
    setSeconds(0);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-3xl font-mono mb-4">
        {Math.floor(seconds / 60)}:
        {(seconds % 60).toString().padStart(2, "0")}
      </h2>

      {!running ? (
        <button
          onClick={() => setRunning(true)}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Start Session
        </button>
      ) : (
        <button
          onClick={stopSession}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          End Session
        </button>
      )}
    </div>
  );
}
