import React from 'react';
import { render } from 'react-dom';
import Home from './components/home';

const appDiv = document.getElementById('app');

if (appDiv === null) {
  throw new Error('no app element');
} else {
  render(<Home />, appDiv);
}
