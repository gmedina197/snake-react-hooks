export const WIDTH = 600;
export const HEIGHT = 600;
export const SQUARE_SIZE = 10;
export const snakeBodyColor = '#8cd3e2';
export const snakeHeadColor = '#42f4d7';
export const fruitColor = 'red';
export const DIRECTIONS = {
    UP: 'UP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

export const DIRECTION_TICKS = {
    UP: (x, y) => ({ x, y: y - 1 }),
    BOTTOM: (x, y) => ({ x, y: y + 1 }),
    RIGHT: (x, y) => ({ x: x + 1, y }),
    LEFT: (x, y) => ({ x: x - 1, y }),
};

export const KEY_CODES_MAPPER = {
    UP: 38,
    RIGHT: 39,
    LEFT: 37,
    BOTTOM: 40
};

export const KEY_CODES = [38, 39, 37, 40]