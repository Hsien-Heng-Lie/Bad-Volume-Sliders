const sql = require("mssql");
const dbConnect = require('./dbConnectService');

async function readVolumerSlider() {
  const conn = await dbConnect

  const request = new sql.Request(conn);

  const query = `SELECT
  vs.id,
  vs.Name,
  vsc.Clicks,
  ROW_NUMBER() OVER(ORDER BY vsc.Clicks DESC) AS [Row]
 FROM [dbo].[VolumeSlider] AS vs
 INNER JOIN [dbo].[VolumeSliderClicks] AS vsc
 ON vsc.VolumeSliderId = vs.Id
 ORDER BY [Row] ASC`;

 

  const result = await request.query(query);
  return result.recordset;
};

async function updateVolumeSliderClick(name) {
  const conn = await dbConnect

  const request = new sql.Request(conn);
  const query = 'EXEC	[dbo].[sp_UpsertVolumeSlider] @Name = \'' + name + '\''; 

  console.log(name);
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


module.exports = {
  readVolumerSlider: function(){
    return readVolumerSlider();
  },
  updateVolumeSliderClick: function(name){
    return updateVolumeSliderClick(name);
  },
  createVolumeSliderReview: function(name, review, rating){
    return createVolumeSliderReview(name, review, rating);
  }
};
