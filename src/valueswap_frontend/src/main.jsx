import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './Store';
import { AuthProvider } from './components/utils/useAuthClient';
import { PrimeReactProvider } from 'primereact/api'; 
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';;
        
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PrimeReactProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </PrimeReactProvider>
  </Provider>,
);
