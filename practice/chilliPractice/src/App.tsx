import capitalize from '@stdlib/string-capitalize'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { songs } from './audioFiles'


const App = () => {

  const [song, setSong] = useState("")

  // useEffect(() => {

  //   setSong(songs[Math.floor(Math.random() * songs.length)])

  // }, [])

  return <div style={{ fontSize: "1em", margin: 0, padding: 0 }}>
    {/* image */}
    <div style={{ margin: 5, position: "fixed", top: 0, left: 0, right: 0 }}>
      <img src="/logo.png" />
    </div>
    <h1 style={{ color: "#aaa", margin: 5, position: "fixed", top: 0, left: 0, right: 0 }}>Chilli Practice</h1>
    {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}> */}

    {!!song && <div style={{ position: "fixed", top: 80, left: 0, right: 0, justifyContent: "flex-start", flexDirection: "column" }}>
      <Player
        songUrl={`https://practice-audio.s3.ap-southeast-2.amazonaws.com/${song}`}
        onDone={() => {
          setSong(songs[Math.floor(Math.random() * songs.length)])
        }}
      />
    </div>}

    <div style={{ position: "fixed", top: 150, left: 0, right: 0, bottom: 0, display: "inline-block", overflow: "auto", height: "90vh", paddingTop: 0, marginTop: 0 }}>
      {songs.map(s =>
        <span key={s} style={{ fontWeight: song === s ? "bolder" : "normal" }}>
          <button style={{ margin: 5, borderWidth: song === s ? 3 : 0, borderColor: "#ccc" }} type='button' onClick={() => setSong(s)}>{fixName(s)}</button>
        </span>
      )}
    </div>

  </div>
  // </div>
}


const Player = (props: {
  songUrl: string,
  onDone: () => void
}) => {
  const { songUrl } = props

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [songUrl])

  console.log(songUrl)

  return <div>
    <audio controls ref={audioRef} src={songUrl} style={{ width: "100%" }} onEnded={props.onDone} />


  </div>
}


const fixName = (n: string) => capitalizeAllWords(camelCaseToWords(capitalizeAllWords(n).replaceAll("-", " "))).split(".")[0]

const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const capitalizeAllWords = (s: string) => s.split(" ").map(capitalize).join(" ")

export default App
