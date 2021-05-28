import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import {RecoilRoot} from "recoil";
import { ChakraProvider } from "@chakra-ui/react"
import {ToastProvider} from "react-toast-notifications";
import App from './App'
import './index.css';


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <ToastProvider placement={'top-right'} autoDismiss={true}>
          <Router>
              <ChakraProvider>
                  <RecoilRoot>
                  <App />
                  </RecoilRoot>
              </ChakraProvider>
          </Router>
          </ToastProvider>
      </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
