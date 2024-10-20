import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } 
    return () => clearInterval(timer);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => {
    setIsRunning(false);
    setResults([...results, formatTime(time)]);
  };
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setResults([]);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <div>
      <div className="stopwatch">{formatTime(time)}</div>
      <button onClick={start}>Старт</button>
      <button onClick={stop}>Стоп</button>
      <button onClick={reset}>Сброс</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
