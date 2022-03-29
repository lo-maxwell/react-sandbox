import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';

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

export default function Home() {
  const {dummy} = React.useState("dummy!");

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with styled-components!!
        </Typography>
        <Link href="SignUp" variant="body2"> Link to signup page</Link>
        <br/>
        <Link href="SignIn" variant="body2"> Link to signin page</Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
