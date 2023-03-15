import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), _jsx(BrowserRouter, { children: _jsx(App, {}) }));
