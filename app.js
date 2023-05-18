const express = require('express');
const dbHandler = require("./server/src/dbHandler");

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
  const Audio = await dbHandler.readIndividualDetails(req.params.id);
  res.write(JSON.stringify(Audio));
  res.end();
});

app.get('/audio/details', async (req, res, next) => {
  const details = await dbHandler.readAudioDetail();
  res.write(JSON.stringify(details));
  res.end();
});

app.get('/audio/links', async (req, res, next) => {
  const links = await dbHandler.readAudioLink();
  res.write(JSON.stringify(links));
  res.end();
});

//root page
app.get('/', function(req, res){
  res.sendFile('index.html', { root: './client' , extensions:['html'] });
});

//any other public page
app.use(express.static('./client', {extensions:['html']}));

//any other routes go here
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');//TODO: 404 html page?
});
