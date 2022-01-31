let pos = 0;
let pageWidth = window.innerWidth;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
var focus = 0;
const pacMen = []; 
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
function makePac() {
  let velocity = {};
  velocity.x = 20; 
  velocity.y = 20
  let position = setToRandom(200);
  let focus = 1;
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './image/PacMan1.png';
  newimg.width = 100;

  newimg.style.left = position.x
  newimg.style.top = position.y
  game.appendChild(newimg);

  return {
    focus,
    position,
    velocity,
    newimg,
  };
}
function Update() { 
  pacMen.forEach((item) => {
    item.focus = (item.focus + 1) % 2;
    let direction = 0;
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    if (item.velocity.x < 0){
        direction = 1
    }
      else direction = 0
    item.newimg.src = pacArray[direction][item.focus];
  });
}
function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  if (direction ===0 && pos > pageWidth - 200) 
    return 1;
  else if (direction ===1 && pos <0){
    return 0;
  }
  return direction;
}
function checkCollisions(item) {
  if (item.position.x + item.velocity.x >= window.innerWidth - item.newimg.width)
      item.velocity.x *= -1;
  else if (item.position.x + item.velocity.x <= 0)
    item.velocity.x *= -1;
  if (item.position.y + item.velocity.y >= window.innerHeight - item.newimg.height)
     item.velocity.y *= -1;
  else if (item.position.y + item.velocity.y <= 0)
     item.velocity.y *= -1;
}
function makeOne() {
  pacMen.push(makePac());
}
setInterval(Update, 128);

if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen }
}