import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import City from './components/City';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
 

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
   <Routes>
      <Route path="/"  element={<App />} />
      <Route path="city" element={<City />} />
    </Routes>
   
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 reportWebVitals();
