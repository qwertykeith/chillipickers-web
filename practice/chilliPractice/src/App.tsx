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

    {!!song && <div style={{ position: "fixed", top: 80, left: 0, right: 0, maxWidth: 400, margin: "auto" }}>
      <div style={{}}>
        <Player
          songUrl={`https://practice-audio.s3.ap-southeast-2.amazonaws.com/${song}`}
          onDone={() => {
            setSong(songs[Math.floor(Math.random() * songs.length)])
          }}
        />
      </div>
    </div>}

    <div style={{ position: "fixed", top: 150, overflow: "auto", height: "90vh", left: 0, right: 0 }}>
      <div style={{ maxWidth: 600, bottom: 0, display: "inline-block", paddingTop: 0, margin: "auto", marginTop: 0, paddingBottom: 150 }}>
        <span style={{}}>
          <button style={{ margin: 5, borderWidth: 0, borderColor: "#ccc" }} type='button' onClick={() => setSong(songs[Math.floor(Math.random() * songs.length)])}>🎲</button>
        </span>
        {[...songs].sort((a, b) => a.localeCompare(b)).map(s =>
          <span key={s} style={{ fontWeight: song === s ? "bolder" : "normal" }}>
            <button style={{ margin: 5, borderWidth: song === s ? 3 : 0, borderColor: "#ccc" }} type='button' onClick={() => setSong(s)}>{fixName(s)}</button>
          </span>
        )}
      </div>
    </div>

  </div>
  // </div>
}

// const Button=(props:{key})=>
//   <span key={s} style={{ fontWeight: song === s ? "bolder" : "normal" }}>
// <button style={{ margin: 5, borderWidth: song === s ? 3 : 0, borderColor: "#ccc" }} type='button' onClick={() => setSong(s)}>{fixName(s)}</button>
// </span>



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


const fixName = (n: string) => capitalizeAllWords(camelCaseToWords(capitalizeAllWords(n).replaceAll("-", " "))).split(".")[0].replaceAll("_", "'")

const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const capitalizeAllWords = (s: string) => s.split(" ").map(capitalize).join(" ")

export default App
