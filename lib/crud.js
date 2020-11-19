const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

const DEFAULT_MEMO_PATH = path.join(__dirname, '../memo/default.txt');

function saveMemo(content) {
  fs.writeFile(DEFAULT_MEMO_PATH, content, err => {
    if (err) throw err;
    console.log(`Content is successfully saved: ${content}`);
  })
}

function readMemo(callback) {
  fs.readFile(DEFAULT_MEMO_PATH, (err, memo) => {
    if (err) throw err;
    console.log(`Previous memo exists!`);

    callback(memo.toString());
  });
}

exports.saveMemo = saveMemo;
exports.readMemo = readMemo;