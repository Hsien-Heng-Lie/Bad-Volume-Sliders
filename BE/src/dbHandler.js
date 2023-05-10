const sql = require("mssql/msnodesqlv8");
const dbConnect = require('./dbConnectHandler');

const readAudioDetail = async () => {
  const conn = await dbConnect

  const request = new sql.Request(conn);
  
    const query = `SELECT *
  FROM [dbo].[AudioDetail]`;
  
    const result = await request.query(query);
  
    console.dir(result)
};


const readAudioLink = async () => {
  const conn = await dbConnect

  const request = new sql.Request(conn);
  
    const query = `SELECT 
    ad.Title,
    ad.Artist,
    af.[FileName],
    af.[Path]
  FROM dbo.AudioLink AS al
    INNER JOIN dbo.AudioFIle AS af
    ON al.AudioFileId = af.Id
    INNER JOIN dbo.AudioDetail AS ad
    ON al.AudioDetailId = ad.Id`;
  
    const result = await request.query(query);
  
    console.dir(result)
};

module.exports = {
  readAudioDetail: function(){
    readAudioDetail();
  },
  readAudioLink: function(){
    readAudioLink();
  },
};
