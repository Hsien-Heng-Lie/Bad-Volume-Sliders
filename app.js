const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const dbHandler = require("./server/src/dbHandler");
const openAI = require("./server/src/openAI");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

//middleware to log all methods to console
app.use('*', (req, _, next) => {
  console.log(`${req.method} on ${req.originalUrl}`);
  next();
});

//all public html pages
app.use(express.static('./client', {extensions:['html']}));

//allows access to fetch DB calls
app.get('/volumeslider/details', async (_, res) => {
  const details = await dbHandler.readVolumerSlider();
  res.write(JSON.stringify(details));
  res.end();
});

app.get('/volumeslider/reviews', async (req, res) => {
  const details = await dbHandler.readVolumerSliderReviews();
  res.write(JSON.stringify(details));
  res.end();
});

app.post('/volumeslider/update/click', async (req, res) => {
  const result = await dbHandler.updateVolumeSliderClick(req.body["name"]);
  res.write(JSON.stringify(result));
  res.end();
});

app.post('/volumeslider/review', async (req, res) => {
  const result = await dbHandler.createVolumeSliderReview(req.body["name"], req.body["review"], req.body["rating"]);
  res.write(JSON.stringify(result));
  res.end();
});

//calls to openAI API
app.get('/chat/:prompt', async (req, res) => {
  const response = await openAI.getAIResponse(req.params.prompt);
  res.json(response);
  res.end();
});

//root page
app.get('/', function(_, res){
  res.sendFile('index.html', { root: './client' , extensions:['html'] });
});

//any other routes go here
app.get('*', function(_, res){
  res.send('Sorry, this is an invalid URL.');//TODO: 404 page?
});
