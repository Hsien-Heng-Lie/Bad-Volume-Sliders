const express = require('express');
const path = require('path');
const dbHandler = require("./dbHandler");
const Audio = require('./audioClass');

const app = express();
const port = 4000;

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

//logs all methods to console
app.use('*', (req, res, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//allows access to fetch DB calls
app.get('/audio/detail/:id', async (req, res, next) => {
  const Audio = await dbHandler.readIndividualDetails(req.params.id);//example, not sure if needed
  res.write(JSON.stringify(Audio));
  res.end();
});

app.get('/audio/detail', async (req, res, next) => {
  const details = await dbHandler.readAudioDetail();
  res.write(JSON.stringify(details));
  res.end();
});

app.get('/audio/link', async (req, res, next) => {
  const links = await dbHandler.readAudioLink();
  res.write(JSON.stringify(links));
  res.end();
});

app.get('/', function(req, res){
  res.sendFile('index.html', { root: path.join(__dirname, '../../FE/src') })
});

app.get('/song', function(req, res){
  res.sendFile('song.html', { root: path.join(__dirname, '../../FE/src') })
});

app.get('/stats', function(req, res){
  res.sendFile('stats.html', { root: path.join(__dirname, '../../FE/src') })
});

app.get('/volume', function(req, res){
  res.sendFile('volume.html', { root: path.join(__dirname, '../../FE/src') })
});

//any other routes go here
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');//TODO: 404 html page?
});
