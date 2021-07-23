const cache = {}

export const friendlyFetch = async url => {
  return (localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : normalFetch(url) ) 
}

const normalFetch = async url => {
  const result = await fetch(url)
  const movies = await result.json()
  localStorage.setItem(url, JSON.stringify(movies))
  return movies
}