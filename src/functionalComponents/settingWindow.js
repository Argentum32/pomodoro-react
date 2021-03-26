import close from '../assets/icon-close.svg'

function settingWindow(closeSettings, submit, SetStyles, styles) {

    function settingStyles(font = styles[0], color = styles[1]){       // function for changing current font and color in settings
        SetStyles([font, color])
        document.querySelector(`.${styles[0]}`).classList.remove('activeFont')
        document.querySelector(`.${styles[1]}`).classList.remove('activeColor')
        document.querySelector(`.${font}`).classList.add('activeFont')
        document.querySelector(`.${color}`).classList.add('activeColor')
    }

    return(
        <>
        <div className="modal">
            <div className="modalHeader">
            <h1>Settings</h1>
            <img class='closeBtn' onClick={closeSettings} src={close}/> 
            </div>
            <h3>Time (minutes)</h3>
            <form className='setting' onSubmit={(e) => submit(e)}>
            <div className='minutesForm'>
                <div>
                <label for="pomodoroMins">pomodoro</label>
                <input id='pomodoroMins' type='number' name='pomodoroMins' placeholder='25' min='15' max='60' required/>
                </div>
                <div>
                <label for="shortBreakMins">short break</label>
                <input id='shortBreakMins' type='number' name='shortBreakMins' placeholder='5' min='3' max='10' required/>
                </div>
                <div>
                <label for="longBreakMins">long break</label>
                <input id='longBreakMins' type='number' name='longBreakMins' placeholder='15' min='10' max='20' required/>
                </div>
            </div>
            <div>
                <h3>
                Font
                </h3>
                <div className='setting-fonts'>
                <div className='sans activeFont' onClick={() => settingStyles('sans')}>Aa</div>
                <div className='roboto'onClick={() => settingStyles('roboto')}>Aa</div>
                <div className='mono' onClick={() => settingStyles('mono')}>Aa</div>
                </div>
            </div>
            <div>
                <h3>
                Color
                </h3>
                <div className='setting-colors'>
                <div className='rose activeColor' onClick={() => settingStyles(undefined, 'rose')}></div>
                <div className='aqua' onClick={() => settingStyles(undefined, 'aqua')}></div>
                <div className='orchid' onClick={() => settingStyles(undefined, 'orchid')}></div>
                </div>
            </div>
            <input className='submitBtn' type='submit' value='Apply' />
            </form>
        </div>
        <div id="overlay" onClick={closeSettings}></div>
        </>
    )
}

export default settingWindow;

