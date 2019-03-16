import React, { useState, useRef, useEffect } from 'react';
import {
  snakeBodyColor,
  snakeHeadColor,
  fruitColor,
  WIDTH,
  HEIGHT,
  SQUARE_SIZE,
  KEY_CODES,
  KEY_CODES_MAPPER
} from './constants';

import useKeyPress from './useKeyPress';

function App() {
  const [snakeSize, setSnakeSize] = useState(1); //setSnakeSize(snakeBody + 1)
  const [snake, setSnake] = useState([{ x: WIDTH / 2, y: HEIGHT / 2 }]);
  const canvas = useRef(null);
  const keyPressed = useKeyPress(KEY_CODES);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    draw(ctx, snake);
    const timer1 = setTimeout(() => {

      if (keyPressed === false) {
        setSnake([{
          x: snake[0].x + SQUARE_SIZE, y: snake[0].y
        }])
      }

      switch (keyPressed) {
        case KEY_CODES_MAPPER.UP:
          setSnake([{
            x: snake[0].x, y: snake[0].y - SQUARE_SIZE
          }])
          break;
        case KEY_CODES_MAPPER.BOTTOM:
          setSnake([{
            x: snake[0].x, y: snake[0].y + SQUARE_SIZE
          }])
          break;
        case KEY_CODES_MAPPER.RIGHT:
          setSnake([{
            x: snake[0].x + SQUARE_SIZE, y: snake[0].y
          }])
          break;
        case KEY_CODES_MAPPER.LEFT:
          setSnake([{
            x: snake[0].x - SQUARE_SIZE, y: snake[0].y
          }])
          break;
      }
    }, 100);

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
/*

      if (UP) {
        console.log('UP')
      } else if (DOWN) {
        console.log('D')
      } else if (LEFT) {
        console.log('L')
      } else if (RIGHT) {
        console.log('R')
      }


  const UP = useKeyPress(38);
  const DOWN = useKeyPress(40);
  const RIGHT = useKeyPress(39);
  const LEFT = useKeyPress(37); */