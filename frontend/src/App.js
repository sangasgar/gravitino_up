import './App.css';
import gravitinoLogo from './images/gravitino-logo.svg'

function App() {
   
   return (
    <div className="App">
      <header className="App-header">
        <img src={gravitinoLogo} width={600} height={300} className="App-logo" alt="logo" />
        <p>
          Разработка Gravitino Управление Проектами
        </p>
        <a
          className="App-link"
          href="https://gravitino.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Подробнее
        </a>
      </header>
    </div>
  );
}

export default App;
