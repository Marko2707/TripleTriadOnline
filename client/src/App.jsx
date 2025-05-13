import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Test-Endpoint
    fetch('http://localhost:5000/api/test')
      .then(res => res.json())
      .then(data => setBackendMessage(data.message))
      .catch(console.error);

    // Karten vom Backend holen
    fetch('http://localhost:5000/api/cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Triple Triad</h1>
      <p>Backend-Status: {backendMessage || 'Verbinde…'}</p>

      <div className="cards-container">
        {cards.length === 0
          ? <p>Keine Karten gefunden.</p>
          : cards.map(card => (
              <Card key={card.id} card={card} />
            ))
        }
      </div>
    </div>
  );
}

export default App;
