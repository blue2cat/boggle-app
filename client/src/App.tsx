import './App.css';
import Header from './components/header';
import BoggleMatrix from './components/matrix';

function App() {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Header title="Boggle 🎲" />
        <BoggleMatrix />
      </div>
    </div>
  );
}

export default App;