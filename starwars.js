import { friendlyFetch } from './friendly-fetch.js';
import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';

const API_ENDPOINT = 'https://swapi.dev/api'

const MUSIC = {
    audioUrl: './audio/tema-sw.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
}

play(MUSIC, document.body);

const intToRoman = (int) => {
    const intToRomanDict = {1: 'I',2: 'II',3: 'III',4: 'IV',5: 'V',6: 'VI'}
    return intToRomanDict[int];
}

const createMovieListItem = (movie) =>{
  const {opening_crawl, episode_id, title} = movie
  const movieList = document.getElementById('filmes');
  const movieItem = document.createElement('li');
  const romanId = intToRoman(episode_id);
  movieItem.innerHTML = "EPISODE " + romanId.padEnd(3) + " - " + title.toUpperCase();
  movieItem.addEventListener('click', e => {
      const intro = document.getElementsByTagName("pre")[0];
      intro.innerHTML = "Episode " + romanId + "\n" + title.toUpperCase() + "\n" + opening_crawl;
      restartAnimation(intro);
  });
  movieList.appendChild(movieItem);
}

friendlyFetch(API_ENDPOINT + "/films")
.then(movies => {
    const sortedMovies = movies.results.sort((a, b) => 
        (a.episode_id > b.episode_id) ? 1 : -1
    );
    sortedMovies.forEach(createMovieListItem);
});