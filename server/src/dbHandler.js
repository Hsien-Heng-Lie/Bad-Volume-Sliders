const sql = require("mssql");
const dbConnect = require('./dbConnectService');

async function readVolumerSlider() {
  const conn = await dbConnect

  const request = new sql.Request(conn);

  const query = `EXEC	[dbo].[sp_ReadLeaderBoard]`;

  const result = await request.query(query);
  return result.recordset;
};

async function readVolumerSliderReviews() {
  const conn = await dbConnect

  const request = new sql.Request(conn);

  const query = `EXEC	[dbo].[sp_ReadReviews]`;

  const result = await request.query(query);
  return result.recordset;
};

async function updateVolumeSliderClick(name) {
  const conn = await dbConnect

  const request = new sql.Request(conn);
  const query = 'EXEC	[dbo].[sp_UpsertVolumeSlider] @Name = \'' + name + '\''; 
  const result = await request.query(query);
  return result.output;
};

async function createVolumeSliderReview(name, review, rating) {
  const conn = await dbConnect

  const request = new sql.Request(conn);

  console.log(review + " " + rating);

  const query = 'EXEC [dbo].[sp_CreateReview] @Name = \'' + name + '\',' +
  '@Review = \'' + review + '\',' +
  '@Rating = ' + rating; 
  
  const result = await request.query(query);
  return result.output;
};

async function readKey(name) {
  const n = 'OpenAI';
  const conn = await dbConnect
  const request = new sql.Request(conn);
  //const query = 'EXEC [dbo].[sp_ReadKey] @Name = \'' + name
  const query = 'EXEC	[dbo].[sp_ReadKey] @Name = \'' + n + '\''; 
  const result = await request.query(query);
  return result.recordset;
};



module.exports = {
  readVolumerSlider: function(){
    return readVolumerSlider();
  },
  readVolumerSliderReviews: function(){
    return readVolumerSliderReviews();
  },
  updateVolumeSliderClick: function(name){
    return updateVolumeSliderClick(name);
  },
  createVolumeSliderReview: function(name, review, rating){
    return createVolumeSliderReview(name, review, rating);
  },
  readKey: function(name){
    return readKey(name);
  }
};
