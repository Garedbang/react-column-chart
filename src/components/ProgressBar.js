import React from 'react';

import pause from '../images/pause.svg';
import play from '../images/play.svg';

const ButtonStates = {
  play: 'play',
  pause: 'pause'
};

const ImageForButtonState = {
  [ButtonStates.play]: play,
  [ButtonStates.pause]: pause
};

export { ButtonStates };

export default ({ values, value, buttonState, onButtonClick, onClick }) => (
  <div className="progress-bar">
    <button type="button" onClick={onButtonClick}>
      <img
        src={ImageForButtonState[buttonState]}
        alt={`timer ${ImageForButtonState[buttonState]} button`}
      />
    </button>
    <div className="progress-grid">
      <div />
      <ul>
        {(values || []).map(item => (
          <li key={item} className={item === value ? 'active' : ''}>
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                onClick(item);
              }}
            >
              {item === value ? item : ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
