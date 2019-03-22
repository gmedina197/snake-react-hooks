import { WIDTH, HEIGHT, SQUARE_SIZE } from './constants';
import { useState } from 'react'

export default function useSnack(generate) {
  const [snack, setSnack] = useState(null);

  const randomPosition = range => 10 * (Math.floor(Math.random() * (range / 10) + 1));

  const newSnack = () => setSnack({ x: randomPosition(WIDTH - SQUARE_SIZE), y: randomPosition(HEIGHT - SQUARE_SIZE) });

  if (generate && snack === null) {
    newSnack();
  }

  return [snack, newSnack];
}