import React, { useState, useRef, useEffect } from 'react';
import {
  snakeBodyColor,
  snakeHeadColor,
  fruitColor,
  WIDTH,
  HEIGHT,
  SQUARE_SIZE,
  KEY_CODES_MAPPER
} from './constants';

import useKeyPress from './useKeyPress';

function App() {
  const [snakeSize, setSnakeSize] = useState(1); //setSnakeSize(snakeBody + 1)
  const [snake, setSnake] = useState([{ x: WIDTH / 2, y: HEIGHT / 2 }]);
  const canvas = useRef(null);
  const keyPressed = useKeyPress(38);


  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    console.log(keyPressed);
    draw(ctx, snake);
    const timer1 = setTimeout(() => {

      switch (keyPressed) {
        case KEY_CODES_MAPPER.UP:
          console.log("up");
          break;
        case KEY_CODES_MAPPER.BOTTOM:
          console.log("down");
          break;
        case KEY_CODES_MAPPER.RIGHT:
          console.log("R");
          break;
        case KEY_CODES_MAPPER.LEFT:
          console.log("L");
          break;
      }

      setSnake([{
        x: snake[0].x + SQUARE_SIZE, y: snake[0].y
      }])
    }, 1000);

    return () => {
      clearTimeout(timer1)
    }
  });

  return (
    <div style={center}>
      <canvas
        ref={canvas}
        width={WIDTH}
        height={HEIGHT}
        style={canvasStyle}
      />
    </div>
  );
}

function draw(ctx, snake) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawSnake(ctx, snake);
  const fruitX = Math.random() * WIDTH;
  const fruitY = Math.random() * HEIGHT;

  //drawRec(ctx, fruitColor, fruitX, fruitY);
}

function drawRec(ctx, strokeColor, x, y) {
  ctx.fillStyle = strokeColor;
  ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
  ctx.stroke();
}

function drawSnake(ctx, snake) {
  snake.forEach((part, idx) => {
    if (idx === 0) {
      drawRec(ctx, snakeHeadColor, part.x, part.y);
    } else {
      drawRec(ctx, snakeBodyColor, part.x, part.y);
    }
  })
}

const center = { textAlign: 'center' };
const canvasStyle = { backgroundColor: 'black' }

export default App;
