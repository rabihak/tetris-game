const width = 10;
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
let Scoredisp = document.querySelector('.score');
let interval;
let score =0
const L = [
  [1, width+1, width*2+1, 2],
  [width, width+1, width+2, width*2+2],
  [1, width+1, width*2+1, width*2],
  [width, width*2, width*2+1, width*2+2]
]

const Z = [
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1],
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1]
]

const T = [
  [1,width,width+1,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width,width+1,width*2+1]
]

const O = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
]

const I = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]
]

const wrap = [L,Z,I,O,T]
let startpos = 4;
let rotation =0
let rand = Math.floor(Math.random()*wrap.length)
let current = wrap[rand][rotation]
console.log(rand);
function draw(){
  current.forEach(function(index){
    squares[startpos + index].classList.add('shapes');
  })
}
function del() {
  current.forEach(index => {
    squares[startpos + index].classList.remove('shapes')
  })
}
function stop(){
  if(current.some(index =>
    squares[startpos+index+width].classList.contains('end')
  ))
  {
    current.forEach(index =>
      squares[startpos+index].classList.add('end')
    )
    rand = Math.floor(Math.random()*wrap.length)
    current= wrap[rand][rotation]
    startpos=4
    draw()
    addScore()
  }
}
function moveLeft(){
  del()
  const isleft = current.some(index => (startpos + index) % width == 0 )
  if(!isleft){
    startpos -=1
  }
  if(current.some(index=> squares[startpos + index].classList.contains('end'))){
    startpos +=1
  }
  draw()
}
function moveRight(){
  del()
  const isright = current.some(index => (startpos + index) % width == width-1 )
  if(!isright){
    startpos +=1
  }
  if(current.some(index=> squares[startpos + index].classList.contains('end'))){
    startpos -=1
  } 
  draw()
}
function rotate(){
  del()
  rotation++
  
  if(rotation === current.length){
    rotation = 0
  }
  current = wrap[rand][rotation]
  
  if ((startpos+1) % width < 4) {
  if( current.some(index=> (startpos + index + 1) % width === 0)){
    startpos += 1  
  }} 
  else if(startpos % width >5){ if (current.some(index=> (startpos + index) % width === 0)){
    startpos -= 1
  }}

  draw() 
}
function down(){
  del()
  startpos += width
  draw()
  stop()
  endGame()
}

function control(e) {
  if(e.keyCode === 37) {
    moveLeft()
  } else if (e.keyCode === 38) {
    rotate()
  } else if (e.keyCode === 39) {
    moveRight()
  } else if (e.keyCode === 40) {
    down()
  }
}
document.addEventListener('keyup', control)

let start = document.querySelector('.start')
let pause = document.querySelector('.pause')
pause.addEventListener('click' , function(){
  alert("paused")
})
start.addEventListener('click',function(){
  draw()
  interval= setInterval(down,500)
  rand = Math.floor(Math.random()*wrap.length)
})

//score

function addScore() {
  for (let i = 0; i < 199; i +=width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if(row.every(index => squares[index].classList.contains('end'))) {
      score +=10
      Scoredisp.innerHTML = "score: " +score
      row.forEach(index => {
        squares[index].classList.remove('end')
        squares[index].classList.remove('shapes')
      })
      const squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(index => grid.appendChild(index))
    }
  }
}
function endGame(){
  if(current.some(index => squares[startpos + index].classList.contains('end'))) {
    Scoredisp.innerHTML = 'end'
    clearInterval(interval)
  }
}