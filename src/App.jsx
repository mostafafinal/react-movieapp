import Search from './components/Search'
import { useState } from 'react'
import './App.css'

function App() {
  const [searchItem, setSearchItem] = useState('');

  return (
    <main>
      <div className="pattern">

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>
          </header>

          <Search searchItem={searchItem} setSearchItem={setSearchItem}/>
          <h1 className="text-white">{searchItem}</h1>
        </div>
      </div>
    </main>
  )
}

export default App
