import "./App.css"

import { useRef, useState } from "react"
import AudioPlayer from "./components/AudioPlayer"
import Pomodoro from "./components/Pomodoro/Pomodoro"

// images
import Leaf from "./assets/Leaf.svg"
import Rain from "./assets/Rain.svg"
import Background from "./assets/asset1.svg"
import Radio from "./assets/radioOnly.svg"

import Rainy from "./assets/Rain.mp3"
import Bird from "./assets/birds.mp3"
import Nashed from "./assets/nashed.mp3"
import Quran from "./assets/quran.mp3"
import Contact from "./components/Contact"

function App() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [selectedAudio, setSelectedAudio] = useState(Quran)
  const [selectedLabel, setSelectedLabel] = useState("Quran")

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

  const switchAudio = (audioSrc, label) => {
    // Pause current playback
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    // Switch to new audio source
    setSelectedAudio(audioSrc)
    setSelectedLabel(label)
  }

  return (
    <div >
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
        
        <div style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <Pomodoro />
        </div>
        <Contact />

        {/* RADIO ONLY  */}
        <audio ref={audioRef} src={selectedAudio} loop={true} />
        
        {/* Cassette List */}
        <div className="cassette-list">
          <button
            className={`cassette-btn ${selectedLabel === "Quran" ? "active" : ""}`}
            onClick={() => switchAudio(Quran, "Quran")}
            title="Play Quran"
          >
            <span className="cassette-icon">📻</span>
            <span className="cassette-label">Quran</span>
          </button>
          <button
            className={`cassette-btn ${selectedLabel === "Nashed" ? "active" : ""}`}
            onClick={() => switchAudio(Nashed, "Nashed")}
            title="Play Nashed"
          >
            <span className="cassette-icon">🎵</span>
            <span className="cassette-label">Nashed</span>
          </button>
        </div>
        
        <div className="volume-container">
          <label className="label-radio">{selectedLabel}</label>
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
