import React from 'react';
import Card from './Card';
import './CardShowcase.css';

export default function CardShowcase({ cards }) {
  return (
    <div className="cards-container">
      {cards.length === 0 ? (
        <p>Keine Karten gefunden.</p>
      ) : (
        cards.map(card => <Card key={card.id} card={card} />)
      )}
    </div>
  );
}
