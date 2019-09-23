const game = () => {
    let pScore = 0;
    let cScore = 0;

    //start the game
    const startGame = () =>{
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');

        playBtn.addEventListener('click', ()=> {
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
        });
    };
    //Play Match
    const playMatch = () =>{
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand =>{
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            });
        });
        //Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];
        
        options.forEach(options=>{

            options.addEventListener('click', function(){
                // console.log(this);
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
                    options.style.color = "white";
                    document.getElementById("rock-button").disabled=false;
                    document.getElementById("paper-button").disabled=false;
                    document.getElementById("scissors-button").disabled=false;
                }, 2000)

                //Shaking animation no delay
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
                this.style.color = "red";
                document.getElementById("rock-button").disabled=true;
                document.getElementById("paper-button").disabled=true;
                document.getElementById("scissors-button").disabled=true;
                
            });

        });

       

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


    //call all inner functions

    startGame();
    playMatch();
};

//start the game

game();