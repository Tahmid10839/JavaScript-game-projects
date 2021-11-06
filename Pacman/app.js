
document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 28; // 28*28 784 squares
    let score = 0;

    // Layout of the grid which is in the square
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ];
    
    // Legend
    // 0 - pac-dot
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pallet
    // 4 - empty

    const squares = [];
    console.log(layout.length);  
    // Draw the grid and render it
    function createBoard(){
        for(let i=0; i<layout.length; i++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            // Add layout to the board
            if(layout[i]===0){
                squares[i].classList.add('pac-dot');
            }
            else if(layout[i]===1){
                squares[i].classList.add('wall');
            }
            else if(layout[i]===2){
                squares[i].classList.add('ghost-lair');
            }
            else if(layout[i]===3){
                squares[i].classList.add('power-pallet');
            }
        }
    }
    createBoard();
    
    // Starting position of pac man
    let pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add('pac-man');

    // Move pac man
    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove('pac-man');
        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !==0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')){
                    pacmanCurrentIndex -= 1;
                }

                // Check if the pacman is in the left exit
                if((pacmanCurrentIndex-1) === 363){
                    // squares[pacmanCurrentIndex].classList.add('pac-man');
                    pacmanCurrentIndex = 391;
                    // squares[pacmanCurrentIndex].classList.remove('pac-man');
                }
                break;
            case 38:
                if(pacmanCurrentIndex - width >=0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')){
                    pacmanCurrentIndex -= width;
                }
                break;
            case 39:
                if(pacmanCurrentIndex % width < width-1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')){
                    pacmanCurrentIndex += 1;
                }

                // Check if the pacman is in the right exit
                if((pacmanCurrentIndex+1) === 392){
                    pacmanCurrentIndex = 364;
                }
                break;
            case 40:
                if(pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')){
                    pacmanCurrentIndex += width;
                }
                break;
        }
        squares[pacmanCurrentIndex].classList.add('pac-man');
        pacDotEaten();
        powerpalletEaten();
        checkGameOver();
        checkForWin();
    }

    document.addEventListener('keyup',movePacman);

    // What happens when pacman eats a pac-dot
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot');
        }
    }

    // What happens when you eat a power-pallet
    function powerpalletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pallet')){
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost=> ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power-pallet');
        }
    }

    // Make the ghosts stop flashing
    function unScareGhosts(){
        ghosts.forEach(ghost=> ghost.isScared = false);
    }

    // Create our Ghost Template
    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500),
    ]

    // Draw the ghosts onto the grid
    ghosts.forEach(ghost=>{
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    })

    // Move the ghosts ranomly
    ghosts.forEach(ghost=> moveGhost(ghost));

    // Write the function to move the ghosts
    function moveGhost(ghost){
        const directions = [-1,+1,width,-width];
        let direction = directions[Math.floor(Math.random()*directions.length)];

        ghost.timerId = setInterval(function(){
            // If the next square is not a wall and a ghost then ghost can go there
            if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                // Ghost can go here
                // Remove all ghost related class
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost','scared-ghost');
                // Change the currentIndex to the next square
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }
            // Else find a new direction to try
            else{
                direction = directions[Math.floor(Math.random()*directions.length)];
            }

            // If the ghosts are currently scared
            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add('scared-ghost');
            }
            
            // If the ghosts scared and pacman runs into it
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost');
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.innerHTML = score;
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost');     
            }
            checkGameOver();
        },ghost.speed);
    }

    // Check for a Game Over
    function checkGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost=> clearInterval(ghost.timerId));
            document.removeEventListener('keyup',movePacman);
            setTimeout(function(){
                alert('Game Over! Your final score is '+score);
                window.location.reload();
            },500);
        }
    }

    // Check for win
    function checkForWin(){
        if(score === 274){
            ghosts.forEach(ghost=> clearInterval(ghost.timerId));
            document.removeEventListener('keyup',movePacman);
            setTimeout(function(){
                alert('You Won! Your final score is '+score);
                window.location.reload();
            },500) 
        }
    }
})