import "./App.css"

import { useRef, useState } from "react"
import AudioPlayer from "./components/AudioPlayer"

// images
import Leaf from "./assets/Leaf.svg"
import Rain from "./assets/Rain.svg"
import Background from "./assets/asset1.svg"
import Radio from "./assets/radioOnly.svg"

import Rainy from "./assets/Rain.mp3"
import Bird from "./assets/birds.mp3"
import Sound from "./assets/sound2.mp3"

function App() {
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
    <div>
      <div className="main-background dekstop">
        <img src={Background} className="background" />

        <AudioPlayer
          audioSource={Bird}
          img={Leaf}
          loop={true}
          labelVolume="Birds"
        />
        <AudioPlayer
          audioSource={Rainy}
          img={Rain}
          loop={true}
          labelVolume="Rain"
        />

        {/* RADIO ONLY  */}
        <audio ref={audioRef} src={Sound} />
        <div className="volume-container">
          <label className="label-radio">Radio</label>
          <input
            className="volumeSlider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
          />
        </div>
        <div
          style={{
            // backgroundColor: "red",
            height: "100vh",
          }}
        >
          <button
            className="radio"
            onClick={isPlaying ? pauseAudio : playAudio}
          >
            {isPlaying ? (
              <img src={Radio} className="radio-img pause" />
            ) : (
              <img src={Radio} className="radio-img play" />
            )}
          </button>
        </div>
      </div>
      {/* Radio Only End */}

      <div
        style={{
          backgroundColor: "red",
          height: "100vh",
          width: "100vw",
        }}
      ></div>
      <div className="mobile">
        <h1>Sorry, only available on the desktop version</h1>
        <p>Support me if you want to use it on mobile</p>
      </div>
    </div>
  )
}

export default App
