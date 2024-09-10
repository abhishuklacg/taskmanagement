import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mockServer/mockHandler');

    return worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: {
          updateViaCache: 'none', 
        },
      },
      onUnhandledRequest: 'bypass',
    }).catch((error) => {
      console.error('Failed to start MSW:', error);
    });
  }
  return Promise.resolve();
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/mockServiceWorker.js', {
        updateViaCache: 'none',
      });
      await navigator.serviceWorker.ready; 
      console.log('Service worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
}

registerServiceWorker().then(() => {
  enableMocking().then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
