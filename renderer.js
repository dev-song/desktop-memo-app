const { ipcRenderer } = require('electron');

const INPUT_CLASSNAME = '.memo__input';

function sendForm(event) {
  event.preventDefault();

  let value = document.querySelector(INPUT_CLASSNAME).value;
  ipcRenderer.send('form-submission', value);
}

function displayPreviousMemo(text) {
  const textArea = document.querySelector(INPUT_CLASSNAME);
  textArea.value = text;
}

function init() {
  const FORM = document.querySelector('.memo--form');
  FORM.addEventListener('submit', sendForm);

  ipcRenderer.on('previous-memo-exists', (e, memo) => {
    displayPreviousMemo(memo);
  });
}

document.addEventListener('DOMContentLoaded', init);