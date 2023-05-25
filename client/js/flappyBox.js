const audio = document.getElementById("audio-player");
const output = document.getElementById("value");
let myGamePiece;


const startTime = new Date().getTime();
const canvasWidth = 30;
const canvasHeight = 270;

function startGame() {
    myGamePiece = new slider(30, 15, "#ff00ffb0", 0, 75);
    myGameArea.start();
}

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[10]);
        this.interval = setInterval(updateGameArea, 25);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width*2, this.canvas.height*2);
    }
}

function slider(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.volume = y;

    this.hitBottom = function() {
      let rockbottom = myGameArea.canvas.height - this.height;
      if (this.y > rockbottom) {
          this.y = rockbottom;
      }
    }

    this.hitTop = function() {
      if (this.y <= this.height/2) {
          this.y = this.height/2 ;
      }
    }

    this.update = function() {
      let ball = color;
      let currentTime = new Date().getTime();
      let seconds = Math.trunc((currentTime - startTime) / 1000);
      if (seconds!= 0 && (seconds%2 == 0)){
        ball = "#00d5ffb0";
      }

      let ctx = myGameArea.context;
      ctx.beginPath();
      ctx.arc(this.width/2, this.y, this.width/2, 0, 2 * Math.PI);
      ctx.fillStyle = ball;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
        
    }
    this.newPos = function() {
        this.y += 2;
        this.hitBottom();
        this.hitTop();
        this.volume = 1 - ((this.y + this.height)/canvasHeight);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    audio.volume = myGamePiece.volume;
    output.innerHTML = Math.round(myGamePiece.volume * 100);
}

function accelerate() {
  myGamePiece.y -= 20;
}

function playSong() {
  audio.play();
};

function pauseSong() {
  audio.pause();
};

function stopSong() {
  audio.pause();
  audio.currentTime = 0;
};

