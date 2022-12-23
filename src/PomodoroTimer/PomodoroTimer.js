import "./PomodoroTimer.css";
import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [duration, setDuration] = useState(25); // Initialize duration to 25 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Initialize time left to selected duration
  const [isRunning, setIsRunning] = useState(false); // Initialize timer as not running
  const [intervalId, setIntervalId] = useState(null); // Initialize interval ID as null

  useEffect(() => {
    // Update time left every second if timer is running
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          // If time is up, stop timer
          if (prevTimeLeft <= 0) {
            clearInterval(id);
            setIntervalId(null);
            setIsRunning(false);
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => {
      // Clean up interval when component unmounts
      clearInterval(intervalId);
    };
  }, [isRunning]); // Only re-run useEffect if isRunning changes

  const handleStartClick = () => {
    setIsRunning(true); // Start timer
  };

  const handleStopClick = () => {
    clearInterval(intervalId); // Clear interval
    setIntervalId(null); // Set interval ID to null
    setIsRunning(false); // Stop timer
  };

  const handleResetClick = () => {
    setTimeLeft(duration * 60); // Reset time left to selected duration
    setIsRunning(false); // Stop timer
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration); // Set duration to selected value
    setTimeLeft(newDuration * 60); // Set time left to selected duration
    setIsRunning(false); // Stop timer
  };

  // Format time left in minutes and seconds
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return (
  <div className ="pomod-container">
    <div className="pomodoro-timer">
      <div className="time-display">
        {minutes}:{seconds}
      </div>
      <div className="controls">
        {isRunning
          ? <button onClick={handleStopClick}>Stop</button>
          : <button onClick={handleStartClick}>Start</button>
        }
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <div className="duration-selector">
        <button onClick={() => handleDurationChange(25)}>25 minutes</button>
        <button onClick={() => handleDurationChange(15)}>15 minutes</button>
        <button onClick={() => handleDurationChange(10)}>10 minutes</button>
      </div>
    </div>
  </div>
  );
}

export default PomodoroTimer;