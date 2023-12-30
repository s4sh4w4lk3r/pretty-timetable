import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './api/graphql/apolloClient'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
