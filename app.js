const game = () => {
    let pScore = 0;
    let cScore = 0;

    //start the game
    const startGame = () =>{
        //const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');
        const scoreScreen = document.querySelector('.score');
        document.getElementById("intro-button").addEventListener('click', function clicked() {
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
            scoreScreen.classList.add('fadeIn');
            document.getElementById("intro-button").removeEventListener("click", clicked, false);
        }, false);
    };
    //Play Match
    const playMatch = () =>{
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');


     function myListener(e){
            //console.log(this);
            //The Computer Choice
            const computerNumber = Math.floor(Math.random() *3);
            const computerChoice = computerOptions[computerNumber];
            //Timeout takes function (first) and time (second)
            setTimeout(() =>{
                //Here is where we call compareHands -- needs delay
                compareHands(this.textContent, computerChoice);
                //Update Images -- needs delay
                playerHand.src = `./assets/${this.textContent}.png`
                computerHand.src = `./assets/${computerChoice}.png`
                //reset button text to white -- needs delay
                this.style.color = "white";
                //re-enable buttons -- needs delay
                options.forEach(el =>{el.disabled = false;});
                console.log("computer score:   ", cScore);
                console.log("player Score:     ", pScore);
                //Check End Game Trigger
                if(cScore > 1 || pScore >1){
                    console.log("Game Over!");
                    options.forEach(option=>{
                        myRemoveEvent(option, "click", myListener);
                        console.log("removed");
                        console.log(option);
                    })
                    endGame();
                }
            }, 2000)
            //Shaking animation no delay
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";
            //current button color is red no delay
            this.style.color = "rgb(39, 41, 68)";
            //disable all buttons no delay
            options.forEach(el => {el.disabled = true;
            });
            
        };
        function myAttachEvent(element, type, handler){
            if (element.addEventListener) 
                element.addEventListener(type, handler, false);
            else element.attachEvent("on"+type, handler);
        }
        function myRemoveEvent(element,type,handler) {
            if (element.removeEventListener) 
               element.removeEventListener (type,handler,false);
            if (element.detachEvent)
               element.detachEvent ('on'+type,handler); 
        }

        hands.forEach(hand =>{
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            });
        });
        //Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];
        
        options.forEach(option=>{
            myAttachEvent(option, "click", myListener);
            console.log(option);
        });
        console.log("hello");

       

    };
    const updateScore = () =>{
          const playerScore = document.querySelector('.player-score p');
          const computerScore = document.querySelector('.computer-score p');
          playerScore.textContent = pScore;
          computerScore.textContent = cScore;
    }; 


    const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector('.winner');
        //checking for a tie
        if(playerChoice === computerChoice){
            winner.textContent = 'It\'s a tie!';
            return;
        }
        //Check for Rock
        if(playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = 'Player Wins!';
                pScore++;
                updateScore();
                return;
            } else{
                winner.textContent = 'Computer Wins!';
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if(playerChoice === 'paper'){
            if(computerChoice === 'scissors'){
                winner.textContent = 'Computer Wins!';
                cScore++;
                updateScore();
                return;
            } else{
                winner.textContent = 'Player Wins!';
                pScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if(playerChoice === 'scissors'){
            if(computerChoice === 'rock'){
                winner.textContent = 'Computer Wins!';
                cScore++;
                updateScore();
                return;
            } else{
                winner.textContent = 'Player Wins!';
                pScore++;
                updateScore();
                return;
            }
        }

    }

    const endGame = () =>{
        
        const againBtn = document.querySelector('.result button');
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');
        const scoreScreen = document.querySelector('.score');
        const resultScreen = document.querySelector('.result');
        console.log("ending game");

        matchScreen.classList.remove('fadeIn');
        scoreScreen.classList.remove('fadeIn');
        resultScreen.classList.add('fadeIn');

        againBtn.addEventListener('click', ()=> {
            introScreen.classList.remove('fadeOut')
            matchScreen.classList.add('fadeOut');
            scoreScreen.classList.add('fadeOut');
            resultScreen.classList.remove('fadeIn');
            restartGame();
        });
        
    };


    const restartGame = () =>{
        const winner = document.querySelector('.winner');
        winner.textContent = "Choose an option.";
        pScore = 0;
        updateScore();
        cScore = 0;
        updateScore();
        startGame();
        playMatch();
    };

    //call all inner functions
    startGame();
    playMatch();
    console.log("i\'m done");

};

//start the game

game();