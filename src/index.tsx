import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(
  document.getElementById('root')! as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


