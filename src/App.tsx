import { useState, useEffect } from 'react'
import './App.css'

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function App() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2026-03-02T11:30:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeRemaining({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="countdown-container">
      <div className="countdown">
        <div className="time-unit">
          <div className="time-value">{timeRemaining.days}</div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-unit">
          <div className="time-value">{timeRemaining.hours}</div>
          <div className="time-label">Hours</div>
        </div>
        <div className="time-unit">
          <div className="time-value">{timeRemaining.minutes}</div>
          <div className="time-label">Minutes</div>
        </div>
        <div className="time-unit">
          <div className="time-value">{timeRemaining.seconds}</div>
          <div className="time-label">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default App
