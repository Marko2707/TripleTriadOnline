import React from 'react';

export default function Card({ card }) {
  // sum of all directional values
  const power =
    (card.top_value || 0) +
    (card.right_value || 0) +
    (card.bottom_value || 0) +
    (card.left_value || 0);
  
  //displays the card in this shape
  return (
    <div className="card">
      <h2>{card.name}</h2>
      <img src={card.image_url} alt={card.name} className="card-image" />

      <div className="stats">
        <div>Top: {card.top_value}</div>
        <div>Right: {card.right_value}</div>
        <div>Bottom: {card.bottom_value}</div>
        <div>Left: {card.left_value}</div>
      </div>

      <div>Rarity: {card.rarity}</div>
      <div>Power: {power}</div>
    </div>
  );
}

