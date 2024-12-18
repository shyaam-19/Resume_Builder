import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
// import store from './component/store';
import { store } from './component/store/index';
// import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')).render(

    <CookiesProvider>
    
      <BrowserRouter>
    
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
    
            <App />
          {/* </PersistGate> */}
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
)
