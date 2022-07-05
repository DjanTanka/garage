import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { store } from '../store/store';
import '../src/styles/globals.scss'; 
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  // uri: ' https://garage-project-server.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const tokenA = localStorage.getItem('usersTokenAGarage');
  const tokenR = localStorage.getItem('usersTokenRGarage');
  return {
    headers: {
      ...headers,
      authorizationa: tokenA ? `${tokenA}` : "",
      authorizationr: tokenR ? `${tokenR}` : "",
      'Access-Control-Allow-Origin' : '*'
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  ) 
}
export default MyApp
