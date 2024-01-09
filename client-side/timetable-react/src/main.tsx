import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './api/graphql/apolloClient'

// import Keycloak from 'keycloak-js'
// import envConfig from '../envConfig'

// const kc = new Keycloak({
//   url: envConfig.auth.address,
//   clientId: envConfig.auth.clientId,
//   realm: envConfig.auth.realm
// });


// try {
//   const authenticated = await kc.init({onLoad: 'login-required'});
//   console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
// } catch (error) {
//   console.error('Failed to initialize adapter:', error);
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
