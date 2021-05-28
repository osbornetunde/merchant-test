import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ChakraProvider } from "@chakra-ui/react"
import App from './App'
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <Router>
              <ChakraProvider>
                  <App />
              </ChakraProvider>
          </Router>
      </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
