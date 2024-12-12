const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");

const checkpointMessage = document.querySelector('.checkpoint-screen > p');

//getContext method which will provide the context for where the graphics will be rendered.
const ctx = canvas.getContext('2d');
const width = canvas.width;
//The innerWidth property is a number that represents the interior width of the browser window.
canvas.width = innerWidth;
canvas.height = innerHeight;

//When the player jumps, you will need to apply gravity to bring them back down.
const gravity = 0.5;

// keep track of the status for the checkpoint collision detection.
let isCheckpointCollisionDetectionActive = true;

//size of the elements in the game are responsive and adapt to different screen sizes
const proportionalSize = (size) => {
    //The width and the height of the main player, platforms and checkpoints will be proportional sized relative to the innerHeight of the browser screen
    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

//define some characteristics for the main player
class Player {
    // define the player's position, velocity, width, and height values
    constructor() {
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400),
        };
        this.velocity = {
            x: 0,
            y: 0,
          };
          this.width = proportionalSize(40);
          this.height = proportionalSize(40);
    }
    //a draw() method, which will be responsible for creating the player's width, height, position, and fill color.
    draw() {
        ctx.fillStyle = "#99c9ff";
        //the player's shape
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        //when the player moves to the right
        this.position.x += this.velocity.x;
        //when the player jumps up
        this.position.y += this.velocity.y;
        //condition to stop the player from falling past the height of the canvas.
        if ((this.position.y + this.height + this.velocity.y) <= canvas.height) {
            if (this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y = gravity;
            }
            //when the player touches the ground, the gravity will be applied to bring them back down.
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
        // the player stays within the boundaries of the canvas screen and doesn't move too far off to the left
        if (this.position.x < this.width) {
            this.position.x = this.width;
        }
        //check if the player's x position has exceeded the right edge of the canvas
        if (this.position.x >= canvas.width - this.width * 2) {
            this.position.x = canvas.width - this.width * 2;
        }
    }
}

//Start by creating a new Platform class.
class Platform {
    constructor(x, y) {
        this.position = {
            x, 
            y,
            };
            this.width = 200;
            //make sure the height is proportional to the screen size
            this.height = proportionalSize(40);  
    }
    draw() {
        ctx.fillStyle = "#acd157";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
     }
}

//When a player collides with a checkpoint, the checkpoint screen should appear
class CheckPoint {
    constructor(x, y, z) {
        this.position = {
            x,
            y,
          };
          this.width = proportionalSize(40);
          this.height = proportionalSize(40);
          //check if the player has reached the checkpoin
          this.claimed = false;
    };
    draw() {
        ctx.fillStyle = "#f1be32";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    claim() {
        this.width = 0;
        this.height = 0;
        this.position.y = Infinity;
        this.claimed = true;
    }
}

//new instans Player()
const player = new Player();

//create a list of positions for the platforms
 const platformPositions = [
    { x: 500, y: proportionalSize(450) },
    { x: 700, y: proportionalSize(400) },
    { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

//create a list of new platform instances using the Platform class.
const platforms = platformPositions.map(
    (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
    { x: 1170, y: proportionalSize(80), z: 1 },
    { x: 2900, y: proportionalSize(330), z: 2 },
    { x: 4800, y: proportionalSize(80), z: 3 },
  ];

 //create a list of new checkpoint instances
 const checkpoints = checkpointPositions.map(
    (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

//start adding the functionality for moving the player across the screenc
const animate = () => {
    //The requestAnimationFrame() web API
    requestAnimationFrame(animate);
    // the clearRect() Web API help clear the canvas before rendering the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the platforms
    platforms.forEach((platform) => {
        platform.draw();
    });
    // draw the checkpoints
    checkpoints.forEach((checkpoint) => {
        checkpoint.draw();
    });
    // update the player's position and draw it
    player.update();
    //add the logic for increasing or decreasing a player's velocity based on if they move to the left or right of the screen
    // if the right key was pressed and the player's x position is less than proportionalSize(400)
    if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
        player.velocity.x = 5;
    }
    // checks if the left key was pressed and the player's x position is more than proportionalSize(10)
    else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
        player.velocity.x = -5;
    }
    //if no keys are pressed, the player will stop moving
    else {
        player.velocity.x = 0;
        //update the platform's x position as the player moves across the screen.
        if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });
            checkpoints.forEach((checkpoint) => {
                checkpoint.position.x -=5;
            })
        }
        else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
            platforms.forEach((platform) => {
                platform.position.x += 5;
                checkpoints.forEach((checkpoint) => {
                    checkpoint.position.x += 5;
                })
            });
        }
    }
    //collision detection for the player with the platforms
    platforms.forEach((platform) => {
        const collisionDetectionRules = [
            player.position.y + player.height <= platform.position.y,
            player.position.y + player.height + player.velocity.y >= platform.position.y,
            player.position.x >= platform.position.x - player.width / 2,
            player.position.x <=
              platform.position.x + platform.width - player.width / 3,
          ];
        // if every rule in the collisionDetectionRules array is truthy
        if (collisionDetectionRules.every((rule) => rule)) {
            player.velocity.y = 0;
            return;
          }
        const platformDetectionRules = [
            player.position.x >= platform.position.x - player.width / 2,
            player.position.x <=
              platform.position.x + platform.width - player.width / 3,
            player.position.y + player.height >= platform.position.y,
            player.position.y <= platform.position.y + platform.height,
          ];
        // checks if every platform detection rule is true
        if (platformDetectionRules.every((rule) => rule)) {
            player.position.y = platform.position.y + player.height;
            player.velocity.y = gravity;
        }
    });
    //display the checkpoint screen when the player reaches a checkpoint
    checkpoints.forEach((checkpoint, index, checkpoints) => {
        const checkpointDetectionRules = [
          player.position.x >= checkpoint.position.x,
          player.position.y >= checkpoint.position.y,
          player.position.y + player.height <= checkpoint.position.y + checkpoint.height,
          isCheckpointCollisionDetectionActive,
          player.position.x - player.width <= checkpoint.position.x - checkpoint.width + player.width * 0.9,
          index === 0 || checkpoints[index - 1].claimed === true,
        ];
        if (checkpointDetectionRules.every((rule) => rule)) {
            //call the claim method on the checkpoint object.
            checkpoint.claim();
            // a condition that checks if the player has reached the last checkpoint
            if (index === checkpoints.length - 1) {
                isCheckpointCollisionDetectionActive = false;
                showCheckpointScreen("You reached the final checkpoint!");
                movePlayer("ArrowRight", 0, false);
            } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
                showCheckpointScreen("You reached a checkpoint!");
            }
        };
    });
}
    
//monitor when keys are pressed
const keys = {
    rightKey: {
      pressed: false
    },
    leftKey: {
      pressed: false
    }
  };

//add the functionality that will be responsible for moving the player across the screen
const movePlayer = (key, xVelocity, isPressed) => {
    //if the isCheckpointCollisionDetectionActive is false, then you will need to stop the player's movements
    if (!isCheckpointCollisionDetectionActive) {
        player.velocity.x = 0;
        player.velocity.y = 0;
        return;
    }
    switch (key) {
        case "ArrowLeft":
            keys.leftKey.pressed = isPressed;
            if (xVelocity === 0) {
                player.velocity.x = xVelocity;
            }
            player.velocity.x -= xVelocity;
            break;
        case "ArrowUp":
                player.velocity.y -= 8;
                break;
        case " ":
                player.velocity.y -= 8;
                break;
        case "Spacebar":
                player.velocity.y -= 8;
                break;
        case "ArrowRight":
                    keys.rightKey.pressed = isPressed;
                    if (xVelocity === 0) {
                        player.velocity.x = xVelocity;
                    }
                    player.velocity.x += xVelocity;
                    break;
        default:
            break;
    }
};

//new player drawn on the screen.
const startGame = () => {
    //startScreen.style.display
    canvas.style.display = "block";
    startScreen.style.display = "none";
    // draw player on the canvas
    animate();
}

//function that will show the checkpoint message when the player reaches a checkpoint
const showCheckpointScreen = (msg) => {
    checkpointScreen.style.display = "block";
    checkpointMessage.textContent = msg;
    if ( isCheckpointCollisionDetectionActive) {
        setTimeout(() => {
            checkpointScreen.style.display = "none"
        }, 2000)
    }
};

//add the functionality for the start game button
startBtn.addEventListener("click", startGame);

//Start by adding an addEventListener to the global window object.
window.addEventListener("keydown", ({ key }) => {
    movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
    movePlayer(key, 0, false);
});
