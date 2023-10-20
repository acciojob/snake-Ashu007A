// Get the game container element
const gameContainer = document.getElementById('gameContainer');
const scoreElement = document.getElementById('pointsEarned');
let score = 0;

// Snake variables
const snake = [{ row: 20, col: 1 }];
let snakeDirection = 'right';

// Food variables
let food = { row: 5, col: 5 };

// Game loop
function gameLoop() {
  // Clear the game container
  gameContainer.innerHTML = '';

  // Move the snake
  moveSnake();

  // Check for collisions
  checkCollisions();

  // Draw the snake
  drawSnake();

  // Draw the food
  drawFood();

  // Update the score
  scoreElement.textContent = score;

  // Call the game loop recursively
  setTimeout(gameLoop, 100);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && snakeDirection !== 'down') {
    snakeDirection = 'up';
  } else if (event.key === 'ArrowDown' && snakeDirection !== 'up') {
    snakeDirection = 'down';
  } else if (event.key === 'ArrowLeft' && snakeDirection !== 'right') {
    snakeDirection = 'left';
  } else if (event.key === 'ArrowRight' && snakeDirection !== 'left') {
    snakeDirection = 'right';
  }
});

// Move the snake
function moveSnake() {
  const head = Object.assign({}, snake[0]);
  if (snakeDirection === 'up') {
    head.row -= 1;
  } else if (snakeDirection === 'down') {
    head.row += 1;
  } else if (snakeDirection === 'left') {
    head.col -= 1;
  } else if (snakeDirection === 'right') {
    head.col += 1;
  }
  snake.unshift(head);
}

// Check for collisions
function checkCollisions() {
  // Check if the snake collides with the food
  if (snake[0].row === food.row && snake[0].col === food.col) {
    // Increase the score
    score += 10;
    // Generate new food
    generateFood();
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Check if the snake collides with the game borders
  if (
    snake[0].row < 0 ||
    snake[0].row >= 40 ||
    snake[0].col < 0 ||
    snake[0].col >= 40
  ) {
    // Game over
    alert('Game over! Your score: ' + score);
    // Reset the game
    snake.length = 1;
    snake[0] = { row: 20, col: 1 };
    snakeDirection = 'right';
    score = 0;
  }
}

// Generate new food at a random location
function generateFood() {
  const newRow = Math.floor(Math.random() * 40);
  const newCol = Math.floor(Math.random() * 40);
  food = { row: newRow, col: newCol };
}

// Draw the snake on the game container
function drawSnake() {
  snake.forEach((segment) => {
    const pixel = document.createElement('div');
    pixel.classList.add('snakeBodyPixel');
    pixel.style.gridColumn = segment.col + 1;
    pixel.style.gridRow = segment.row + 1;
    gameContainer.appendChild(pixel);
  });
}

// Draw the food on the game container
function drawFood() {
  const pixel = document.createElement('div');
  pixel.classList.add('food');
  pixel.style.gridColumn = food.col + 1;
  pixel.style.gridRow = food.row + 1;
  gameContainer.appendChild(pixel);
}

// Start the game loop
gameLoop();