import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Results from './components/results';
import BoggleMatrix from './components/matrix';

function App() {

  const [results, setResults] = useState<Array<string>>(["no results"]);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app">
      <div className='settings'>
        <button className='settings-button' onClick={() => window.location.reload()}>New Game</button>
        <button className='settings-button' onClick={() => setShowSettings(true)}>Settings / Rules</button>
      </div>
      <div className="app-wrapper">
        {showSettings ? (
          <div className="settings-modal">
            <div className="settings-modal-content">
              <h2>Settings</h2>
              <p>Settings go here</p>
              <button onClick={() => setShowSettings(false)}>Close</button>
            </div>
          </div>
        ) : (
          <>
            <Header title="Boggle 🎲"/>
            <BoggleMatrix setResults={setResults} />
            <Results results={results} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;