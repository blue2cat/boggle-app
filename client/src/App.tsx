import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Results from './components/results';
import BoggleMatrix from './components/matrix';

function App() {

  const [results, setResults] = useState<Array<string>>([]);
  
  return (
    <div className="app">
      <div className="app-wrapper">
        <Header title="Boggle 🎲" subtitle="Play a game of classic Boggle right from your browser." />
        <BoggleMatrix setResults={setResults} />
        <Results results={results} />
      </div>
    </div>
  );
}

export default App;