class Screens {
    constructor(ctx) {
        this.ctx = ctx;
        this.currentScreen = SCREENS.TITLE;
        this.selectedLevel = 0;
        this.unlockedLevels = this.loadProgress() || [0];
    }

    loadProgress() {
        const saved = localStorage.getItem('platformerProgress');
        return saved ? JSON.parse(saved) : null;
    }

    saveProgress() {
        localStorage.setItem('platformerProgress', JSON.stringify(this.unlockedLevels));
    }

    unlockLevel(levelIndex) {
        if (!this.unlockedLevels.includes(levelIndex)) {
            this.unlockedLevels.push(levelIndex);
            this.saveProgress();
        }
    }

    drawTitle() {
        this.ctx.fillStyle = COLORS.TEXT;
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Pixel Adventure', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press ENTER to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Use Arrow Keys to Move and Space to Jump', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 2 / 3);
    }

    drawLevelSelect() {
        this.ctx.fillStyle = COLORS.TEXT;
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Select Level', CANVAS_WIDTH / 2, 100);

        const levelsPerRow = 3;
        const buttonWidth = 150;
        const buttonHeight = 80;
        const padding = 30;
        const startX = (CANVAS_WIDTH - (levelsPerRow * buttonWidth + (levelsPerRow - 1) * padding)) / 2;
        const startY = 200;

        LEVELS.forEach((level, index) => {
            const row = Math.floor(index / levelsPerRow);
            const col = index % levelsPerRow;
            const x = startX + col * (buttonWidth + padding);
            const y = startY + row * (buttonHeight + padding);

            // Draw button background
            this.ctx.fillStyle = this.unlockedLevels.includes(index) ? '#2ecc71' : '#95a5a6';
            if (index === this.selectedLevel) {
                this.ctx.strokeStyle = '#f1c40f';
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(x - 5, y - 5, buttonWidth + 10, buttonHeight + 10);
            }
            this.ctx.fillRect(x, y, buttonWidth, buttonHeight);

            // Draw level name
            this.ctx.fillStyle = COLORS.TEXT;
            this.ctx.font = '20px Arial';
            this.ctx.fillText(level.name, x + buttonWidth / 2, y + buttonHeight / 2);
        });
    }

    drawDeath() {
        this.ctx.fillStyle = COLORS.TEXT;
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press ENTER to Retry', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        this.ctx.fillText('Press ESC for Level Select', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 2 / 3);
    }

    handleInput(key) {
        switch (this.currentScreen) {
            case SCREENS.TITLE:
                if (key === 'Enter') {
                    this.currentScreen = SCREENS.LEVEL_SELECT;
                }
                break;

            case SCREENS.LEVEL_SELECT:
                if (key === 'ArrowRight' && this.selectedLevel < LEVELS.length - 1) {
                    this.selectedLevel++;
                } else if (key === 'ArrowLeft' && this.selectedLevel > 0) {
                    this.selectedLevel--;
                } else if (key === 'ArrowUp' && this.selectedLevel >= 3) {
                    this.selectedLevel -= 3;
                } else if (key === 'ArrowDown' && this.selectedLevel + 3 < LEVELS.length) {
                    this.selectedLevel += 3;
                } else if (key === 'Enter' && this.unlockedLevels.includes(this.selectedLevel)) {
                    this.currentScreen = SCREENS.GAME;
                }
                break;

            case SCREENS.DEATH:
                if (key === 'Enter') {
                    this.currentScreen = SCREENS.GAME;
                } else if (key === 'Escape') {
                    this.currentScreen = SCREENS.LEVEL_SELECT;
                }
                break;
        }
    }
} 