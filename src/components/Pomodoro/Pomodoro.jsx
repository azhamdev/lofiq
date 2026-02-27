import React, { useState, useEffect, useRef } from "react"
import "./Pomodoro.css"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import TingSound from "../../assets/ting.mp3"

const Pomodoro = () => {
  const audioRef = useRef(null)
  const [workDuration, setWorkDuration] = useState(25) // minutes
  const [breakDuration, setBreakDuration] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  useEffect(() => {
    let interval = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      // Play sound when session ends
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
      
      // Session completed, switch to next session
      if (isWorkSession) {
        setIsWorkSession(false)
        setTimeLeft(breakDuration * 60)
      } else {
        setIsWorkSession(true)
        setTimeLeft(workDuration * 60)
        setSessionsCompleted((prev) => prev + 1)
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isWorkSession, workDuration, breakDuration])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsWorkSession(true)
    setTimeLeft(workDuration * 60)
    setSessionsCompleted(0)
  }

  const handleWorkDurationChange = (e) => {
    const newDuration = parseInt(e.target.value)
    setWorkDuration(newDuration)
    if (!isRunning) {
      setTimeLeft(newDuration * 60)
    }
  }

  const handleBreakDurationChange = (e) => {
    const newDuration = parseInt(e.target.value)
    setBreakDuration(newDuration)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`

  const originalTitle = useRef(document.title)

  useEffect(() => {
    // update browser tab title with remaining time and session type
    document.title = `${displayTime} · ${isWorkSession ? "Work" : "Break"} · Pomodoro`
  }, [displayTime, isWorkSession])

  useEffect(() => {
    // restore original title when component unmounts
    return () => {
      document.title = originalTitle.current
    }
  }, [])

  return (
    <Popup
      className="popup"
      trigger={<button className="pomodoro-trigger-btn">🍅 Pomodoro</button>}
      position="left top"
    >
      <div className="pomodoro-container">
        <h1>Pomodoro Timer</h1>

        <div className="pomodoro-display">
          <div className={`timer-circle ${isWorkSession ? "work" : "break"}`}>
            <div className="timer-text">{displayTime}</div>
            <div className="session-label">
              {isWorkSession ? "Work Session" : "Break Time"}
            </div>
          </div>
        </div>

        <div className="pomodoro-controls">
          <button
            className={`control-btn ${isRunning ? "pause" : "play"}`}
            onClick={toggleTimer}
          >
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </button>
          <button className="control-btn reset" onClick={resetTimer}>
            ⟲ Reset
          </button>
        </div>

        <div className="sessions-info">
          <p>Sessions Completed: <strong>{sessionsCompleted}</strong></p>
        </div>

        <div className="pomodoro-settings">
          <div className="setting-group">
            <label htmlFor="work-duration">Work Duration (min):</label>
            <input
              id="work-duration"
              type="range"
              min="1"
              max="60"
              value={workDuration}
              onChange={handleWorkDurationChange}
              disabled={isRunning}
              className="duration-slider"
            />
            <span className="duration-value">{workDuration}</span>
          </div>

          <div className="setting-group">
            <label htmlFor="break-duration">Break Duration (min):</label>
            <input
              id="break-duration"
              type="range"
              min="1"
              max="30"
              value={breakDuration}
              onChange={handleBreakDurationChange}
              disabled={isRunning}
              className="duration-slider"
            />
            <span className="duration-value">{breakDuration}</span>
          </div>
        </div>
        <audio ref={audioRef} src={TingSound} />
      </div>
    </Popup>
  )
}

export default Pomodoro
