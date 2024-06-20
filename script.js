console.log("hello")
let turn = "X"
let gameover = false
let ting = new Audio("ting.mp3")
let numMatches = prompt("How many matches you want to play?", 3);
numMatches=Number.parseInt(numMatches)
let currentMatchNum = 1;
let gameOverTune = new Audio("gameover.mp3");
let winningsOfX = 0
let winningsOf0 = 0
let bgMusic=new Audio("music.mp3")

document.getElementById('matchNum').innerText = currentMatchNum;
document.getElementById('matchWonCountX').innerText = winningsOfX;
document.getElementById('matchWonCount0').innerText = winningsOf0;



// Changing turns
const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}


const checkWin = () => {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let boxtext = document.getElementsByClassName('boxInsideText');
    Array.from(boxtext)
    winningCombinations.forEach(element => {
        if (boxtext[element[0]].innerText === boxtext[element[1]].innerText && boxtext[element[2]].innerText === boxtext[element[1]].innerText && boxtext[element[0]].innerText !== "") {
            gameover = true;
            gameOverTune.play();
            document.getElementsByClassName('imgBox')[0].style.display = "flex";
            document.getElementsByClassName('winner')[0].innerText = boxtext[element[0]].innerText;
            document.getElementsByClassName('gridBox')[0].classList.add('pointer-none');
            if(boxtext[element[0]].innerText=="X"){
                winningsOfX++;
            }
            else if(boxtext[element[0]].innerText=="0"){
                winningsOf0++;
            }
            currentMatchNum++;
        }
    })
}






// Defining game logic
bgMusic.play();
bgMusic.volume=0.5;
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxInsideText = element.querySelector('.boxInsideText');
    element.addEventListener('click', () => {
        if (boxInsideText.innerText === "") {
            ting.volume=0.5;
            ting.play();
            boxInsideText.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameover) {
                document.getElementById('player').innerText = turn;
            }
        }
    })
})


// Reseting The Board

document.getElementsByClassName('reset')[0].addEventListener('click', () => {
    if (currentMatchNum <= numMatches && currentMatchNum != 1) {
        document.getElementById('matchNum').innerText = currentMatchNum;
        let boxInsideText = document.querySelectorAll('.boxInsideText');
        Array.from(boxInsideText).forEach(element => {
            element.innerText = ""
        })
        document.getElementsByClassName('gridBox')[0].classList.remove('pointer-none');
        document.getElementById('matchWonCountX').innerText = winningsOfX;
        document.getElementById('matchWonCount0').innerText = winningsOf0;
        gameOverTune.pause();
        turn = "X"
        gameover = false
        document.getElementsByClassName('imgBox')[0].style.display = "none";
        document.getElementById('player').innerText = turn;
    }
    else{
        document.getElementsByClassName('reset')[0].innerText="Check Result";
        document.getElementsByClassName('reset')[0].addEventListener('click',result());
    }
})


// Finalising The Result
const result=()=>{
    if(winningsOfX>winningsOf0){
        document.getElementById('matchWonCountX').innerText = winningsOfX;
        document.getElementById('matchWonCount0').innerText = winningsOf0;
        document.getElementsByClassName('resultX')[0].innerText="Winner!"
        bgMusic.pause();
    }
    else if(winningsOf0>winningsOfX){
        document.getElementById('matchWonCountX').innerText = winningsOfX;
        document.getElementById('matchWonCount0').innerText = winningsOf0;
        document.getElementsByClassName('result0')[0].innerText="Winner!"
        bgMusic.pause();
    }
    else{
        document.getElementById('matchWonCountX').innerText = winningsOfX;
        document.getElementById('matchWonCount0').innerText = winningsOf0;
        document.getElementsByClassName('result0')[0].innerText="Draw!"
        document.getElementsByClassName('resultX')[0].innerText="Draw!"
        bgMusic.pause();
    }
    document.getElementsByClassName('reset')[0].innerText="RESTART THE GAME!"
    document.getElementsByClassName('reset')[0].addEventListener('click',()=>{
        location.reload();
    })
}



