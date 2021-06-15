import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/style.css'
import Main from './components/main-component';
import {BrowserRouter as Router, Route} from 'react-router-dom';


ReactDOM.render(
<Router basename={process.env.PUBLIC_URL}><Route path='/' exact component={Main} /></Router>,
  document.getElementById('root')
);


