var squares = document.querySelectorAll(".square");
var goalColorDisplay = document.querySelector("#goal_color");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("h1");
var reset = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

var numSquares = 6, colors = [], goalColor;

reset.addEventListener("click", function(){
  resetState();
});

init();
function init(){
  // mode button event listeners
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      numSquares = this.textContent === "Easy"?3:6;
      resetState();
    });
  }

  // add click listeners to squares
  for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.backgroundColor;

      if (clickedColor === goalColor){
        messageDisplay.textContent = "Correct";
        header.style.backgroundColor = clickedColor;
        reset.textContent = "Play Again?"
        changeColors(clickedColor);
      }else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }

  resetState();
}

function resetState(){
  header.style.backgroundColor = "steelblue";
  reset.textContent = "New Colors";
  messageDisplay.textContent = "";

  colors = generateRandomColors(numSquares);
  goalColor = colors[getRandom(colors.length)];
  goalColorDisplay.textContent = goalColor;

  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }else{
      squares[i].style.display = "none";
    }
  }
}

function changeColors(color){
  for(var i = 0; i < squares.length; i++)
    squares[i].style.backgroundColor = color;
}

function generateRandomColors(numberOfColors){
  var arr = [];
  for(var i = 0; i < numberOfColors; i++)
     arr.push("rgb(" + getRandom(256) + ", " + getRandom(256) + ", " + getRandom(256) + ")");
  return arr;
}

// returns a random integer in range [0, hi)
function getRandom(hi){
  return Math.floor(Math.random()*hi);
}
