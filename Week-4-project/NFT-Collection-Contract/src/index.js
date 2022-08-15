import React from 'react';
import ReactDOM from 'react-dom';
import {
    ContractKitProvider,
    Alfajores,
    NetworkNames,
} from '@celo-tools/use-contractkit';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";


ReactDOM.render(
    <React.StrictMode>
       
      dapp={{
        name: 'MYNFT COLLECTION ',
        description: 'Minter.',
        url: '//',
      }}
    
      <App />
   
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();