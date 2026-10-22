let esBomba = false; 
let score = 0;
let nivel = 1;
let juegoTerminado = false; 
let juegoIniciado = false;

let fantasma = { x: 430, y: 60 };
let m = { x: 223, y: 220 };
let spawnEvery = 60; 

let sonidoExplosion;

function setup() {
  createCanvas(500, 500);
  spawnMulls();
  sonidoExplosion = new p5.Oscillator('sawtooth');
}

function draw() {
  background(15, 10, 25);
  
 fill(45, 140, 40);
  rect(0, 400, 500, 100);

  if (juegoIniciado && !juegoTerminado) {
    mulls(m.x, m.y);
  }

  // Pilares color naranja calabaza
  pillars(35, 280, 120);
  pillars(125, 310, 90);
  pillars(215, 255, 145);
  pillars(305, 310, 90);
  pillars(400, 310, 90);

  drawGhost(fantasma.x, fantasma.y);

  fill(255, 255, 255);
  textSize(16);
  text('Score: ' + score, 12, 26);
  text('Nivel: ' + nivel, 12, 50); 

  if (juegoIniciado && !juegoTerminado && frameCount % spawnEvery === 0) {
    spawnMulls();
  }

  if (!juegoIniciado) {
    background(15, 10, 25, 220); 
    fill(255, 200, 50);
    textSize(35);
    textAlign(CENTER, CENTER);
    text('THE TERROR GHOST', 250, 180);
    
    fill(255);
    textSize(18);
    text('Haz clic para comenzar', 250, 250);
    textSize(14);
    text('¡Cuidado con las bombas!', 250, 290);
    textAlign(LEFT);
  }

  // Pantalla de Game Over
  if (juegoTerminado) {
    background(0, 0, 0, 210); 
    fill(255, 0, 0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text('¡GAME OVER!', 250, 200);
    
    fill(255);
    textSize(18);
    text('¡KABOOOOMMMMMMMMMM!', 250, 250);
    text('Presiona ESPACIO para revivir', 250, 290);
    textAlign(LEFT);
  }
}

function pillars(x, y, z) {
  // Tono naranja calabaza
  fill(235, 110, 20);
  rect(x, y, 60, z);
  fill(20);
}

function drawGhost(x, y) {
  noStroke();
 fill(255, 220, 50);
  ellipse(x, y, 60, 60);

  fill(20);
  ellipse(x - 15, y - 4, 10);
  ellipse(x + 12, y - 5, 10);
}

function mulls(x, y) {
  noStroke();
  
  if (esBomba) {
    fill(45, 45, 45); 
    ellipse(x + 22.5, y + 2, 44, 44); 
    fill(255, 180, 0);
    rect(x + 20, y - 26, 5, 12); 
  } else {
    fill(255, 255, 255);
    rect(x, y, 45, 50);
    ellipse(x + 22.4, y - 5, 46, 50);

    fill(20);
    ellipse(x + 30, y - 4, 10, 19);
    ellipse(x + 15, y - 5, 10, 19);
  }
}

function mousePressed() {
  if (!juegoIniciado) {
    juegoIniciado = true;
    return;
  }

  if (juegoTerminado) return;

  if (dist(mouseX, mouseY, m.x, m.y) < 50) {
    if (esBomba) {
      juegoTerminado = true; 
      
      sonidoExplosion.start();
      sonidoExplosion.freq(140);
      setTimeout(() => sonidoExplosion.freq(70), 180);
      setTimeout(() => sonidoExplosion.stop(), 350);

    } else {
      score++;
      actualizarNivel(); 
      spawnMulls();
    }
  }
}

function actualizarNivel() {
  if (score >= 25) {
    nivel = 4;
    spawnEvery = 22; 
  } else if (score >= 15) {
    nivel = 3;
    spawnEvery = 35; 
  } else if (score >= 10) {
    nivel = 2;
    spawnEvery = 45;
  } else {
    nivel = 1;
    spawnEvery = 60; 
  }
}

function keyPressed() {
  if (juegoTerminado && key === ' ') {
    score = 0;
    nivel = 1;
    spawnEvery = 60;
    juegoTerminado = false;
    spawnMulls();
  }
}

function spawnMulls() {
  let listadoPilares = [
    { x: 35, y: 280, h: 120 },
    { x: 125, y: 310, h: 90 },
    { x: 215, y: 255, h: 145 },
    { x: 305, y: 310, h: 90 },
    { x: 400, y: 310, h: 90 }
  ];

  let p = random(listadoPilares);

  m = {
    x: p.x + 30 - 22.5,
    y: p.y - 20
  };

  esBomba = random(1) < 0.3;
}
