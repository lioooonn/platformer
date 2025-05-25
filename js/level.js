class Level {
    constructor(levelData) {
        this.platforms = levelData.platforms;
        this.spikes = levelData.spikes;
        this.goal = levelData.goal;
        this.playerStart = levelData.playerStart;
        this.name = levelData.name;
    }

    draw(ctx) {
        // Draw platforms
        ctx.fillStyle = COLORS.PLATFORM;
        for (const platform of this.platforms) {
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        }

        // Draw spikes
        ctx.fillStyle = COLORS.SPIKE;
        for (const spike of this.spikes) {
            ctx.beginPath();
            ctx.moveTo(spike.x, spike.y + spike.height);
            ctx.lineTo(spike.x + spike.width / 2, spike.y);
            ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
            ctx.closePath();
            ctx.fill();
        }

        // Draw goal
        ctx.fillStyle = COLORS.GOAL;
        ctx.fillRect(this.goal.x, this.goal.y, this.goal.width, this.goal.height);
        
        // Draw goal flag
        ctx.beginPath();
        ctx.moveTo(this.goal.x, this.goal.y);
        ctx.lineTo(this.goal.x - 10, this.goal.y + 10);
        ctx.lineTo(this.goal.x, this.goal.y + 20);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    checkCollisions(player) {
        // Check spike collisions
        for (const spike of this.spikes) {
            if (player.checkCollision(spike)) {
                player.isAlive = false;
                return;
            }
        }

        // Check platform collisions
        player.handlePlatformCollisions(this.platforms);

        // Check if player fell off the screen
        if (player.y > CANVAS_HEIGHT) {
            player.isAlive = false;
        }

        // Check goal collision
        return player.checkCollision(this.goal);
    }
} 