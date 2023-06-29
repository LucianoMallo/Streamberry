import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef({ search })

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current.search) return

    try {
      setLoading(true)
      setFetchError(null)
      previousSearch.current.search = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setFetchError(e.message)
    } finally {
      setLoading(false)
    }
  }
  , [])

  // useMemo this allows us to memoize the sortedMovies array
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.year.localeCompare(b.year))
      : movies
  }, [sort, movies]
  )
  return { movies: sortedMovies, getMovies, loading, fetchError }
}
