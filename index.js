var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["green","red","yellow","blue"];
var level=0;
var started=false;


$(".btn").click( function (){
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout( function(){
        nextSequence();
      },1000  );
    }
  }else{
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");

    restart();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level+=1;
  $("h1").text("Level "+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour= buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  var color="#"+randomChosenColour;
  $(color).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function playSound(name){
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}





function restart(){
  level=0;
  started=false;
  gamePattern=[];
}
