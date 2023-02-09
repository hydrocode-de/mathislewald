import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// import some contexts
import { SettingsProvider } from './context/settings';
import { DataProvider } from './context/data';
import { LayersProvider } from './context/layers';
import { OfflineProvider } from './context/offline';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <OfflineProvider>
        <DataProvider>
          <LayersProvider>
            <App />
          </LayersProvider>
        </DataProvider>
      </OfflineProvider>
    </SettingsProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
