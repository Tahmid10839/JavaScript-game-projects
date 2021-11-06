
document.addEventListener('DOMContentLoaded',()=>{
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0]; // 2 for head, 0 for tail with all 1's beign the body
    let direction = 1;
    let speed = 0.9;
    let score = 0;
    let intervalTime = 0;
    let interval = 0;

    function startGame(){
        currentSnake.forEach(index=>squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.textContent = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index=>squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes,intervalTime);
    }

    //deals with all the outcomes of the snake
    function moveOutcomes(){

        //deals with snake hitting border and hitting self
        if(
            (currentSnake[0]+width >= (width*width) && direction===width)|| // if snake hits bottom
            (currentSnake[0]%width === width-1 && direction === 1)|| //If snake hits the right wall
            (currentSnake[0]%width === 0 && direction === -1)|| //If snake hits the left wall
            (currentSnake[0]-width < 0 && direction===-width)|| // if snake hits top
            (squares[currentSnake[0]+direction].classList.contains('snake')) // If snake hits itself
        ){
            return clearInterval(interval); //This will clear the interval if any of the above happen
        }
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction); //Gives direction to the head of the array

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes,intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random()*squares.length);
        }while(squares[appleIndex].classList.contains('snakes'))
        squares[appleIndex].classList.add('apple');
    }

    //Assign functions to the keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1  // If we press the right arrow, then the snake will go right
        }
        else if(e.keyCode === 38){
            direction = -width; // If we press the up arrow, then the snake will go back to ten divs, will go up
        }
        else if(e.keyCode === 37){
            direction = -1; // If we press the left arrow, then the snake will go left one div
        }
        else if(e.keyCode === 40){
            direction = +width; // If we press the down arrow, then the snake will ten divs, will go down
        }
    }

    document.addEventListener('keyup',control);
    startBtn.addEventListener('click',startGame);
})