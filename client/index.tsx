import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import App from './components/App';

document.addEventListener('DOMContentLoaded', (): void => {
  const el = document.getElementById('app');
  ReactDOM.render(<App />, el);
});
