import React from 'react';
import { render } from 'react-dom';

// import postReducer from './reducers/postReducer';

// import '../css/style.scss';

// import Home from './components/home';

// import { Provider } from 'react-redux';
// import Store from './reducers/store';
import Home from './components/home';

const appDiv = document.getElementById('app');

if (appDiv === null) {
  throw new Error('no app element');
} else {
  render(<Home />, appDiv);
}
