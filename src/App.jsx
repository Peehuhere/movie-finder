import React, { useState } from 'react'
import movies from './movies.json'

const App = () => {

  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchMovie = () => {

    setLoading(true)
    setSearched(true)
    setSelectedMovie(null)

    setTimeout(() => {

      const filteredMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase())
      })

      setResults(filteredMovies)
      setLoading(false)

    }, 900)
  }

  return (

    <div className="app">

      {/* Animated background */}

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>
      <div className="glow glow-three"></div>


      {/* MAIN */}

      <main className="main">

        {/* LOGO */}

        <div className="logo">
          <span className="logo-icon">✦</span>
          Movie<span>Finder</span>
        </div>


        {/* HERO */}

        <section className="hero">

          <p className="eyebrow">
            BOLLYWOOD • HINDI CINEMA
          </p>

          <h1>
            What are you
            <span> watching tonight?</span>
          </h1>

          <p className="subtitle">
            Find your next favourite movie.
          </p>


          {/* SEARCH */}

          <div className="search-wrapper">

            <div className="search-box">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search a movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchMovie()
                  }
                }}
              />

              {search && (
                <button
                  className="clear"
                  onClick={() => setSearch('')}
                >
                  ×
                </button>
              )}

            </div>

            <button
              className="search-button"
              onClick={searchMovie}
            >
              Search
              <span>→</span>
            </button>

          </div>

        </section>


        {/* RESULTS */}

        {searched && (

          <section className="results-section">

            {loading ? (

              <div className="loading">

                <div className="loader"></div>

                <p>Finding your movie...</p>

              </div>

            ) : (

              <>

                {results.length > 0 ? (

                  <>

                    <div className="results-heading">

                      <div>
                        <p className="eyebrow">
                          SEARCH RESULTS
                        </p>

                        <h2>
                          {results.length} movie
                          {results.length !== 1 && 's'}
                        </h2>
                      </div>

                      <span>
                        "{search}"
                      </span>

                    </div>


                    {/* MOVIE GRID */}

                    <div className="movie-grid">

                      {results.map((movie) => (

                        <article
                          key={movie.id}
                          className="movie-card"
                          onClick={() => setSelectedMovie(movie)}
                        >

                          <div className="movie-number">
                            {String(movie.id).padStart(2, '0')}
                          </div>


                          <div className="rating">
                            ★ {movie.rating}
                          </div>


                          <div className="movie-content">

                            <p className="movie-year">
                              {movie.year}
                            </p>

                            <h3>
                              {movie.title}
                            </h3>

                            <p className="movie-genre">
                              {movie.genre}
                            </p>

                            <p className="movie-description">
                              {movie.description}
                            </p>

                          </div>


                          <div className="card-bottom">

                            <span>
                              {movie.runtime} min
                            </span>

                            <span className="view">
                              View details
                              <b>↗</b>
                            </span>

                          </div>

                        </article>

                      ))}

                    </div>

                  </>

                ) : (

                  <div className="no-results">

                    <div className="film-icon">
                      ✦
                    </div>

                    <h2>
                      Nothing found
                    </h2>

                    <p>
                      We couldn't find a movie called "{search}".
                    </p>

                  </div>

                )}

              </>

            )}

          </section>

        )}

      </main>


      {/* MOVIE DETAIL */}

      {selectedMovie && (

        <div
          className="modal-background"
          onClick={() => setSelectedMovie(null)}
        >

          <div
            className="movie-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>


            <div className="modal-accent"></div>


            <p className="eyebrow">
              MOVIE DETAILS
            </p>


            <h2>
              {selectedMovie.title}
            </h2>


            <div className="modal-info">

              <span>
                {selectedMovie.year}
              </span>

              <span>
                ★ {selectedMovie.rating}
              </span>

              <span>
                {selectedMovie.runtime} min
              </span>

            </div>


            <p className="modal-description">
              {selectedMovie.description}
            </p>


            <div className="details">

              <div>
                <small>GENRE</small>
                <p>{selectedMovie.genre}</p>
              </div>

              <div>
                <small>DIRECTOR</small>
                <p>{selectedMovie.director}</p>
              </div>

              <div>
                <small>LANGUAGE</small>
                <p>{selectedMovie.language}</p>
              </div>

            </div>


            <button
              className="modal-button"
              onClick={() => setSelectedMovie(null)}
            >
              Back to results
              <span>→</span>
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default App