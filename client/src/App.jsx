import { useState, useEffect } from 'react';
import './App.css';
import CardShowcase from './components/CardShowcase';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [cards, setCards] = useState([]);
  const [view, setView] = useState('home'); // 'home' | 'cards' | 'placeholder'

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(res => res.json())
      .then(data => setBackendMessage(data.message))
      .catch(console.error);

    fetch('http://localhost:5000/api/cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Triple Triad</h1>
      <p>Backend-Status: {backendMessage || 'Verbinde…'}</p>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('cards')}>Show Cards</button>
        <button onClick={() => setView('placeholder')}>Placeholder</button>
      </div>

      {view === 'cards' && <CardShowcase cards={cards} />}
      {view === 'placeholder' && <p>This is a placeholder view.</p>}
    </div>
  );
}

export default App;
