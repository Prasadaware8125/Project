let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow","red","blue","green"];

let started = false;
let level = 0;

let startbtn = document.querySelector('.start');


let high = document.querySelector('#highestScore');
let h2 = document.querySelector('h2');

// Step 1 : Start the game
document.addEventListener("keypress" , function () {
    if( started == false ) {
        console.log("Game started!");
        started = true;

        levelUp();
    }
});
// for phone
startbtn.addEventListener("click", () => {
    if( started == false ) {
        console.log("Game started!");
        started = true;

        levelUp();
    }
});

// Step 2 : Flash buttons and level up

function gameflash(randBtn) {
    randBtn.classList.add("flash");
    setTimeout( () => randBtn.classList.remove("flash"),100);
}

function userflash(randBtn) {
    randBtn.classList.add("userflash");
    setTimeout( () => randBtn.classList.remove("userflash"),100);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    // console.log(randomIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log("game seq:",gameSeq);
    gameflash(randBtn);
}

function checkAns(idx) {
    // console.log(level);
    // let idx = level -1;

    if( userSeq[idx] == gameSeq[idx]) {
        if( userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        } 
    } else {
        if( level > highestScore ) {
            highestScore = level;
        }
        high.innerHTML = `Highest Score : ${highestScore}`;
        h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to start.`;
        reset();
    }
}

function btnPrss() {
    // console.log(this);
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log("user seq",userSeq);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for( btn of allBtns ) {
    btn.addEventListener("click", btnPrss);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}