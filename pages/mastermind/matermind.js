'use strict';

(function() {
    //const backToHome = document.querySelector("#")

    //creating eventListeners for the players choice
   const inputColour = document.querySelectorAll(".inputColour");
   const inputColourArea = document.querySelector("#colours");

    
    //getting all the choices that te user can make or has made
    const previousChsDisp = document.querySelectorAll(".sections div");
    const currentChsDisp = document.querySelectorAll(".guess div");
    const feedback = document.querySelectorAll(".feedback div")

    //extra param
    const maxAttempts = 7;
    const maxNrOfInputs = 4;
    const optie = true;

    //setting basic parameters
    const previousChoices = Array.apply(null, Array(maxAttempts)).map(function () {});
    const colours = ["blue","green","yellow","red"];
    const code = [];
    const currentChs = Array.apply(null, Array(maxNrOfInputs)).map(function () {});;
    let currentChsIndex = 0;
    let previousChsIndex = maxAttempts-1;

    //creating a random colour code
    const genRandCode = function() {
        for (let i = 0; i < maxNrOfInputs; i++) {
            code[i] = colours[Math.floor(Math.random()*colours.length)];
        }
    }

    //reaction to the colours the user chooses
    const makeChoice = function(colour) {
        try {
            if(currentChs === maxNrOfInputs) throw Error("Je mag maar 4 kleuren ingeven");
            else {
                currentChs[currentChsIndex] = colour;
                currentChsDisp[currentChsIndex].className = colour;
                currentChsIndex++;
            }
        } catch(err) {
            console.log(err);
        }
    }

    //changing playing board css so the previous choices reflect the actual prev choices
    const addPreviousChsToDisp = function() {
        for(let i = 0; i < maxNrOfInputs; i++) {
            const temp = previousChoices[previousChsIndex][i];
            previousChsDisp[previousChsIndex*maxNrOfInputs+i].className = temp;
        }
    }
    //resets the choice input
    const resetChs = function() {
        for(let i = 0; i < maxNrOfInputs; i++) {
            currentChsDisp[i].className = '';
            currentChs[i] = null;
        }
        currentChsIndex = 0;
    }
    //resets whole board
    const reset = function() {
        for(let i=0;i<maxNrOfInputs;i++){
            for(let j=0; j<maxAttempts; j++) {
                previousChsDisp[i+j*maxNrOfInputs].className = '';
                feedback[i+j*maxNrOfInputs].className = '';
            }  
        }
        for(let i =0 ; i<inputColour.length; i++) {
            inputColour[i].removeEventListener("click",()=>{
                makeChoice(colours[i]);
            });
        }

        previousChsIndex = maxAttempts -1;
    }
    //gives feedback to user
    //TO DO:: FIX LOGIC OF FEEDBACK
    const feedbackFctn = function() {
        let j = 0;
        let str = "";
        for(let i = 0; i < maxNrOfInputs; i++) {
            //if(optie)j=i;
            if (code[i] == currentChs[i]) {
                feedback[j+previousChsIndex*maxNrOfInputs].className = "black";
                str += i;
                j++;continue;
            } 
        }
        for(let i = 0; i< maxNrOfInputs; i++) {
            //if(optie)j=i;
            if (str.indexOf(i) !== -1) continue;
            if (counts(currentChs[i],code) === counts(currentChs[i],currentChs) && counts(currentChs[i],code) !== 0) {
                feedback[j+previousChsIndex*maxNrOfInputs].className = "white";
                j++;continue;
            }
        }
    }

    //looks whether the input was a winner
    const chckChs = function() {
        for(let i = 0; i < maxNrOfInputs; i++) {
            if (code[i] !== currentChs[i]) return false;
        }
    
        return true;
    }

    //counts reoccurence of a value in an array
    const counts = function(value,arr) {
        let amounts = 0;
        for (const el of arr) el===value?amounts++:null;
        return amounts;
    }

    //submitting the choice
    const submitChoice = function() {
        previousChoices[previousChsIndex] = currentChs;
        addPreviousChsToDisp();
        feedbackFctn()
        if (chckChs()) {
            started = false;
            gameBtn.innerText = "Restart";
            window.alert("You won");
            
        }
        if(previousChsIndex === 0) {
                started = false;
                gameBtn.innerText = "Restart";
        }
        resetChs();
        previousChsIndex--;
    };

    let started = false;
    let ended = true;
    //main function
    for(let i =0 ; i<inputColour.length; i++) {
        inputColour[i].addEventListener('click', ()=>{
            makeChoice(colours[i]);
        });
    }
    const main = function() {
        if (!started) {
            reset();
            genRandCode();
            
            ended = false;
            started = true;
            gameBtn.innerText = "Submit Choice";
        } else if (started) {
            submitChoice();
        }
               
    }
    const gameBtn = document.querySelector("#gameBtn")
    gameBtn.addEventListener('click',main);
})();