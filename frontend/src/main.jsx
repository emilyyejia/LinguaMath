import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import './index.css';
import App from './pages/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Capacitor StatusBar
import { StatusBar, Style } from '@capacitor/status-bar';

// Configure status bar for iOS
StatusBar.setOverlaysWebView({ overlay: false }); // ensures navbar is below status bar
StatusBar.setStyle({ style: Style.Dark });       // optional, dark icons

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router> 
  </StrictMode>,
);
