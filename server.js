const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/login', (req, res) => {

  res.send({
    token: 'test1234',
    dummy: 'dummy',
    dummyNum: Math.floor(Math.random()*100)
  });
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login !'));
