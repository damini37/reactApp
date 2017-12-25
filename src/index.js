import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.css';
import $ from 'jquery';
import App from './App2';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
