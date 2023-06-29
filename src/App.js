import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading, fetchError } = useMovies({ search, sort })

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedHandleChange(newSearch)
  }
  const debouncedHandleChange = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies])

  return (
    <div className='page'>
      <header className='header'>
        <h1 className='title'>STREAMBERRY</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='search' type='text' placeholder='Avenger, Star Wars, the...'
          />
          <button type='submit'>Search</button>
        </form>

        <div className='sort'>
          <p className='sortText' htmlFor='sort'>Sort by Year</p>
          <input className='sortCheckbox' type='checkbox' onChange={handleSort} checked={sort} />
        </div>

        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
        {search && <h2>Results for: {search}</h2>}
      </header>

      <main className='main'>
        {loading
          ? <p>Loading...</p>
          : <Movies movies={movies} />}
        {fetchError && <p style={{ color: 'red' }} className='error'>{fetchError}</p>}

      </main>

    </div>

  )
}

export default App
