import './App.css';
import Header from './components/header';
import BoggleMatrix from './components/matrix';

function App() {
  
  return (
    <div className="app">
      <div className="app-wrapper">
        <Header title="Boggle Solver" subtitle="Fill in the board and click submit to solve the puzzle." />
        <BoggleMatrix />
      </div>
    </div>
  );
}

export default App;
