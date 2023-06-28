import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }
  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header className='header'>
        <h1 className='title'>Streamberry</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='search' type='text' placeholder='Avenger, Star Wars, the...'
          />
          <button type='submit'>Search</button>

        </form>
        {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
      </header>

      <main className='main'>
        <Movies movies={movies} />
      </main>

    </div>

  )
}

export default App
