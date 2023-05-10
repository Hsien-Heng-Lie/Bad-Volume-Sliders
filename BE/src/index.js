const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

//catch all
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');//TODO: 404 html page?
});

app.listen(4000);