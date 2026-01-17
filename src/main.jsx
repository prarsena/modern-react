import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { todosSlice } from './slices/todosSlice.js';
import { loadingSlice } from './slices/loadingSlice.js';
import './styles/index.css';
import App from './App.jsx'

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    loading: loadingSlice.reducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
