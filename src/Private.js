import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Login from '../src/Login';
import useToken from './useToken';
import Button from '@mui/material/Button';

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

function resetLogin() {
  let myStorage = window.localStorage;
  console.log(myStorage.getItem('token'));

  myStorage.removeItem('token');
  window.location.reload(false);
}

export default function Private() {
  const {token, setToken} = useToken();
  const [count] = React.useState("abc");
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          You have logged in successfullly. This is a private page.
        </Typography>
        <Copyright />
        <Button variant="contained" onClick = {() => resetLogin()}> {token} </Button>
      </Box>
    </Container>
  );
}
