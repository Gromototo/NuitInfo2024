// Variables de canvas et contexte
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const blueShades = ["#87CEEB", "#1E90FF", "#00008B"];
const beigeShades = ["#FFF8DC", "#FFEBCD", "#FFDEAD"];
const couches_peau = ["épiderme", "derme", "hypoderme"];
const couches_oceanique = ["épipealogique", "mésopélagique", "bathypélagique"];
const margin = 10;

class Block {
  constructor(id) {
    this.id = id;
  }
  draw(x, y, width, height) {
    ctx.fillStyle = this.get_blue(this.id);
    ctx.fillRect(x, y, width / 2, height);
    ctx.fillStyle = this.get_beige(this.id);
    ctx.fillRect(x + width / 2, y, width / 2, height);
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(couches_oceanique[this.id], x +width/4, y + height / 2);
    ctx.fillText(couches_peau[this.id], x + 3* width / 4, y + height / 2);
  }
  get_blue(id) {
    return blueShades[id];
  }
  get_beige(id) {
    return beigeShades[id];
  }
}

class Pile {
  constructor(nbBlocks, width, height) {
    this.nbBlocks = nbBlocks;
    this.blocks = [];
    this.width = width;
    this.height = height;
  }
  init(nbBlocks) {
    for (let i = 0; i < this.nbBlocks; i++) {
      this.blocks.push(new Block(i));
    }
    this.shuffle();
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.draw();
  }
  draw() {
    var blockWidth = this.width;
    var blockHeight = this.height / this.nbBlocks;
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].draw(0, i * blockHeight, blockWidth, blockHeight);
    }
  }
  shuffle() {
    for (let i = 0; i < this.blocks.length; i++) {
      let j = Math.floor(Math.random() * this.blocks.length);
      this.echange(i, j);
    }
  }
  echange(i, j) {
    let temp = this.blocks[i];
    this.blocks[i] = this.blocks[j];
    this.blocks[j] = temp;
    this.draw();
  }
}

class Game {
  constructor() {
    this.nbBlocks = 3;
    this.pile = new Pile(this.nbBlocks, canvas.width, canvas.height);
    this.draggedBlockIndex = null;
    this.droppingIndex = null;
  }
  run() {
    this.init();
    this.onResize();
    this.draw();
  }
  init() {
    this.pile.init(this.nbBlocks);
    this.initEvents();
  }
  initEvents() {
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

    canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
  
    window.addEventListener('resize', this.onResize.bind(this));


  }
  onResize() {
    canvas.x = margin;
    canvas.width = window.innerWidth - 2 * margin;
    canvas.height = window.innerHeight / 2;
    this.pile.resize(canvas.width, canvas.height);
    this.draw();
  }

  onMouseDown(event) {
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  this.handleDragStart(mouseY);
}

onMouseMove(event) {
  if (this.draggedBlockIndex !== null) {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    this.handleDragMove(mouseY);
  }
}

onMouseUp(event) {
  this.handleDragEnd();
}

onTouchStart(event) {
  const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
  this.handleDragStart(touchY);
}

onTouchMove(event) {
  if (this.draggedBlockIndex !== null) {
    const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
    this.handleDragMove(touchY);
  }
}

onTouchEnd(event) {
  this.handleDragEnd();
}

// Gestion des actions de glissement
handleDragStart(y) {
  console.log(`Drag started at y: ${y}`);
  const blockHeight = canvas.height / this.nbBlocks;
  this.draggedBlockIndex = Math.floor(y / blockHeight);
  document.getElementById(`layer${this.pile.blocks[this.draggedBlockIndex].id}`).style.display = 'block';
}

handleDragMove(y) {
  const blockHeight = canvas.height / this.nbBlocks;
  this.droppingIndex = Math.floor(y / blockHeight);
  if (this.droppingIndex !== this.draggedBlockIndex) {
    this.pile.echange(this.draggedBlockIndex, this.droppingIndex);
    this.draggedBlockIndex = this.droppingIndex;
  }
}

handleDragEnd() {
  console.log('Drag ended');
  if (this.draggedBlockIndex !== null) {
    document.getElementById(`layer${this.pile.blocks[this.draggedBlockIndex].id}`).style.display = 'none';
  }
  this.draggedBlockIndex = null;
  this.droppingIndex = null;

  if (this.CheckWin()) {
    document.getElementById('victory').style.display = 'block';
    document.getElementById('description').style.display = 'block';
  }
}
  draw() {
    this.pile.draw();
  }
  CheckWin() {
    for (let i = 0; i < this.pile.blocks.length; i++) {
      if (this.pile.blocks[i].id !== i) {
        return false;
      }
    }
    return true;
  }
  
}

const game = new Game();
game.run();

