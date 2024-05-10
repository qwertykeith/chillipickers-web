import { useEffect, useState } from 'react'
import './App.css'
import { Song, songs } from './data'


const App = () => {

  const [song, setSong] = useState(undefined as Song | undefined)

  useEffect(() => {

    setSong(songs[Math.floor(Math.random() * songs.length)])

  }, [])

  return <div style={{ fontSize: 30 }}>
    <h1>ChilliPractice</h1>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>

      {!!song && <div style={{ justifyContent: "flex-start", flexDirection: "column" }}>
        <SoundChooser songUrl={song.songUrl} />
      </div>}

      <div style={{ overflow: "auto", height: "90vh", paddingTop: 20, marginTop: 20 }}>
        {songs.map(song =>
          <div key={song.name} style={{ flexDirection: "column" }}>
            <button type='button' onClick={() => setSong(song)}>{song.name}</button>
          </div>
        )}
      </div>

    </div>
  </div>
}


const SoundChooser = (props: { songUrl: string }) => {
  const { songUrl } = props

  console.log(songUrl)

  return <div>
    {songUrl.includes("spotify") &&
      // <iframe style={{ borderRadius: 12 }} src={`https://open.spotify.com/embed/track/${getSpotifyTrackId(songUrl)}?utm_source=generator`} width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <iframe style={{ borderRadius: 12 }} src={`https://open.spotify.com/embed/track/${getSpotifyTrackId(songUrl)}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
    {songUrl.includes("youtube") &&
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${getYouTubeVideoId(songUrl)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    }
    {songUrl.includes("/drive") &&
      // <audio controls style={{ width: "100%" }}>
      //   <source src={"https://drive.google.com/open?id=104Qg6_J6h7ato9-tjDawSaAP6uys9Nt8&authuser=qwertykeith%40gmail.com&usp=drive_fs"} type="audio/mpeg" />

      // </audio>


      // <audio controls id="my_audio">
      //   <source src={`https://docs.google.com/uc?export=download&id=${getGoogleDriveFileId(songUrl)}`} type="audio/mpeg" />
      // </audio>

      // <audio>
      //   <source src={`https://drive.google.com/uc?export=download&id=${getGoogleDriveFileId(songUrl)}`} type='audio/mpeg' />
      // </audio>


      <iframe
        frameBorder="0"
        width="500"
        height="100"
        src={`https://drive.google.com/file/d/${getGoogleDriveFileId(songUrl)}/preview?usp=sharing`}>
      </iframe>

      // <audio controls>
      //   <source src="https://drive.google.com/file/d/106_z9DZ3LGD7dBLVlVbH23YnN14PKoQo/preview?usp=sharing" type="audio/mpeg" />
      //   Your browser does not support the audio element.
      // </audio>
    }


  </div>
}


function getGoogleDriveFileId(url: string) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/
  const match = url.match(regex)

  if (match && match.length > 1) return match[1]


  const regex2 = /[?&]id=([^&]+)/
  const match2 = url.match(regex2)

  if (match2 && match2.length > 1) return match2[1]
  return null
}


function getYouTubeVideoId(url: string) {
  const regex = /[?&]v=([^&#]*)/
  const match = url.match(regex)

  if (match && match.length > 1) return match[1]
  return null
}

function getSpotifyTrackId(url: string) {
  const regex = /\/track\/([a-zA-Z0-9]+)/
  const match = url.match(regex)

  if (match && match.length > 1) return match[1]
  return ""
}


export default App
