class SmoothMoveExtension {
  constructor() {
    this.init();
  }

  init() {
    // Subscribe to token move events
    window.api.tokens.on('tokenMove', this.onTokenMove.bind(this));
  }

  onTokenMove(event) {
    const { token, newPosition } = event.detail;
    const oldPosition = token.position;
    this.animateMove(token, oldPosition, newPosition);
  }

  animateMove(token, from, to) {
    const duration = 1000; // Duration in milliseconds
    const frames = 60; // Number of animation frames
    const dx = (to.x - from.x) / frames;
    const dy = (to.y - from.y) / frames;

    let currentFrame = 0;

    const animate = () => {
      if (currentFrame < frames) {
        token.position.x += dx;
        token.position.y += dy;
        currentFrame++;
        requestAnimationFrame(animate);
      } else {
        token.position = to; // Ensure the token ends exactly at the target position
      }
    };

    animate();
  }
}

// Initialize the extension
const smoothMoveExtension = new SmoothMoveExtension();
