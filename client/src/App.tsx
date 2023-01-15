import React from 'react';
import Users from './components/Users';
import Landing from './components/Landing';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import  Signup  from './pages/Signup';
import  Login from './pages/Login';


const httpLink = new HttpLink({uri: 'http://localhost:4000'});
const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}`: null
    }
  }
})

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
        <Routes>
         <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users/>} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />

        </Routes> 
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
