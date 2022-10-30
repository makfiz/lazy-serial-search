import trailers from "components/utils/test.json";
import {Box} from "components/utils/Box";
import Btn from 'components/Btn/Btn'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import {useState, useEffect} from "react";


export const App = () => {
  const [curTrailer, setCurTrailer] = useState(null)

  useEffect(() => {
    getRandomTrailer()
  },[])

  function saveHistory(trailer = null) {
    if (trailer === null) return
    let historyTrailersId = localStorage.getItem('history');
    if (null !== historyTrailersId) {
      historyTrailersId = JSON.parse(historyTrailersId);
      if (!historyTrailersId.includes(trailer.id)) {
        historyTrailersId.push(trailer.id);
        localStorage.setItem('history', JSON.stringify(historyTrailersId));
      }
    } else {
        localStorage.setItem('history', JSON.stringify([trailer.id]));
    }
  }

  function getUserTrailers() {
    let historyTrailersId = JSON.parse(localStorage.getItem('history'));

    if (null !== historyTrailersId) {
      let userTrailers = [];
      trailers.forEach(trailer => {
        if (!historyTrailersId.find(id => id === trailer.id)) {
          userTrailers.push(trailer);
        }
      });

      return userTrailers;
    }

    return trailers;
  }

  function getRandomTrailer() {
    const trailers = getUserTrailers()
    if (trailers === null) return

    const randomID = getRandomInt(trailers.length)
    const result = trailers[randomID]
    saveHistory(result)
    setCurTrailer(result)
    return result
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Btn><IoIosArrowBack size={70}/></Btn>
        <Box width="1280" height="720px">
          {curTrailer &&
          <iframe width="1280" height="720" src={curTrailer.url + '?autoplay=1&&mute=1'} title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen playing={true}></iframe>}
        </Box>
        <Btn onClick={getRandomTrailer}><IoIosArrowForward size={70}/></Btn>
      </Box>
    </>
  )
}

