import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/Home';
import SignUp from '../src/SignUp';
import SignIn from '../src/SignIn';
import Private from '../src/Private';
import Login from '../src/Login';
import NotFound from '../src/NotFound';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  // const [token, setToken] = React.useState();
  //
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/signup' element={<SignUp/>}></Route>
      <Route exact path='/signin' element={<SignIn/>}></Route>
      <Route exact path='/private' element={<Private/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  );
}
