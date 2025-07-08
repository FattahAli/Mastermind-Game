const play = document.querySelector('#letsPlay');
const duplicate = document.querySelector('#duplicate');
const welcome = document.querySelector('.welcome');
const board = document.querySelector('.board');
const circleBox = document.querySelectorAll('.circleBox');
const checkBtn = document.querySelector('#check');
const duplicates = document.querySelector('#duplicate');

const colors = ['red', 'yellow', 'green', 'purple', 'brown', 'orange', 'teal', 'indigo'];
const keyLength = 4;
const totalRows = 10;

let currentRow = 0;
let turns = 0;
let secret = [];
let selectedColor = null;
let guess = [];
let allowDuplicates = false;

let audio = new Audio('music2.mp3');
let hoverS = new Audio('hover.mp3');

const menu = document.querySelector('#menu');
const returnMenu = document.querySelector('#rmenu');
const rulesClose = document.querySelector('#rulesClose');
const howTo = document.querySelector('#howTo');
const rules = document.querySelector('.rules');
const restart = document.querySelector('#restart');
const won = document.querySelector('.won');
const star = document.querySelectorAll('.star');

play.addEventListener('mouseover',()=>{
  hoverS.play();
  hoverS.volume = 0.5;
});

howTo.addEventListener('mouseover',()=>{
  hoverS.play();
  hoverS.volume = 0.5;
});

duplicate.addEventListener('mouseover',()=>{
  hoverS.play();
  hoverS.volume = 0.5;
})



howTo.addEventListener('click',()=>{
  welcome.style.display = 'none';
  rules.style.display = 'block'
})

rulesClose.addEventListener('click',()=>{
  rules.style.display = 'none';
  welcome.style.display =''
})

menu.addEventListener('click', () => {
  welcome.style.display = '';
  board.style.display = 'none';

  turns = 0;
  guess = [];
  secret = [];

  document.querySelectorAll('.circles').forEach(circle => {
    circle.style.backgroundColor = 'rgb(100 116 139)'; 
    circle.removeAttribute('data-color');
    circle.style.border = 'none';
  });

  document.querySelectorAll('.results div').forEach(dot => {
    dot.style.backgroundColor = 'white'; 
  });

  checkBtn.disabled = true;
  checkBtn.style.backgroundColor = 'gray';
  audio.pause();
  audio.currentTime = 0;
});

rmenu.addEventListener('click', () => {
  welcome.style.display = '';
  board.style.display = 'none';
  won.style.display = 'none';

  turns = 0;
  guess = [];
  secret = [];

  document.querySelectorAll('.circles').forEach(circle => {
    circle.style.backgroundColor = 'rgb(100 116 139)'; 
    circle.removeAttribute('data-color');
    circle.style.border = 'none';
  });

  document.querySelectorAll('.results div').forEach(dot => {
    dot.style.backgroundColor = 'white'; 
  });

  checkBtn.disabled = true;
  checkBtn.style.backgroundColor = 'gray';
  audio.pause();
  audio.currentTime = 0;
});


restart.addEventListener('click',()=>{
  turns = 0;
  guess = [];
  secret = [];

  document.querySelectorAll('.circles').forEach(circle => {
    circle.style.backgroundColor = 'rgb(100 116 139)'; 
    circle.removeAttribute('data-color');
    circle.style.border = 'none';
  });

  document.querySelectorAll('.results div').forEach(dot => {
    dot.style.backgroundColor = 'white'; 
  });

  checkBtn.disabled = true;
  checkBtn.style.backgroundColor = 'gray';
})

function playGame() {
  play.addEventListener('click', () => {
    welcome.style.display = 'none';
    board.style.display = 'block';

    generateSecretKey();
    highlightRow(totalRows - 1);
    
    audio.volume = 0.5;
    audio.play();
  });
}


duplicates.addEventListener('click', () => {
  allowDuplicates = !allowDuplicates;

  duplicates.textContent = allowDuplicates ? 'Duplicates Allowed' : 'Allow Duplicates';

  if (allowDuplicates) {
    duplicates.classList.add('bg-green-600', 'text-white');
  } else {
    duplicates.classList.remove('bg-green-600');
    duplicates.classList.add('bg-[#091540]');
  }
});



function generateSecretKey() {
  secret = [];
  const used = new Set();
  while (secret.length < keyLength) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (allowDuplicates || !used.has(color)) {
      secret.push(color);
      used.add(color);
    }
  }
  console.log('Secret Key:', secret);
}

document.querySelectorAll('.colorCircle').forEach(selected => {
  selected.addEventListener('click', () => {
    selectedColor = selected.getAttribute('data-color');
  });
});

function highlightRow(row) {
  guess = [];
  currentRow = row;
  checkBtn.disabled = true;
  checkBtn.style.backgroundColor = 'gray';

  const circles = circleBox[row].querySelectorAll('.circles');

  circles.forEach((circle, index) => {
    circle.style.border = '2px solid black';

    circle.addEventListener('click', () => {
      if (!selectedColor || circle.hasAttribute('data-color')) return;

      if (!allowDuplicates && guess.includes(selectedColor)) {
        return;
      }

      circle.style.backgroundColor = selectedColor;
      circle.setAttribute('data-color', selectedColor);
      guess[index] = selectedColor;

      if (guess.filter(Boolean).length === 4) {
        checkBtn.disabled = false;
        checkBtn.style.backgroundColor = 'green';
      }
    });
  });
}

checkBtn.addEventListener('click', () => {
  if (guess.length !== 4 || guess.includes(undefined)) return;

  let resultCircles = circleBox[currentRow].querySelectorAll('.results div');
  let secretCopy = [...secret];
  let guessCopy = [...guess];
  let feedback = new Array(4).fill('black'); 

  guessCopy.forEach((color, index) => {
    if (color === secretCopy[index]) {
      feedback[index] = 'green';
      secretCopy[index] = null;
      guessCopy[index] = null;
    }
  });

  guessCopy.forEach((color, index) => {
    if (color && secretCopy.includes(color)) {
      feedback[index] = 'red';
      secretCopy[secretCopy.indexOf(color)] = null;
      guessCopy[index] = null;
    }
  });

  feedback.forEach((color, index) => {
    resultCircles[index].style.backgroundColor = color;
  });

  const won = document.querySelector('.won');
const stars = document.querySelectorAll('.star');

if (guess.every((color, i) => color === secret[i])) {
  stars.forEach(star => star.style.color = 'white');

  if (turns <= 3) {
    stars.forEach(star => star.style.color = 'yellow');
  } else if (turns <= 6) {
    stars[0].style.color = 'yellow';
    stars[1].style.color = 'yellow';
  } else {
    stars[0].style.color = 'yellow';
  }

  won.style.display = 'block';
  board.style.display = 'none';
  return;
}


  if (turns < totalRows - 1) {
  turns++;
  highlightRow(totalRows - 1 - turns);
} else {
  const lostModal = document.querySelector('.lost');
  const secretReveal = document.getElementById('secretReveal');
  lostModal.style.display = 'flex';

  secretReveal.innerHTML = '';
  secret.forEach(color => {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    div.className = 'w-10 h-10 rounded-full border border-black';
    secretReveal.appendChild(div);
  });

  board.style.display = 'none';
}

});


const returnLostBtn = document.getElementById('rmenuLost');
returnLostBtn.addEventListener('click', () => {
  document.querySelector('.lost').style.display = 'none';
  welcome.style.display = '';
  board.style.display = 'none';
  audio.pause();
  audio.currentTime = 0;
});


playGame();