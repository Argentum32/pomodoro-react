import { useState, useEffect } from 'react'
import './styleComponents/App.scss';
import settingIcon from './assets/icon-settings.svg'
import { changeStyles, changeCurrentTimerStyle } from './functionalComponents/stylesFunctions'
import settingWindow from './functionalComponents/settingWindow'


function App() {

  class Pomodoro{       // class for settings
    constructor(pomodoroMins, shortBreakMins, longBreakMins, font, color){
      this.pomodoro = pomodoroMins * 60
      this.shortBreak = shortBreakMins * 60
      this.longBreak = longBreakMins * 60
      this.font = font
      this.color = color
    }
  }
  const [styles, SetStyles] = useState(['sans', 'rose'])
  const [settings, setSettings] = useState(new Pomodoro(25, 5, 15, ...styles))
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro)
  const [status, setStatus] = useState(true)
  const [fullTime, setFullTime] = useState(settings.pomodoro)
  const [pomodoroLine, setPomodoroLine] = useState(0)

  useEffect(() => {        
    let timer = status ? setInterval(() => setTimeLeft(prev => --prev), 1000) : false   // timer with "pause" option
    return () => clearInterval(timer); 
  });

  const formatTime = (s) => {
    let sec = s%60, 
        m = ~~(s/60%60)
    sec = sec < 10 ? `0${sec}` : sec
    m = m < 10 ? `0${m}` : m
    
    return `${m}:${sec}`
  }
  
  function changeTime(newTime, timer){
    setFullTime(newTime)
    setTimeLeft(newTime)
    setPomodoroLine(prev => prev+1)
    changeCurrentTimerStyle(timer)
  }

  const lineOfTimers = () => {
    if(timeLeft === 0){
      if(pomodoroLine %2 === 0 && pomodoroLine !== 6){  // from Pomodoro to short break
        changeTime(settings.shortBreak, 'shortBreak')
      } else if (pomodoroLine === 6){                   // from Pomodoro to long break
        changeTime(settings.longBreak, 'longBreak')
      } else if (pomodoroLine %2 === 1){                // from shortBreak to Pomodoro && from long break to Pomodoro (new cycle)
        changeTime(settings.pomodoro, 'pomodoro')
        if(pomodoroLine === 7) setPomodoroLine(0)
      }
    }
  }
  lineOfTimers()

  const pause = () => <div className='pauseBtn' onClick={() => setStatus(prev => !prev)}>{status ? 'Pause' : 'Start'}</div>
  
  const circle = document.querySelector('.progress-ring__circle')      
  if(circle){                                                         // setuping progress bar
    const radius = circle.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    circle.style.strokeDasharray = `${circumference} ${circumference} `
    circle.style.strokeDashoffset = circumference
    
    function setProgress(percent){
      const offset = circumference - percent / 100 * circumference
      circle.style.strokeDashoffset = offset
    }
    setProgress(timeLeft/fullTime*100)
  }

  const overlay = document.getElementById('overlay')
  const modal = document.querySelector('.modal')
  function openSettings(){
      modal.classList.add('active')
      overlay.classList.add('active')
  }

  function closeSettings() {
      modal.classList.remove('active')
      overlay.classList.remove('active')
  }

  function submit(e){                          // function for submiting setting form
    e.preventDefault();
    setSettings(new Pomodoro(
      e.target.pomodoroMins.value,
      e.target.shortBreakMins.value,
      e.target.longBreakMins.value,
      ...styles
    ), setTimeLeft(() => e.target.pomodoroMins.value * 60),
       setFullTime(() => e.target.pomodoroMins.value * 60))
    closeSettings()
    setStatus(false)
    changeCurrentTimerStyle('pomodoro')
    setPomodoroLine(0)
    changeStyles(styles[0], styles[1])
  }

  return (
    <div className="App">

      <header>
        <h2>pomodoro</h2>
        <div>
          <div className='pomodoro activeTimer'>
            pomodoro
          </div>
          <div className='shortBreak'>
            short break
          </div>
          <div className='longBreak'>
            long break
          </div>
        </div>
      </header>
      
      <div className='stopwatchBG'>
        <svg className='progress-ring' width='1' height='1'>
          <circle className='progress-ring__circle' stroke='#000' stroke-width='10' cx='60' cy='60' r='170' fill='transparent'/>
        </svg>
        <div className='stopwatchArea'>
          <div className='stopwatch'>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      {pause()}
      <img class="settingBtn" onClick={openSettings} src={settingIcon}/>
      {settingWindow(closeSettings, submit, SetStyles, styles)}
    </div>
  )
}

export default App;
