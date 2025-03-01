import './App.css';
import { Header } from './components/header';

function App() {
  // Request a new board from the server
  fetch("/api/randomBoard")
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });

  return (
    <div className="app">
      <div className="app-wrapper">
        <Header title="Boggle Solver" subtitle="Fill in the board and click submit to solve the puzzle." />
        <div id="table-wrapper">
          <div id="table">

          </div>
          <button className='button'>Submit this board</button>
        </div>
      </div>
    </div>
  );
}

export default App;
