const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

// Load sprite sheet image
const playerImage = new Image();
playerImage.src = 'shadow_dog.png'; // Make sure this path is correct

// Frame dimensions for each sprite
const spriteWidth = 575;
const spriteHeight = 523;

// Animation timing
let gameFrame = 0;
const staggerFrames = 5;

// Animation state data
const spriteAnimations = {};
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "gethit", frames: 4 },
  { name: "join", frames: 6 } // Optional: Add 'join' if your sprite sheet has it
];

// Map frame positions for each animation
animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    frames.loc.push({
      x: j * spriteWidth,
      y: index * spriteHeight
    });
  }
  spriteAnimations[state.name] = frames;
});

// Default player animation state
let playerState = 'idle';

// Handle animation dropdown change
const select = document.getElementById('animations');
select.addEventListener('change', function (e) {
  playerState = e.target.value;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const animation = spriteAnimations[playerState];
  const frameCount = animation.loc.length;
  const position = Math.floor(gameFrame / staggerFrames) % frameCount;

  const frameX = animation.loc[position].x;
  const frameY = animation.loc[position].y;

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

// Start animation when image is ready
playerImage.onload = () => {
  animate();
};
