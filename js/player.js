class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isAlive = true;
    }

    update() {
        // Apply gravity
        this.velocityY += GRAVITY;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Basic bounds checking
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    }

    moveLeft() {
        this.velocityX = -PLAYER_SPEED;
    }

    moveRight() {
        this.velocityX = PLAYER_SPEED;
    }

    stop() {
        this.velocityX = 0;
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = JUMP_FORCE;
            this.isJumping = true;
        }
    }

    checkCollision(object) {
        return this.x < object.x + object.width &&
               this.x + this.width > object.x &&
               this.y < object.y + object.height &&
               this.y + this.height > object.y;
    }

    handlePlatformCollisions(platforms) {
        this.isJumping = true;
        
        for (const platform of platforms) {
            if (this.checkCollision(platform)) {
                // Check if landing on top of platform
                if (this.velocityY > 0 && this.y + this.height - this.velocityY <= platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.isJumping = false;
                }
                // Left collision
                else if (this.velocityX > 0 && this.x + this.width - this.velocityX <= platform.x) {
                    this.x = platform.x - this.width;
                    this.velocityX = 0;
                }
                // Right collision
                else if (this.velocityX < 0 && this.x - this.velocityX >= platform.x + platform.width) {
                    this.x = platform.x + platform.width;
                    this.velocityX = 0;
                }
                // Bottom collision
                else if (this.velocityY < 0) {
                    this.y = platform.y + platform.height;
                    this.velocityY = 0;
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = COLORS.PLAYER;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isAlive = true;
    }
} 