const express = require('express');
const dbHandler = require("./server/src/dbHandler");
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json())

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

//any other public page
app.use(express.static('./client', {extensions:['html']}));

//logs all methods to console
app.use('*', (req, res, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//allows access to fetch DB calls
app.get('/volumeslider/details', async (req, res, next) => {
  const details = await dbHandler.readVolumerSlider();
  res.write(JSON.stringify(details));
  res.end();
});

app.post('/volumeslider/update/click', async (req, res, next) => {
  const result = await dbHandler.updateVolumeSliderClick(req.body["name"]);
  res.write(JSON.stringify(result));
  res.end();
});

app.post('/volumeslider/review', async (req, res, next) => {
  const result = await dbHandler.createVolumeSliderReview(req.body["name"], req.body["review"], req.body["rating"]);
  res.write(JSON.stringify(result));
  res.end();
});

//root page
app.get('/', function(req, res){
  res.sendFile('index.html', { root: './client' , extensions:['html'] });
});

//any other routes go here
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');//TODO: 404 html page?
});