import axios from 'axios';

const API_KEY = 'e4c439da3c1d90110fb4595b6236c9fe';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const language = 'en-US'
export const fetchTrendingMovies = async (page) => {
              
        try {
            const response = await axios.get('trending/movie/day', {
        params: {
          api_key: API_KEY,
          language: language,
          page: page,
        },
      });
            
            return response
        } catch(error) {
            console.log(error)
        }
}
    
export const fetchSearchMovieById = async (id) => {
    try {
      
      const { data } = await axios(`movie/${id}/videos`, {
        params: {
          api_key: API_KEY,
          language: language,
        },
      });
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
}
  
// async fetchMovieByGenre() {
//     try {
//       Loading.pulse({
//         svgColor: '#ff6b08',
//       });
//       const { data } = await axios(`discover/movie`, {
//         params: {
//           api_key: API_KEY,
//           language: this.language,
//           with_genres: this.genreId,
//           page: this.page,
//         },
//       });
//       Loading.remove();

//       this.total_pages = data.total_pages > 500 ? 500 : data.total_pages;
//       return data.results;
//     } catch (e) {
//       throw new Error(e.message);
//     }
//   }