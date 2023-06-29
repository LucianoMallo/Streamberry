import placeholderImage from '../assets/placeholder.png'

function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
          movies.map((movie) =>
            <li className='movie' key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Year: {movie.year}</p>
              {console.log(movie.poster)}
              <img src={movie.poster !== 'N/A' ? movie.poster : placeholderImage} alt={movie.title} />
            </li>)
        }
    </ul>
  )
}

function NoMovieCard () {
  return (
    <p>no results found</p>
  )
}
export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMovieCard />
  )
}
