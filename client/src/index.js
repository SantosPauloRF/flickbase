import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />
);

