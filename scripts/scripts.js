const grid = document.querySelector(".grid");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId = null;
let goingRight = true;
let resultsDisplay = document.querySelector(".results");
let alliensRemoved =[];
let result = 0; 
for(let i = 0; i < 255; i++)
{
  const square = document.createElement("div");
  grid.appendChild(square);


}
const squares  = Array.from(document.querySelectorAll(".grid div"))
const allienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw(){
  for(let i = 0;i < allienInvaders.length;i++)
  {
     if(!alliensRemoved.includes(i))
     {
        squares[allienInvaders[i]].classList.add('invader');
     }
  }
  if(alliensRemoved.length === allienInvaders.length)
  {
    resultsDisplay= "YOU WIN";
    clearInterval(invadersId);
  }
}
draw();
 
function remove(){
  for(let i = 0;i < allienInvaders.length;i++)
  {
    squares[allienInvaders[i]].classList.remove('invader');
  }
}
squares[currentShooterIndex].classList.add("shooter");
function moveShooter(e)
{
 
  squares[currentShooterIndex].classList.remove("shooter");
  switch(e.key)
  {
    case 'ArrowLeft': 
    if(currentShooterIndex % width !== 0 ) currentShooterIndex-=1; break;
    case 'ArrowRight':
       
    if(currentShooterIndex % width < width - 1) currentShooterIndex +=1;
    break;
  }
  squares[currentShooterIndex].classList.add("shooter");

}

document.addEventListener("keydown", moveShooter);

function moveInvaders()
{
  const leftEdge = allienInvaders[0] % width === 0;
  const rightEdge = allienInvaders[allienInvaders.length - 1] % width === width -1;
  remove();
  if(rightEdge && goingRight){
    for(let i = 0; i < allienInvaders.length; i++)
    {
      allienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if(leftEdge && !goingRight)
  {
    for(let i = 0; i < allienInvaders.length; i++)
    {
      allienInvaders[i] += width - 1;
      goingRight = true;
      direction = 1;
    }
  }
  

    for(let i = 0; i < allienInvaders.length; i++)
    {
      allienInvaders[i] += direction;
    }

    draw();

    if(squares[currentShooterIndex].classList.contains("invader","shooter"))
    {
      resultsDisplay.InnerHtml = "Game Over";
      clearInterval(invadersId);
    }

    for(let i = 0; i < allienInvaders.length; i++)
    {  
      if(allienInvaders[i] > (squares.length ))
      { 
        resultsDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
      }

    }
}

invadersId=setInterval(moveInvaders, 50);
function shoot(e)
{
  let laserId
  let currentLaserIndex = currentShooterIndex;

  function moveLaser()
  {
    squares[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser');
    if(squares[currentLaserIndex].classList.contains('invader'))
    {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')
      setTimeout(() => {
          squares[currentLaserIndex].classList.remove("boom"); 
      }, 300);
      clearInterval(laserId);
      const allienRemoved = allienInvaders.indexOf(currentLaserIndex);
      alliensRemoved.push(allienRemoved)
       results++;
       resultsDisplay.innerHTML = results;
       console.log(allienRemoved);
    }
  }

  switch(e.key){
    case 'ArrowUp': laserId = setInterval(moveLaser,100);
  }

}

document.addEventListener('keydown',shoot);