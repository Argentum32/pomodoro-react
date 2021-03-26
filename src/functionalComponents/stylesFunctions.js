
export function changeStyles(font, color){                             // function for changing font and color after setup settings
    const fonts = {
        sans: "'Kumbh Sans', sans-serif",
        roboto: "'Roboto Slab', serif",
        mono: "'Space Mono', monospace"
    }
    const colors = {
        rose: '#F87070',
        aqua: '#70F3F8',
        orchid: '#D881F8',
    }
    document.querySelector('.App').style.fontFamily = fonts[font]
    document.documentElement.style.setProperty('--color', colors[color])
}

export function changeCurrentTimerStyle(timer){
    document.querySelector(`.pomodoro`).classList.remove('activeTimer')
    document.querySelector(`.longBreak`).classList.remove('activeTimer')
    document.querySelector(`.shortBreak`).classList.remove('activeTimer')

    document.querySelector(`.${timer}`).classList.add('activeTimer')
}

//   export default changeStyles