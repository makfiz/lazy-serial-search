import trailers from "components/utils/test.json";
import {Box} from "components/utils/Box";
import Btn from 'components/Btn/Btn'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { useState, useEffect } from "react";
import { fetchTrendingMovies, fetchSearchMovieById } from "./utils/apiServise";


export const App = () => {
  const [curTrailer, setCurTrailer] = useState(null)
  const [curPage, setCurPage] = useState(1)
  //const [prevTrailer, setPrevTrailer] = useState(null)

  useEffect( () => {
    // getRandomTrailer()
    // async function fetch(pg) {
    //       try {
    //   const response = await fetchTrendingMovies(pg)
    //   console.log(response)
    // } catch (e) {
    //   throw new Error(e.message)
    // }
    // }

    // fetch(curPage)
        async function fetch(id) {
          try {
      const response = await fetchSearchMovieById(id)
      console.log(response)
    } catch (e) {
      throw new Error(e.message)
    }
    }

    fetch(974213)
  },[])

  function getHistory() {
    let history = localStorage.getItem('history');
    return JSON.parse(history);
  }

  function setHistory(history) {
    localStorage.setItem('history', JSON.stringify(history));
  }

  function getTrailerByID(id) {
    return trailers.find((trailer) => trailer.id === id)
  }

  function saveHistory(trailer = null) {
    if (trailer === null) return
    let historyTrailersId = getHistory();
    if (null !== historyTrailersId) {
      if (!historyTrailersId.includes(trailer.id)) {
        historyTrailersId.push(trailer.id);
        setHistory(historyTrailersId)
      }
    } else {
      setHistory([trailer.id]);
    }
  }

  function getUserTrailers() {
    let historyTrailersId = getHistory();

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

  function getPrevTrailer() {
    let history = getHistory();
    if (!history) return null;
    let prevTrailerId = history[history.length - 2],
        prevTrailer = getTrailerByID(prevTrailerId);

    setCurTrailer(prevTrailer);
    return prevTrailer;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Btn onClick={getPrevTrailer}><IoIosArrowBack size={70}/></Btn>
        <Box width="1280" height="720px">
          {curTrailer &&
          <iframe width="1280" height="720" src={curTrailer.url + '?autoplay=1&&mute=1'} title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>}
        </Box>
        <Btn onClick={getRandomTrailer}><IoIosArrowForward size={70}/></Btn>
      </Box>
    </>
  )
}

