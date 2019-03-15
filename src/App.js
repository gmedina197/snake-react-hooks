import React, { useState, useRef, useEffect } from 'react';
import {
  snakeBodyColor,
  snakeHeadColor,
  fruitColor,
  WIDTH,
  HEIGHT,
  SQUARE_SIZE
} from './constants'

function App() {
  const [snakeSize, setSnakeSize] = useState(1); //setSnakeSize(snakeBody + 1)
  const [pos, setSnakePos] = useState({ x: WIDTH / 2, y: HEIGHT / 2 })
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    //setSnakePos({ x: pos.x + 10, y: pos.y + 10 })
    //drawRec(ctx, fruitColor, Math.random() * WIDTH, Math.random() * HEIGHT);
    requestAnimationFrame(() => {
      drawSnake(ctx, pos.x, pos.y, snakeSize);
      //setSnakePos({ x: pos.x + 0.4, y: pos.y + 0.4 })
    })
  });

  return (
    <div style={center}>
      <canvas ref={canvas} width={WIDTH} height={HEIGHT} style={canvasStyle} />
    </div>
  );
}

function drawRec(ctx, strokeColor, x, y) {
  ctx.fillStyle = strokeColor;
  ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
  ctx.stroke();
}

function drawSnake(ctx, x, y, snakeSize) {  
  for (let i = 0; i < snakeSize; i++) {
    if (i === 0) {
      drawRec(ctx, snakeHeadColor, x, y);
    } else {
      drawRec(ctx, snakeBodyColor, x += 11, y);
    }
  }
}

const center = { textAlign: 'center' };
const canvasStyle = { backgroundColor: 'black' }

export default App;
