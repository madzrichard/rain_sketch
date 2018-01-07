
var rain = [];
var sound = [];
var amplitude;
var cnv;
var level;
var spread;
var counter= 0;
var blues;
var reds;
var yellows;
var clickMe = true;
var clickPic;



function preload(){
  sound = [loadSound('faded.mp3'), loadSound('amber.mp3'), loadSound('happy_little_pill.mp3')]; 
	
	clickPic = loadImage("clickme.png");
}



function setup() {
cnv = createCanvas(windowWidth, windowHeight);
noStroke();
blues = color(0,71,171);
reds = color(255,56,0);
yellows = color(255,191,0);
	
amplitude = new p5.Amplitude();
	
  for (var i = 0; i < 100; i++) {
    rain.push(new drop(random(0, windowWidth), random(0, windowHeight), random(1, 3)));
  }
	
	

  cnv.mouseClicked(function() {
    if (sound[0].isPlaying() ){
	    sound[0].stop();
        sound[1].play();
		clickMe = false;
    }else if(sound[1].isPlaying() ){
		sound[1].stop();
		sound[2].play();
		clickMe = false;
	}else if(sound[2].isPlaying() ){
		sound[2].stop();
		clickMe = true;
	}else {
      sound[0].play();
		clickMe = false;
    }
	 
  });
	
	cnv.mouseReleased(function(){
		counter++;
		if(counter>3){
			counter = 0;
		}
	});
	
}

function draw() {
  fill(0, 25); //black gets redraw in opacity so that drops fade out//
  rect(0, 0, width, height);
  for (var i = 0; i < rain.length; i++) {
    rain[i].displ();
  }
	
  level = amplitude.getLevel();
  spread = map(level, 0, 1, 0, 100);
  textSize(17);
  text("Move Mouse Back and Forth to Change Falling Speed",60,windowHeight - 50,600,100);
  text("Click anywhere to change song",windowWidth - 300,windowHeight - 50, 600,100);
	
	
	if (clickMe == true){
		image(clickPic,windowWidth/2-350,windowHeight/2-100,700,200);
	}
}
	
	

function drop(x, y, sp) {
  var x1 = x;
  var y1 = y;
  var sp;

  this.displ = function() {
    var mx = mouseX / 100;
    if (mx <= 0) {
      mx = 0.05;
    }
    y1 = y1 + sp * mx;

	
	if(counter == 1){
		fill(blues);
	}else if(counter == 2){
		fill(reds);
	}else if(counter==3){
		fill(yellows);
	}else{
		fill(0);
	}
	
	ellipse(x1,y1,spread,spread);

    if (y1 >= windowHeight - 95) {
      ellipse(x1, windowHeight - random(85, 95) + spread/2, spread * random(2,4), random(5,7) * spread/10);
      y1 = -120;
    }
  }

}