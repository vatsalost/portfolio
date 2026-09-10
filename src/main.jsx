import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ProjectProvider } from './context/ProjectContext';
import { AudioProvider } from './context/AudioContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </ProjectProvider>
    </BrowserRouter>
  </React.StrictMode>
);
