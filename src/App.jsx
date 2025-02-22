import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import './App.css'
import { updateSearchTerm } from './appwrite'

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
}

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [debouncedSearchItem, setDebouncedSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [movieList, setMovieList] = useState([]);

  useDebounce(() => setDebouncedSearchItem(searchItem), 1000, [searchItem]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMsg('');
  
    try {
      const endpoints = query? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}` : `${import.meta.env.VITE_TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
      const res = await fetch(endpoints, API_OPTIONS);
  
      if(!res.ok) throw new Error("Failed to fetch movies");
  
      const data = await res.json();
  
      if (data.Response === 'False') {
        setErrorMsg(data.Error || 'Failed to fetch movies');
        setMovieList([]);
  
        return
      }
  
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchTerm(query, data.results[0])
      }
    } catch (err) {
      console.error(`Error fetching movies: ${err}`);
  
      setErrorMsg('Error fetching movies! Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchItem)
  }, [debouncedSearchItem]);

  return (
    <main>
      <div className="pattern">

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>

            <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
          </header>

          <section className='all-movies'>
            <h2 className='mt-[40px]'>All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMsg ? (
              <p className="text-red-500">{errorMsg}</p>
            ) : (
              <ul>
                {movieList.map(movie => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
