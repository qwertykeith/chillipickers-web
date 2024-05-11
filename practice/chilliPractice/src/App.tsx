import { useEffect, useRef, useState } from 'react'
import './App.css'
import { songs } from './audioFiles'


const App = () => {

  const [song, setSong] = useState("")

  useEffect(() => {

    setSong(songs[Math.floor(Math.random() * songs.length)])

  }, [])

  return <div style={{ fontSize: 30 }}>
    <h1>ChilliPractice</h1>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>

      {!!song && <div style={{ justifyContent: "flex-start", flexDirection: "column" }}>
        <Player songUrl={`https://practice-audio.s3.ap-southeast-2.amazonaws.com/${song}`} />
      </div>}

      <div style={{ overflow: "auto", height: "90vh", paddingTop: 20, marginTop: 20 }}>
        {songs.map(song =>
          <div key={song} style={{ flexDirection: "column" }}>
            <button type='button' onClick={() => setSong(song)}>{song}</button>
          </div>
        )}
      </div>

    </div>
  </div>
}


const Player = (props: { songUrl: string }) => {
  const { songUrl } = props

  const audioRef = useRef<HTMLAudioElement>(null)

  console.log(songUrl)

  return <div>
    <audio controls ref={audioRef} src={songUrl} style={{ width: "100%" }} />


  </div>
}


export default App
