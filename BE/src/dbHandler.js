const sql = require("mssql/msnodesqlv8");
const dbConnect = require('./dbConnectHandler');
const { text } = require("express");
const Audio = require('./audioClass');

const readAudioDetail = async () => {
  const conn = await dbConnect

  const request = new sql.Request(conn);

    const query = `SELECT
    ad.id,
    ad.Title,
    ad.Artist,
    af.[FileName],
    af.[Path]
  FROM dbo.AudioLink AS al
    INNER JOIN dbo.AudioFIle AS af
    ON al.AudioFileId = af.Id
    INNER JOIN dbo.AudioDetail AS ad
    ON al.AudioDetailId = ad.Id`;

    let audioDetails = [];

    const result = await request.query(query);

    let audioResult = result.recordset;

    audioResult.map(function(item){
      audioDetails.push(
        item.id,
        item.Title,
        item.Artist,
        item.Path,
        item.FileName
      )
    }
    
    )

    console.dir(audioDetails)

    return result;
};


const readAudioLink = async () => {
  const conn = await dbConnect

  const request = new sql.Request(conn);

    const query = `SELECT
    ad.id,
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

    return result;
};

async function readIndividualDetails(id){
  const conn = await dbConnect

  const request = new sql.Request(conn);

    const query = `SELECT
      ad.id,
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
    let audioResult = result.recordset.find(e => e.id == 1)
    const audio = new Audio(
      audioResult.id,
      audioResult.Title,
      audioResult.Artist,
      audioResult.Path,
      audioResult.FileName
    );
    console.dir(audioResult);

    return audio;
}

module.exports = {
  readAudioDetail: function(){
    return readAudioDetail();
  },
  readAudioLink: function(){
    return readAudioLink();
  },
  readIndividualDetails: function(id){
    return readIndividualDetails(id);
  }
};
