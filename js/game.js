class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        
        this.screens = new Screens(this.ctx);
        this.player = new Player(0, 0);
        this.currentLevel = null;
        
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false,
            Space: false
        };
        
        this.setupEventListeners();
        this.gameLoop();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') e.preventDefault();
            
            if (this.screens.currentScreen === SCREENS.GAME) {
                if (e.code in this.keys) {
                    this.keys[e.code] = true;
                }
            } else {
                this.screens.handleInput(e.code);
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (this.screens.currentScreen === SCREENS.GAME) {
                if (e.code in this.keys) {
                    this.keys[e.code] = false;
                }
            }
        });
    }
    
    update() {
        if (this.screens.currentScreen === SCREENS.GAME) {
            // Initialize level if needed
            if (!this.currentLevel) {
                this.currentLevel = new Level(LEVELS[this.screens.selectedLevel]);
                this.player.reset(
                    this.currentLevel.playerStart.x,
                    this.currentLevel.playerStart.y
                );
            }
            
            // Handle input
            if (this.keys.ArrowLeft) {
                this.player.moveLeft();
            } else if (this.keys.ArrowRight) {
                this.player.moveRight();
            } else {
                this.player.stop();
            }
            
            if (this.keys.Space) {
                this.player.jump();
            }
            
            // Update player
            this.player.update();
            
            // Check collisions
            const reachedGoal = this.currentLevel.checkCollisions(this.player);
            
            // Handle death
            if (!this.player.isAlive) {
                this.screens.currentScreen = SCREENS.DEATH;
                this.currentLevel = null;
                return;
            }
            
            // Handle level completion
            if (reachedGoal) {
                const nextLevel = this.screens.selectedLevel + 1;
                if (nextLevel < LEVELS.length) {
                    this.screens.unlockLevel(nextLevel);
                }
                this.screens.currentScreen = SCREENS.LEVEL_SELECT;
                this.currentLevel = null;
            }
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        switch (this.screens.currentScreen) {
            case SCREENS.TITLE:
                this.screens.drawTitle();
                break;
                
            case SCREENS.LEVEL_SELECT:
                this.screens.drawLevelSelect();
                break;
                
            case SCREENS.GAME:
                if (this.currentLevel) {
                    this.currentLevel.draw(this.ctx);
                    this.player.draw(this.ctx);
                }
                break;
                
            case SCREENS.DEATH:
                this.screens.drawDeath();
                break;
        }
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the window loads
window.addEventListener('load', () => {
    new Game();
}); 