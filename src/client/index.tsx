import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', (): void => {
  const el = document.getElementById('app');
  ReactDOM.render(<h1>Pokedex</h1>, el);
});
