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
  const [start, setStart] = useState(false);
  const [snakeSize, setSnakeSize] = useState(3);
  const [speed, setSpeed] = useState({ x: 1, y: 0 });
  const [snake, setSnake] = useState([
    { x: WIDTH / 2, y: HEIGHT / 2 },
    { x: WIDTH / 2 + SQUARE_SIZE, y: HEIGHT / 2 },
    { x: WIDTH / 2 + SQUARE_SIZE * 2, y: HEIGHT / 2 },
  ]);
  const canvas = useRef(null);
  const keyPressed = useKeyPress(KEY_CODES);

  useEffect(() => {
    let timer1;
    if (start) {
      const ctx = canvas.current.getContext('2d');
      timer1 = setTimeout(() => {
        drawSnake(ctx, snake, snakeSize);

        const x = constrain(snake[0].x, 0, WIDTH - SQUARE_SIZE);
        const y = constrain(snake[0].y, 0, HEIGHT - SQUARE_SIZE);

        if (!keyPressed) {
          setSnake(update([...snake], x + SQUARE_SIZE, y));
        }

        switch (keyPressed) {
          case KEY_CODES_MAPPER.UP:
            setSnake(update([...snake], x, y - SQUARE_SIZE));
            break;
          case KEY_CODES_MAPPER.BOTTOM:
            setSnake(update([...snake], x, y + SQUARE_SIZE));
            break;
          case KEY_CODES_MAPPER.RIGHT:
            setSnake(update([...snake], x + SQUARE_SIZE, y));
            break;
          case KEY_CODES_MAPPER.LEFT:
            setSnake(update([...snake], x - SQUARE_SIZE, y));
            break;
        }
      }, 100);
    }

    return () => {
      clearTimeout(timer1);
    }
  });

  return (
    <div style={center}>
      {
        start ?
          <canvas
            ref={canvas}
            width={WIDTH}
            height={HEIGHT}
            style={canvasStyle}
          /> :
          <button onClick={() => setStart(true)}>Start</button>
      }
    </div>
  );
}

function constrain(value, min, max) {
  return (Math.min(max, Math.max(min, value)));
}

function snack() {

}

function update(snake, x, y) {
  //for (let i = 0; i < 1; i++) {
  snake.unshift(snake.pop());
  snake[0] = { x, y }
  return snake;
  /* for (let i = 0; i < snakeSize - 1; i++) {
  snake[i] = snake[i + 1];
}
if (snakeSize >= 1) {
  snake[0] = { x, y };
} 
return snake;*/
}

function drawRec(ctx, strokeColor, x, y) {
  ctx.fillStyle = strokeColor;
  ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
  ctx.stroke();
}

function drawSnake(ctx, snake, snakeSize) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < snakeSize; i++) {
    drawRec(ctx, snakeHeadColor, snake[i].x, snake[i].y);
  }
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