import React, { useRef, useState } from "react"
import "./Ambience.css"

const AudioPlayer = ({ audioSource, img, className, labelVolume, loop }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)

  const playAudio = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pauseAudio = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const changeVolume = (event) => {
    const volumeValue = event.target.value
    audioRef.current.volume = volumeValue
    setVolume(volumeValue)
  }
  return (
    <div className="ambience">
      <audio ref={audioRef} src={audioSource} loop={loop} />
      <div>
        <label className="label-ambience">{labelVolume} : </label>
      </div>
      <div>
        <button
          className="ambience-item"
          onClick={isPlaying ? pauseAudio : playAudio}
        >
          {isPlaying ? (
            <img src={img} className="ambience-image ambience-image-pause" />
          ) : (
            <img src={img} className="ambience-image ambience-image-play" />
          )}
        </button>
      </div>
      <div>
        <input
          className="ambience-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
