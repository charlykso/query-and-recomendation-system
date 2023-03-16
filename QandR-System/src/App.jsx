import { useState } from 'react'
import reactLogo from './assets/react.svg'
import apis from './api/index'


function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState({})
  const newmovies = apis.getAllMovies().then(movie => {
    setMovies(movie.data.data);
  })

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card text-center'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className='text-center'>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {movies.map((m) => (
          <h4 className='text-red-400'>{m.name}</h4>
        ))}
      </div>
    </div>
  )
}

export default App
