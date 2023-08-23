import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import ModalContextProvider from './context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalContextProvider>
        <Router>
          <Routes>
            <Route path='*' element={<App />}/>
          </Routes>
        </Router>
     </ModalContextProvider>
    </Provider>
  </React.StrictMode>,
  
)
