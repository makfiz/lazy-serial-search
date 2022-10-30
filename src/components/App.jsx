import trailers from "components/utils/test.json";

export const App = () => {
  function saveHistory (trailer = null) {
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

  function getUserTrailers () {
    let historyTrailersId = JSON.parse(localStorage.getItem('history'));
    let userTrailers = [];
    trailers.forEach(trailer => {
      if (!historyTrailersId.find(id => id === trailer.id)) {
        userTrailers.push(trailer);
      }
    });

    console.log(userTrailers);
  }

  saveHistory({'id': 3})
  getUserTrailers()

  return (
    <div>
    </div>
  );
};
