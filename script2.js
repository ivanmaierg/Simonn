/* generar numero random, se corresponde con un array donde estan los 4 botones, se selecciona ese boton, se produce un sonido y color, el patron va quedando guardado en un array, el usuario tiene que tocar el boton correcto, incia el bucle pero llama otra vez a la funcion.*/

var colBtn = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var colClicked = [];

var start = false;
var nvl = 0;

$(document).keypress(function() {
  if (!start) {
    $("#titulo").text("Level " + nvl);
    nextSequence();
    start = true;
  }
});


$(".btn").click(function() {
  var colChoose = $(this).attr("id");
  colClicked.push(colChoose);

  playSound(colChoose);
  aniPressed(colChoose);
  
  checkAnswer(colClicked.length-1);
});

function checkAnswer(currentLevel) {
  
    if (gamePattern[currentLevel] === colClicked[currentLevel]) {
    if (colClicked.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#titulo").text("Game over, press any key to restart");
   
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    
    startOver() 
  }
}

function nextSequence() {
  colClicked = [];

  nvl++;
 
  $("#titulo").text("Level " + nvl);

  var numRandom = Math.floor(Math.random() * 4);
  var colRandom = colBtn[numRandom];
  gamePattern.push(colRandom);

  $("#" + colRandom)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(colRandom);
}

function playSound(name) {
  var audio = new Audio("Sounds/" + name + ".mp3");
  audio.play();
}

function aniPressed(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}
function startOver() {
    nvl = 0;
    gamePattern = [];
    start= false;
  }
  