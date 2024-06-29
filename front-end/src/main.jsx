import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'antd/dist/reset.css';
import CanvasAnimation from './CanvasAnimation'; // Adjusted import path if necessary

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <CanvasAnimation />
      <App />
  
  </React.StrictMode>
);
