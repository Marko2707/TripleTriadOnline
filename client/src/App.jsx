import { useState, useEffect } from 'react';
import './App.css';
import CardShowcase from './components/CardShowcase';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [cards, setCards] = useState([]);

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
      <CardShowcase cards={cards} />
    </div>
  );
}

export default App;
