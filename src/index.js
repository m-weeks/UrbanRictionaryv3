import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './font/MS-Sans-Serif.eot';
import './font/MS-Sans-Serif.ttf';
import './font/MS-Sans-Serif.woff';
import './font/MS-Sans-Serif.woff2';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
