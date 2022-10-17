// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeElapsed: 0,
    timerLimit: 25,
    status: false,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  reduceTimer = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  increaseTimer = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimit, timeElapsed} = this.state
    const isButtonDisabled = timeElapsed > 0

    return (
      <div className="timer-setter">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="sign"
            type="button"
            onClick={this.reduceTimer}
            disabled={isButtonDisabled}
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value">{timerLimit}</p>
          </div>
          <button
            className="sign"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.increaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimit, timeElapsed} = this.state
    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({status: false})
    } else {
      this.setState(prevState => ({timeElapsed: prevState.timeElapsed + 1}))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      status: false,
      timerLimit: 25,
      timeElapsed: 0,
    })
  }

  onStartOrPauseTimer = () => {
    const {status, timerLimit, timeElapsed} = this.state

    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsed: 0})
    }
    if (status) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({status: !prevState.status}))
  }

  renderTimerController = () => {
    const {status} = this.state

    const imageUrl = status
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = status ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="timer-controller-btn"
        >
          <img src={imageUrl} alt={altText} className="icon" />
          <h1 className="label">{status ? 'Pause' : 'Start'}</h1>
        </button>
        <button
          type="button"
          onClick={this.onResetTimer}
          className="timer-controller-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <h1 className="label">Reset</h1>
        </button>
      </div>
    )
  }

  getElapsedTimer = () => {
    const {timerLimit, timeElapsed} = this.state

    const totalRemainingSeconds = timerLimit * 60 - timeElapsed

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {status} = this.state
    return (
      <div className="main-container">
        <h1 className="head">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{this.getElapsedTimer()}</h1>
              <p className="timer-status">{status ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
