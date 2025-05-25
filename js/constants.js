const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const PLAYER_SPEED = 5;
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 48;

const SCREENS = {
    TITLE: 'TITLE',
    LEVEL_SELECT: 'LEVEL_SELECT',
    GAME: 'GAME',
    DEATH: 'DEATH'
};

const COLORS = {
    PLAYER: '#3498db',
    PLATFORM: '#95a5a6',
    SPIKE: '#e74c3c',
    GOAL: '#2ecc71',
    TEXT: '#ecf0f1'
};

const LEVELS = [
    {
        name: "Tutorial",
        platforms: [
            { x: 100, y: 500, width: 600, height: 20 },
            { x: 300, y: 400, width: 200, height: 20 },
            { x: 500, y: 300, width: 200, height: 20 }
        ],
        spikes: [
            { x: 400, y: 480, width: 20, height: 20 }
        ],
        goal: { x: 700, y: 450, width: 30, height: 50 },
        playerStart: { x: 150, y: 400 }
    },
    {
        name: "The Gap",
        platforms: [
            { x: 100, y: 500, width: 200, height: 20 },
            { x: 500, y: 500, width: 200, height: 20 },
            { x: 400, y: 350, width: 100, height: 20 }
        ],
        spikes: [
            { x: 300, y: 580, width: 200, height: 20 }
        ],
        goal: { x: 650, y: 450, width: 30, height: 50 },
        playerStart: { x: 150, y: 400 }
    },
    {
        name: "The Climb",
        platforms: [
            { x: 100, y: 550, width: 150, height: 20 },
            { x: 350, y: 450, width: 150, height: 20 },
            { x: 100, y: 350, width: 150, height: 20 },
            { x: 350, y: 250, width: 150, height: 20 },
            { x: 600, y: 150, width: 150, height: 20 }
        ],
        spikes: [
            { x: 300, y: 530, width: 20, height: 20 },
            { x: 200, y: 330, width: 20, height: 20 },
            { x: 500, y: 230, width: 20, height: 20 }
        ],
        goal: { x: 650, y: 100, width: 30, height: 50 },
        playerStart: { x: 150, y: 500 }
    },
    {
        name: "The Gauntlet",
        platforms: [
            { x: 100, y: 550, width: 600, height: 20 },
            { x: 200, y: 450, width: 100, height: 20 },
            { x: 400, y: 350, width: 100, height: 20 },
            { x: 600, y: 250, width: 100, height: 20 }
        ],
        spikes: [
            { x: 300, y: 530, width: 200, height: 20 },
            { x: 350, y: 330, width: 200, height: 20 },
            { x: 150, y: 230, width: 200, height: 20 }
        ],
        goal: { x: 650, y: 200, width: 30, height: 50 },
        playerStart: { x: 150, y: 500 }
    },
    {
        name: "The Master Trial",
        platforms: [
            { x: 100, y: 550, width: 100, height: 20 },
            { x: 300, y: 450, width: 100, height: 20 },
            { x: 500, y: 350, width: 100, height: 20 },
            { x: 300, y: 250, width: 100, height: 20 },
            { x: 100, y: 150, width: 100, height: 20 },
            { x: 600, y: 150, width: 100, height: 20 }
        ],
        spikes: [
            { x: 200, y: 530, width: 400, height: 20 },
            { x: 100, y: 330, width: 200, height: 20 },
            { x: 500, y: 230, width: 200, height: 20 },
            { x: 300, y: 130, width: 200, height: 20 }
        ],
        goal: { x: 650, y: 100, width: 30, height: 50 },
        playerStart: { x: 150, y: 500 }
    }
]; 