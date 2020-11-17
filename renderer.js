const { ipcRenderer } = require('electron');

function sendForm(event) {
  event.preventDefault();

  const INPUT_CLASSNAME = '.memo__input';
  let value = document.querySelector(INPUT_CLASSNAME).value;
  ipcRenderer.send('form-submission', value);
}

function init() {
  const FORM = document.querySelector('.memo--form');
  FORM.addEventListener('submit', sendForm);
}

document.addEventListener('DOMContentLoaded', init);