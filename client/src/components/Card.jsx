import React from 'react';
import './Card.css';

export default function Card({ card }) {
  // sum of all directional values
  const power =
    (card.top_value || 0) +
    (card.right_value || 0) +
    (card.bottom_value || 0) +
    (card.left_value || 0);

  return (
    <div className="card">
      <div className="card-title-container">
        <h2 className="card-title">{card.name}</h2>
      </div>
      
      <div className="card-content">
        <div className="card-image-container">
          {/* Card values grouped slightly more centered */}
          <div className="card-values-overlay">
            <div className="values-group">
              <div className="top-value value">{card.top_value}</div>
              <div className="values-middle-row">
                <div className="left-value value">{card.left_value}</div>
                <div className="right-value value">{card.right_value}</div>
              </div>
              <div className="bottom-value value">{card.bottom_value}</div>
            </div>
          </div>
          
          <img src={card.image_url} alt={card.name} className="card-image" />
        </div>

        <div className="card-info">
          <div>Rarity: {card.rarity}</div>
          <div>Power: {power}</div>
        </div>
      </div>
    </div>
  );
}