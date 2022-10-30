import trailers from "components/utils/test.json";
import { Box } from "components/utils/Box";
import Btn from 'components/Btn/Btn'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';






  export const App = () => {
    function saveHistory(trailer = null) {
      let historyTrailersId = localStorage.getItem('history');
      if (null !== historyTrailersId) {
        historyTrailersId = JSON.parse(historyTrailersId);
        if (!historyTrailersId.includes(trailer.id)) {
          historyTrailersId.push(trailer.id);
          localStorage.setItem('history', JSON.stringify(historyTrailersId));
        }
      } else {
        if (null !== trailer) {
          localStorage.setItem('history', JSON.stringify([trailer.id]));
        }
      }
    }

    function getUserTrailers() {
      let historyTrailersId = JSON.parse(localStorage.getItem('history'));
      let userTrailers = [];
      trailers.forEach(trailer => {
        if (!historyTrailersId.find(id => id === trailer.id)) {
          userTrailers.push(trailer);
        }
      });

      // console.log(userTrailers);
      return userTrailers
    }

    function getRandomTrailer(trailers) {
     
      const randomID = getRandomInt(trailers.length)
     return trailers[randomID]
    }

    saveHistory({ 'id': 3 })
    getUserTrailers()
  console.log(getRandomTrailer(getUserTrailers()))  

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// console.log(getRandomInt(3));
  
    return (
      <>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Btn><IoIosArrowBack size={70} /></Btn>
          <Box width="800px" height="800px"></Box>
          <Btn><IoIosArrowForward size={70} /></Btn>
        </Box>
      </>
    )
  }

