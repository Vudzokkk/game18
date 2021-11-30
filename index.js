const SRC_ForOver16 = 'forOver16';
const SRC_Kids = 'kids';
let srcImg = SRC_Kids;
let level = 1;
let size = (1 + level) * 4;
let sizeOfSquare = 100;
let currentIdSquare = null;
let point = 0;

const getEl = (el) => document.querySelector(el);
const getElList = (el) => document.querySelectorAll(el);

const displayImg = (target, id) =>
  (target.innerHTML = `<img alt='' src='./img/squareImg/${srcImg}/${id}.png'>`);

const chooseLevel = () => {
  switch (level) {
    case 1:
      return 8;
    case 2:
      return 10;
    case 3:
      return 12;
    case 4:
      return 18;
    default:
      return 8;
  }
};

const chooseSizeSquare = () => {
  switch (level) {
    case 1:
      return 200;
    case 2:
      return 175;
    case 3:
      return 150;
    case 4:
      return 125;
    default:
      return 200;
  }
};

const hideModal = () => (getEl('#modalContainer').style.display = 'none');

const displayModal = (content, listButton) => {
  getEl('#modalContainer').style.display = 'flex';
  getEl('#modalContent').innerHTML = content || 'No content';
  if (listButton.length === 0) return;
  let innerFooter = '';
  for (let btn of listButton) {
    innerFooter += `<button onclick="${btn.actionBtn}">${btn.textBtn}</button>`;
  }
  getEl('#modalFooter').innerHTML = innerFooter;
};

const handleClickSquare = ({ target }) => {
  const idSquare = parseInt(target.getAttribute('id-square'));
  if (isNaN(idSquare)) return;

  if (currentIdSquare === null) {
    currentIdSquare = idSquare;
    target.onclick = null;
    displayImg(target, idSquare);
  } else {
    if (currentIdSquare === idSquare) {
      const listElDuplicate = getElList(`div[id-square='${idSquare}']`);
      for (let e of listElDuplicate) {
        e.style.visibility = 'hidden';
        e.onclick = null;
      }
      point += 1;
      getEl('#point > p:last-child').innerHTML = point;
      if (point === size) {
        displayImg(target, idSquare);
        return displayModal('YOU WIN in level: ' + level + ' !!!<br>Do you wanna play again???', [
          {
            actionBtn: 'renderSquare()',
            textBtn: 'Kéo áo lên, thứ Vũ cần là nụ cười của em',
          },
        ]);
      }
    } else {
      const listSquareEl = getElList('.square');
      currentIdSquare = idSquare;
      for (let s of listSquareEl) {
        s.innerHTML = '';
        s.onclick = handleClickSquare;
      }
      displayImg(target, idSquare);
    }
  }
};

const renderSquare = () => {
  hideModal();
  level = parseInt(getEl('select[name="level"]').value);
  const age = parseInt(getEl('select[name="age"]').value);
  if (!level || !age)
    return displayModal('Lựa chọn cấp độ và độ tuổi đi zợ iu :3 ', [
      {
        actionBtn: 'hideModal()',
        textBtn: 'Ok, Vũ đáng iu cute phô mai que,
      },
    ]);
  srcImg = age > 16 ? SRC_ForOver16 : SRC_Kids;

  size = chooseLevel();
  sizeOfSquare = chooseSizeSquare();
  point = 0;
  getEl('#point > p:last-child').innerHTML = point;

  let listNumber = [...Array.from(Array(size).keys()), ...Array.from(Array(size).keys())];
  let listRandomId = [];
  let lengthListNumber = listNumber.length;
  let j = 0;

  while (lengthListNumber--) {
    j = Math.floor(Math.random() * (lengthListNumber + 1));
    listRandomId.push(listNumber[j]);
    listNumber.splice(j, 1);
  }

  let listSquare = '';
  for (let i = 0; i < listRandomId.length; i++) {
    listSquare += `<div class='square' id-square='${listRandomId[i]}'
     style='width: ${sizeOfSquare}px; height: ${sizeOfSquare}px'
    ></div>`;
  }
  getEl('#playground').innerHTML = listSquare;
  getEl('#playground').style.maxWidth = (level > 2 ? 6 : 4) * sizeOfSquare + 'px';

  const listSquareEl = getElList('.square');
  for (let s of listSquareEl) {
    s.onclick = handleClickSquare;
  }
};

displayModal(
  'Welcome to Game: Finding Card!!!<br>' +
    'This game is created and developed by <strong>' +
    '<a href="https://www.youtube.com/watch?v=k4B7tuCt8zc&ab_channel=EasyGame">Easy gamE Channel</a></strong>.<br>' +
    'There are 4 levels and you 2 modes (kids and 18+) for you.<br>' +
    'Please choose level and age before start game',
  [
    {
      actionBtn: 'hideModal()',
      textBtn: 'I understand',
    },
  ]
);

getEl('#startBtn').onclick = renderSquare;
