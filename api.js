const axios = require('axios').default;
const API_KEY = 'fb004e4abca32d863159f82fef891490';


export function getMovies(){
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
}

export function getPoster(path){
    return axios.get(`https://image.tmdb.org/t/p/w500${path}`)
}